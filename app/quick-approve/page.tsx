"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function QuickApproveContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const token = searchParams.get("token") || "";
  const applicationNumber = searchParams.get("no") || "";
  const name = searchParams.get("name") || "";

  const [state, setState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [notified, setNotified] = useState(false);

  async function confirm() {
    setState("working");

    try {
      const res = await fetch("/api/applications/quick-approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Could not approve this application.");
        setState("error");
        return;
      }

      setNotified(Boolean(data.notified));
      setState("done");
    } catch {
      setMessage("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-start justify-center px-4 py-10 sm:items-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-xl sm:p-10">

        {state === "done" ? (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ✅
            </div>

            <h1 className="text-2xl font-bold text-[#0B1F4D]">Approved</h1>

            <p className="mt-3 text-gray-600">
              {applicationNumber || "The application"} has been approved.{" "}
              {notified
                ? "The client has been sent an approval email."
                : "No email was sent — this applicant did not provide an email address."}
            </p>

            <p className="mt-4 rounded-xl bg-[#F8FAFC] p-4 text-sm text-gray-500">
              No loan record was created. Create one in the management system when
              the client comes in.
            </p>

            
              href="https://admin.sonkhela.com"
              className="mt-6 block rounded-xl bg-[#0B1F4D] py-3.5 font-semibold text-white"
            >
              Open Management System
            </a>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F97316]">
              Confirm Action
            </p>

            <h1 className="mt-3 text-2xl font-bold text-[#0B1F4D]">
              Approve without creating a record?
            </h1>

            {(applicationNumber || name) && (
              <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-5 text-left">
                {name && (
                  <p className="text-lg font-bold text-[#0B1F4D]">{name}</p>
                )}
                {applicationNumber && (
                  <p className="mt-1 break-all font-mono text-sm text-gray-500">
                    {applicationNumber}
                  </p>
                )}
              </div>
            )}

            <p className="mt-6 text-left text-sm leading-relaxed text-gray-600">
              The client is marked approved and sent an approval email.
              <strong className="text-[#0B1F4D]"> No loan record is created</strong> in
              the management system — you will add that yourself when they come in.
            </p>

            {state === "error" && (
              <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {message}
              </p>
            )}

            <button
              onClick={confirm}
              disabled={state === "working" || !id || !token}
              className="mt-7 w-full rounded-xl bg-[#145f39] py-4 font-semibold text-white transition hover:bg-[#0f4a2c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state === "working" ? "Approving…" : "Yes, Approve"}
            </button>

            
              href="https://admin.sonkhela.com"
              className="mt-3 block rounded-xl border border-[#0B1F4D] py-4 font-semibold text-[#0B1F4D]"
            >
              No, Open Management System
            </a>
          </>
        )}

      </div>
    </main>
  );
}

export default function QuickApprovePage() {
  return (
    <Suspense fallback={null}>
      <QuickApproveContent />
    </Suspense>
  );
}
