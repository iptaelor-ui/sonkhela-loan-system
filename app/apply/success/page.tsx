"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const NEXT_STEPS = [
  "Our team will review your application.",
  "You'll receive an email once a decision has been made.",
  "If approved, we'll send you a secure agreement signing link.",
  "SMS reminders will only be sent after your loan has been approved and is nearing its due date.",
];

function SuccessContent() {
  const searchParams = useSearchParams();
  const applicationNumber = searchParams.get("id") || "Pending";

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-start justify-center px-4 py-8 sm:items-center sm:px-6 sm:py-12">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 text-center shadow-xl sm:p-12">
        <CheckCircle2
          className="mx-auto mb-6 h-16 w-16 shrink-0 text-green-600 sm:mb-8 sm:h-[90px] sm:w-[90px]"
          strokeWidth={2}
        />

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F97316] sm:text-sm sm:tracking-[0.3em]">
          Application Received
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-[#0B1F4D] sm:mt-4 sm:text-4xl">
          Thank You!
        </h1>

        <p className="mt-4 text-base text-gray-600 sm:mt-6 sm:text-lg">
          Your loan application has been successfully submitted.
        </p>

        <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-5 sm:mt-10 sm:p-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 sm:text-sm">
            Application Number
          </p>
          <h2 className="mt-2 break-all text-2xl font-bold text-[#0B1F4D] sm:mt-3 sm:text-3xl">
            {applicationNumber}
          </h2>
        </div>

        <div className="mt-8 rounded-2xl border border-[#F97316]/20 bg-[#FFF8F3] p-5 text-left sm:mt-10 sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0B1F4D] sm:text-xl">
            What Happens Next?
          </h3>
          <ul className="space-y-3 text-gray-700">
            {NEXT_STEPS.map((step) => (
              <li key={step} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="shrink-0 leading-6">✅</span>
                <span className="flex-1 leading-6">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="flex-1 rounded-xl bg-[#F97316] py-3.5 text-center font-semibold text-white transition hover:bg-[#EA580C] sm:py-4"
          >
            Back to Home
          </Link>
          <Link
            href={`/track?id=${applicationNumber}`}
            className="flex-1 rounded-xl border border-[#0B1F4D] py-3.5 text-center font-semibold text-[#0B1F4D] transition hover:bg-[#0B1F4D] hover:text-white sm:py-4"
          >
            Track Application
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
