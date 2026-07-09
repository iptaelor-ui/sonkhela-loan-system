"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Stepper from "@/components/Application/Stepper";
import PersonalInformation from "@/components/Application/PersonalInformation";
import LoanInformation from "@/components/Application/LoanInformation";
import SupportingDocuments from "@/components/Application/SupportingDocuments";

import { submitApplication } from "@/lib/application";

export interface LoanApplication {
  fullName: string;
  email: string;
  phone: string;
  nrcNumber: string;

  loanType: string;
  loanAmount: string;
  repaymentPeriod: string;

  collateralDescription: string;

  collateralImages: File[];
  nrcFront: File | null;
  nrcBack: File | null;
}

function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loan = searchParams.get("loan") || "collateral";

  const loanNames: Record<string, string> = {
    collateral: "Collateral Backed Loans",
    payslip: "Payslip Backed Loans",
    student: "Student Loans",
    marketeer: "Marketeer Loans",
    business: "Business Loans",
    "white-book": "White Book Loans",
  };

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [application, setApplication] = useState<LoanApplication>({
    fullName: "",
    email: "",
    phone: "",
    nrcNumber: "",

    loanType: loan,

    loanAmount: "",
    repaymentPeriod: "1",

    collateralDescription: "",

    collateralImages: [],
    nrcFront: null,
    nrcBack: null,
  });

  const updateApplication = (
    field: keyof LoanApplication,
    value: any
  ) => {
    setApplication((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSubmit() {
    try {
      setLoading(true);

      const result = await submitApplication(application);

      router.push(
        `/apply/success?id=${result.application_number}`
      );
    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">

        <div className="mb-10">

          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            APPLY NOW
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#0B1F4D]">
            Loan Application
          </h1>

          <p className="mt-3 text-gray-600">
            Complete your application in three simple steps.
          </p>

        </div>

        <Stepper currentStep={step} />

        {step === 1 && (
          <PersonalInformation
            application={application}
            updateApplication={updateApplication}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <LoanInformation
            application={application}
            loanName={loanNames[loan]}
            updateApplication={updateApplication}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <SupportingDocuments
            application={application}
            updateApplication={updateApplication}
            loanType={loan}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}

      </div>
    </main>
  );
}
export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyContent />
    </Suspense>
  );
}
