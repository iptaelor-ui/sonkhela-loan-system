import Link from "next/link";
import { ShieldCheck, Zap, Users, MapPin } from "lucide-react";

export const metadata = {
  title: "About Us — Sonkhela Soft Loans",
  description:
    "Sonkhela Soft Loans is a PACRA-registered microfinance business providing fast, collateral-backed loans to students and communities across Lusaka, Zambia.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0B1F4D] pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            ABOUT US
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight">
            Simple Loans. Real People.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Emergencies don&apos;t wait for payday. Sonkhela gets you cash the
            same day — no queues, no endless paperwork, no judgement. Just bring
            your NRC and something of value.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-[#0B1F4D]">Who We Are</h2>
            <p className="leading-8 text-gray-700">
              We started on campus, lending to students the banks ignore.
              Today Sonkhela is a <strong>PACRA-registered</strong> lending
              business serving UNZA, Mulungushi, UNILUS, NIPA and communities
              across Lusaka.
            </p>
            <p className="mt-5 leading-8 text-gray-700">
              The model is simple: your phone, laptop, or other valuable item
              secures the loan. It&apos;s stored safely, you get your cash in
              hours, and the item comes back the moment you repay. Written
              agreement. Clear rates. No hidden charges — ever.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-[#0B1F4D]">
              Why Clients Choose Us
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Zap className="mt-1 shrink-0 text-[#F97316]" />
                <div>
                  <p className="font-bold text-[#0B1F4D]">Fast Approval</p>
                  <p className="text-gray-700">
                    Apply online in minutes. Most applications are reviewed the
                    same day.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <ShieldCheck className="mt-1 shrink-0 text-[#F97316]" />
                <div>
                  <p className="font-bold text-[#0B1F4D]">Safe & Transparent</p>
                  <p className="text-gray-700">
                    Registered business, written agreements, and your collateral
                    stored securely until repayment.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Users className="mt-1 shrink-0 text-[#F97316]" />
                <div>
                  <p className="font-bold text-[#0B1F4D]">Built for Real People</p>
                  <p className="text-gray-700">
                    Flexible options designed around students, marketeers, and
                    working Zambians.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-[#F97316]" />
                <div>
                  <p className="font-bold text-[#0B1F4D]">Local & Accessible</p>
                  <p className="text-gray-700">
                    Based in Lusaka and serving campuses and communities you
                    know.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-[#0B1F4D] p-12 text-center text-white">
            <h2 className="text-3xl font-extrabold">Need cash today?</h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-300">
              Apply online in under 5 minutes with your NRC and a valuable item
              as collateral.
            </p>
            <Link href="/apply?loan=collateral">
              <button className="mt-8 rounded-xl bg-[#F97316] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#EA580C]">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
