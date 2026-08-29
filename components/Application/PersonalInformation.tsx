"use client";

import { useState } from "react";
import { LoanApplication } from "@/app/apply/page";

const COUNTRIES = [
  "Zambia",
  "Angola",
  "Botswana",
  "Burundi",
  "DR Congo",
  "Eswatini",
  "Kenya",
  "Lesotho",
  "Malawi",
  "Mozambique",
  "Namibia",
  "Rwanda",
  "South Africa",
  "Tanzania",
  "Uganda",
  "Zimbabwe",
  "Other",
];

interface PersonalInformationProps {
  application: LoanApplication;
  updateApplication: (field: keyof LoanApplication, value: any) => void;
  onNext: () => void;
}

export default function PersonalInformation({
  application,
  updateApplication,
  onNext,
}: PersonalInformationProps) {
  const [showCountryBlock, setShowCountryBlock] = useState(false);

  const country = application.country || "Zambia";
  const isZambia = country === "Zambia";

  function handleCountryChange(value: string) {
    updateApplication("country", value);
    if (value !== "Zambia") setShowCountryBlock(true);
  }

  function closeCountryBlock() {
    setShowCountryBlock(false);
    updateApplication("country", "Zambia");
  }

  function handleContinue() {
    if (!isZambia) {
      setShowCountryBlock(true);
      return;
    }
    onNext();
  }

  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">Personal Information</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block font-semibold">Full Name</label>
          <input type="text" value={application.fullName} onChange={(e) => updateApplication("fullName", e.target.value)} placeholder="John Banda" className="w-full rounded-xl border p-4" />
        </div>

        <div>
          <label className="mb-2 block font-semibold">Email Address</label>
          <input type="email" value={application.email} onChange={(e) => updateApplication("email", e.target.value)} placeholder="john@email.com" className="w-full rounded-xl border p-4" />
        </div>

        <div>
          <label className="mb-2 block font-semibold">Country</label>
          <select value={country} onChange={(e) => handleCountryChange(e.target.value)} className={isZambia ? "w-full rounded-xl border bg-white p-4" : "w-full rounded-xl border border-red-500 bg-white p-4"}>
            {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          {!isZambia && (<p className="mt-2 text-sm text-red-600">Currently we are only operating in Zambia.</p>)}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold">Phone Number</label>
            <input type="tel" value={application.phone} onChange={(e) => updateApplication("phone", e.target.value)} placeholder="+260..." className="w-full rounded-xl border p-4" />
          </div>

          <div>
            <label className="mb-2 block font-semibold">NRC Number</label>
            <input type="text" value={application.nrcNumber} onChange={(e) => updateApplication("nrcNumber", e.target.value)} placeholder="123456/12/1" className="w-full rounded-xl border p-4" />
          </div>
        </div>
      </div>

      <button onClick={handleContinue} disabled={!isZambia} className="mt-10 rounded-xl bg-[#F97316] px-10 py-4 font-semibold text-white transition hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50">Continue</button>

      {showCountryBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-xl font-bold text-[#0B1F4D]">Not Available in Your Country</h3>
            <p className="mt-3 text-gray-600">Currently we are only operating in Zambia. We are unable to process loan applications from outside Zambia at this time.</p>
            <button onClick={closeCountryBlock} className="mt-6 w-full rounded-xl bg-[#F97316] py-3 font-semibold text-white hover:bg-[#EA580C]">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
