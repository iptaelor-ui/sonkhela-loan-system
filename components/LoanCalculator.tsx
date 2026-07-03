"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(1000);
  const [period, setPeriod] = useState("1");

  const rates: Record<string, number> = {
    "1": 0.15,
    "2": 0.25,
    "3": 0.30,
    "4": 0.40,
  };

  const interest = amount * rates[period];
  const total = amount + interest;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            LOAN CALCULATOR
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-[#0B1F4D]">
            Estimate Your Loan
          </h2>

          <p className="mt-4 text-gray-600">
            Calculate your expected repayment before applying.
          </p>
        </div>

        {/* Calculator */}
        <div className="grid gap-10 rounded-3xl bg-[#F8FAFC] p-10 shadow-lg md:grid-cols-2">

          {/* Left Side */}
          <div>

            <label className="mb-2 block font-semibold text-[#0B1F4D]">
              Loan Amount (ZMW)
            </label>

            <input
              type="number"
              value={amount}
              min={100}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mb-8 w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#F97316]"
            />

            <label className="mb-2 block font-semibold text-[#0B1F4D]">
              Repayment Period
            </label>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#F97316]"
            >
              <option value="1">1 Week (15%)</option>
              <option value="2">2 Weeks (25%)</option>
              <option value="3">3 Weeks (30%)</option>
              <option value="4">4 Weeks (40%)</option>
            </select>

          </div>

          {/* Right Side */}
          <div className="rounded-2xl bg-[#0B1F4D] p-8 text-white">

            <h3 className="mb-8 text-2xl font-bold">
              Loan Summary
            </h3>

            <div className="mb-5 flex justify-between">
              <span>Loan Amount</span>
              <strong>K {amount.toLocaleString()}</strong>
            </div>

            <div className="mb-5 flex justify-between">
              <span>Interest</span>
              <strong>K {interest.toLocaleString()}</strong>
            </div>

            <div className="mb-5 flex justify-between">
              <span>Interest Rate</span>
              <strong>{rates[period] * 100}%</strong>
            </div>

            <div className="mb-5 flex justify-between">
              <span>Repayment Period</span>
              <strong>{period} Week{period !== "1" ? "s" : ""}</strong>
            </div>

            <div className="mt-8 flex justify-between border-t border-white/20 pt-8 text-2xl font-bold">
              <span>Total Repayment</span>

              <span className="text-[#F97316]">
                K {total.toLocaleString()}
              </span>
            </div>

            <Link href="/apply">
              <button className="mt-10 w-full rounded-xl bg-[#F97316] py-4 font-semibold text-white transition hover:bg-[#EA580C]">
                Apply Now
              </button>
            </Link>

            <p className="mt-6 text-sm leading-6 text-gray-300">
              This calculator provides an estimate only. Final approval,
              valuation of collateral and loan terms are subject to assessment
              by Sonkhela.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}