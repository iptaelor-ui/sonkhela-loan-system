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
    loan_type: application.loanType,
    loan_amount: Number(application.loanAmount),
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
