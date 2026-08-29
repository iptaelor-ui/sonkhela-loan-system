import { supabase } from "./supabase";
import { LoanApplication } from "@/app/apply/page";

async function uploadFile(file: File, folder: string) {
  const extension = file.name.split(".").pop();
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const path = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("loan-documents")
    .upload(path, file);

  if (error) throw error;

  return path;
}

export async function submitApplication(
  application: LoanApplication
) {
  // Guard: we only operate in Zambia. Checked here as well as in the UI so
  // it can't be bypassed by manipulating the form state.
  if ((application.country || "Zambia") !== "Zambia") {
    throw new Error("Currently we are only operating in Zambia.");
  }

  // Guard: an amount is required. Previously blank amounts could reach the
  // database as 0.
  const rawAmount = String(application.loanAmount ?? "")
    .replace(/,/g, "")
    .trim();
  const loanAmount = Number(rawAmount);

  if (rawAmount === "" || !Number.isFinite(loanAmount) || loanAmount <= 0) {
    throw new Error("A valid loan amount is required.");
  }

  const collateralImages: string[] = [];

  for (const file of application.collateralImages) {
    const path = await uploadFile(file, "collateral");
    collateralImages.push(path);
  }

  let nrcFront: string | null = null;
  let nrcBack: string | null = null;

  if (application.nrcFront) {
    nrcFront = await uploadFile(
      application.nrcFront,
      "nrc"
    );
  }

  if (application.nrcBack) {
    nrcBack = await uploadFile(
      application.nrcBack,
      "nrc"
    );
  }

  // The database no longer allows public reads on applications, so
  // .insert().select() would fail. Instead we generate the row's uuid
  // ourselves, insert without returning, then fetch just the generated
  // application number through a safe database function.
  const id = crypto.randomUUID();

  const { error } = await supabase.from("applications").insert({
    id,
    full_name: application.fullName,
    email: application.email,
    phone: application.phone,
    nrc_number: application.nrcNumber,
    country: application.country || "Zambia",
    loan_type: application.loanType,
    loan_amount: loanAmount,
    repayment_period: Number(application.repaymentPeriod),
    collateral_description:
      application.collateralDescription,
    collateral_images: collateralImages,
    nrc_front: nrcFront,
    nrc_back: nrcBack,
  });

  if (error) {
    throw error;
  }

  const { data: appNumber } = await supabase.rpc("get_application_number", {
    p_id: id,
  });

  return { id, application_number: appNumber as string | null };
}
