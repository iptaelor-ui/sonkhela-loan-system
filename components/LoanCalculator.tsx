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
          <div className="rounded-2xl bg-[#0B1F4D] p-6 text-white sm:p-8">

            <h3 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">
              Loan Summary
            </h3>

            <div className="mb-4 flex items-center justify-between gap-4 text-sm sm:mb-5 sm:text-base">
              <span className="text-gray-300">Loan Amount</span>
              <strong className="whitespace-nowrap">K {amount.toLocaleString()}</strong>
            </div>

            <div className="mb-4 flex items-center justify-between gap-4 text-sm sm:mb-5 sm:text-base">
              <span className="text-gray-300">Interest</span>
              <strong className="whitespace-nowrap">K {interest.toLocaleString()}</strong>
            </div>

            <div className="mb-4 flex items-center justify-between gap-4 text-sm sm:mb-5 sm:text-base">
              <span className="text-gray-300">Interest Rate</span>
              <strong className="whitespace-nowrap">{rates[period] * 100}%</strong>
            </div>

            <div className="mb-4 flex items-center justify-between gap-4 text-sm sm:mb-5 sm:text-base">
              <span className="text-gray-300">Repayment Period</span>
              <strong className="whitespace-nowrap">{period} Week{period !== "1" ? "s" : ""}</strong>
            </div>

            <div className="mt-6 border-t border-white/20 pt-6 sm:mt-8 sm:pt-8">
              <p className="text-sm text-gray-300 sm:text-base">Total Repayment</p>
              <p className="mt-1 text-3xl font-extrabold text-[#F97316] sm:text-4xl">
                K {total.toLocaleString()}
              </p>
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
