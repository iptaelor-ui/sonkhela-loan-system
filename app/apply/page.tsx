"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Stepper from "@/components/Application/Stepper";
import PersonalInformation from "@/components/Application/PersonalInformation";
import LoanInformation from "@/components/Application/LoanInformation";
import SupportingDocuments from "@/components/Application/SupportingDocuments";

export default function ApplyPage() {

  const searchParams = useSearchParams();

  const loan = searchParams.get("loan") || "";

  const [step, setStep] = useState(1);

  const loanNames: Record<string, string> = {
    collateral: "Collateral Backed Loans",
    payslip: "Payslip Backed Loans",
    student: "Student Loans",
    marketeer: "Marketeer Loans",
    business: "Business Loans",
    "white-book": "White Book Loans",
  };

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
            Complete your application in just three simple steps.
          </p>

        </div>

        <Stepper currentStep={step} />

        {step === 1 && (
          <PersonalInformation
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <LoanInformation
            loanName={loanNames[loan] || ""}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <SupportingDocuments
            onBack={() => setStep(2)}
          />
        )}

      </div>

    </main>
  );
}