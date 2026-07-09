"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();

  const applicationNumber =
    searchParams.get("id") || "Pending";

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-12 text-center shadow-xl">

        <CheckCircle2
          size={90}
          className="mx-auto mb-8 text-green-600"
        />

        <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
          APPLICATION RECEIVED
        </p>

        <h1 className="mt-4 text-4xl font-extrabold text-[#0B1F4D]">
          Thank You!
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Your loan application has been successfully submitted.
        </p>

        <div className="mt-10 rounded-2xl bg-[#F8FAFC] p-8">

          <p className="text-sm uppercase tracking-widest text-gray-500">
            Application Number
          </p>

          <h2 className="mt-3 break-all text-3xl font-bold text-[#0B1F4D]">
            {applicationNumber}
          </h2>

        </div>

        <div className="mt-10 rounded-2xl border border-[#F97316]/20 bg-[#FFF8F3] p-6 text-left">

          <h3 className="mb-4 text-xl font-bold text-[#0B1F4D]">
            What Happens Next?
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>✅ Our team will review your application.</li>
            <li>✅ You'll receive an email once a decision has been made.</li>
            <li>✅ If approved, we'll send you a secure agreement signing link.</li>
            <li>✅ SMS reminders will only be sent after your loan has been approved and is nearing its due date.</li>
          </ul>

        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row">

          <Link
            href="/"
            className="flex-1 rounded-xl bg-[#F97316] py-4 text-center font-semibold text-white transition hover:bg-[#EA580C]"
          >
            Back to Home
          </Link>

          <Link
            href={`/track?id=${applicationNumber}`}
            className="flex-1 rounded-xl border border-[#0B1F4D] py-4 text-center font-semibold text-[#0B1F4D] transition hover:bg-[#0B1F4D] hover:text-white"
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
