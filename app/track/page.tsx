"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Clock, FileSearch, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface TrackResult {
  application_number: string;
  status: string;
  loan_type: string;
  created_at: string;
  reviewed_at: string | null;
}

const LOAN_NAMES: Record<string, string> = {
  collateral: "Collateral Backed Loan",
  payslip: "Payslip Backed Loan",
  student: "Student Loan",
  marketeer: "Marketeer Loan",
  business: "Business Loan",
  "white-book": "White Book Loan",
};

const STATUS_INFO: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode; message: string }
> = {
  pending: {
    label: "Pending Review",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    icon: <Clock size={40} className="text-amber-500" />,
    message:
      "Your application has been received and is waiting for review by our team. You will receive an email once a decision has been made.",
  },
  under_review: {
    label: "Under Review",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    icon: <FileSearch size={40} className="text-blue-500" />,
    message:
      "Our team is reviewing your application and may have requested additional information. Please check your email and respond so we can continue processing.",
  },
  approved: {
    label: "Approved 🎉",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle2 size={40} className="text-green-600" />,
    message:
      "Congratulations! Your loan has been approved. Check your email for your agreement signing link. Your loan becomes active once the agreement is signed.",
  },
  rejected: {
    label: "Not Approved",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    icon: <XCircle size={40} className="text-red-500" />,
    message:
      "Unfortunately your application was not approved this time. Check your email for details. You are welcome to apply again in the future.",
  },
};

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [query, setQuery] = useState(initialId);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  async function lookup(appNumber: string) {
    const clean = appNumber.trim().toUpperCase();
    if (!clean) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);

    const { data, error } = await supabase.rpc("track_application", {
      p_number: clean,
    });

    setLoading(false);
    const row = Array.isArray(data) ? data[0] : data;
    if (error || !row) {
      setNotFound(true);
      return;
    }
    setResult(row as TrackResult);
  }

  // Auto-lookup when arriving from the success page with ?id=
  useEffect(() => {
    if (initialId) lookup(initialId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  const status = result ? STATUS_INFO[result.status] || STATUS_INFO.pending : null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            TRACK APPLICATION
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-[#0B1F4D]">
            Check Your Application Status
          </h1>
          <p className="mt-4 text-gray-600">
            Enter the application number you received when you submitted your
            application (e.g. SSL-APP-2026-000001).
          </p>
        </div>

        <div className="mt-10 flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && lookup(query)}
            placeholder="SSL-APP-2026-000000"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-4 font-mono text-lg text-[#0B1F4D] outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
          />
          <button
            onClick={() => lookup(query)}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#F97316] px-7 font-semibold text-white transition hover:bg-[#EA580C] disabled:opacity-60"
          >
            <Search size={20} />
            {loading ? "Checking..." : "Track"}
          </button>
        </div>

        {notFound && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            No application found with that number. Please check the number and
            try again, or{" "}
            <Link href="/contact" className="font-semibold underline">
              contact us
            </Link>{" "}
            for help.
          </div>
        )}

        {result && status && (
          <div className={`mt-8 rounded-3xl border p-10 text-center ${status.bg}`}>
            <div className="mx-auto mb-5 flex justify-center">{status.icon}</div>
            <h2 className={`text-2xl font-extrabold ${status.color}`}>
              {status.label}
            </h2>
            <p className="mt-4 leading-7 text-gray-700">{status.message}</p>

            <div className="mt-8 grid gap-4 rounded-2xl bg-white/70 p-6 text-left sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Application Number
                </p>
                <p className="mt-1 font-mono font-bold text-[#0B1F4D]">
                  {result.application_number}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Loan Type
                </p>
                <p className="mt-1 font-bold text-[#0B1F4D]">
                  {LOAN_NAMES[result.loan_type] || result.loan_type}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Submitted
                </p>
                <p className="mt-1 font-bold text-[#0B1F4D]">
                  {new Date(result.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              {result.reviewed_at && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Last Updated
                  </p>
                  <p className="mt-1 font-bold text-[#0B1F4D]">
                    {new Date(result.reviewed_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/" className="font-semibold text-[#0B1F4D] underline hover:text-[#F97316]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackContent />
    </Suspense>
  );
}
