import Link from "next/link";
import {
  ShieldCheck,
  Banknote,
  GraduationCap,
  Store,
  Briefcase,
  Car,
} from "lucide-react";

export const metadata = {
  title: "Our Services — Sonkhela Soft Loans",
  description:
    "Fast collateral-backed loans in Lusaka, Zambia. Clear rates, weekly terms, and same-day review.",
};

const RATES = [
  { period: "1 Week", rate: "15%" },
  { period: "2 Weeks", rate: "25%" },
  { period: "3 Weeks", rate: "30%" },
  { period: "4 Weeks", rate: "40%" },
];

const UPCOMING = [
  {
    icon: Banknote,
    title: "Payslip Backed Loans",
    desc: "Affordable loans for salaried employees with payslips.",
    slug: "payslip",
  },
  {
    icon: GraduationCap,
    title: "Student Loans",
    desc: "Flexible financial support for tuition and student needs.",
    slug: "student",
  },
  {
    icon: Store,
    title: "Marketeer Loans",
    desc: "Working capital designed for market traders and vendors.",
    slug: "marketeer",
  },
  {
    icon: Briefcase,
    title: "Business Loans",
    desc: "Finance to help your business grow and expand.",
    slug: "business",
  },
  {
    icon: Car,
    title: "White Book Loans",
    desc: "Access funds using your vehicle's white book as security.",
    slug: "white-book",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0B1F4D] pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            OUR SERVICES
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight">
            Loans That Work For You
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Clear rates. Short, manageable terms. No hidden fees. Here is
            everything we offer today and what is coming next.
          </p>
        </div>
      </section>

      {/* Flagship product */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-10 shadow-lg">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-2xl bg-[#FFF4EC] p-4">
                  <ShieldCheck size={32} className="text-[#F97316]" />
                </div>
                <div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700">
                    Available Now
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#0B1F4D]">
                    Collateral Backed Loans
                  </h2>
                </div>
              </div>
              <p className="leading-8 text-gray-700">
                Our flagship product. Get quick cash by securing your loan with
                a valuable item — smartphones, laptops, TVs, gaming consoles,
                jewellery, vehicles and more. Your item is stored safely and
                returned in full when your loan is repaid.
              </p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li>✅ Same-day review</li>
                <li>✅ Valid NRC + collateral is all you need</li>
                <li>✅ Written agreement, transparent terms</li>
                <li>✅ Repay early anytime</li>
              </ul>
              <Link href="/loans/collateral">
                <button className="mt-8 w-full rounded-xl bg-[#F97316] py-4 text-lg font-semibold text-white transition hover:bg-[#EA580C]">
                  Learn More & Apply
                </button>
              </Link>
            </div>

            {/* Rates */}
            <div className="rounded-3xl bg-white p-10 shadow-lg">
              <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">
                Interest Rates
              </h2>
              <div className="space-y-6">
                {RATES.map((r) => (
                  <div
                    key={r.period}
                    className="flex justify-between border-b pb-4 text-lg"
                  >
                    <span className="text-gray-700">{r.period}</span>
                    <strong className="text-[#0B1F4D]">{r.rate}</strong>
                  </div>
                ))}
                <div className="rounded-xl bg-[#FFF4EC] p-5">
                  <p className="font-semibold text-[#F97316]">
                    Maximum Repayment Period
                  </p>
                  <p className="mt-2 text-gray-700">
                    All loans must be fully repaid within{" "}
                    <strong>1 month (4 weeks)</strong>. A due-date reminder is
                    sent 2 days before repayment is due.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming soon products */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
              EXPANDING SOON
            </p>
            <h2 className="mt-3 text-4xl font-extrabold text-[#0B1F4D]">
              More Products On The Way
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {UPCOMING.map((p) => (
              <Link key={p.slug} href={`/loans/${p.slug}`}>
                <div className="group h-full rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 inline-flex rounded-2xl bg-[#FFF4EC] p-4">
                    <p.icon size={28} className="text-[#F97316]" />
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                    Coming Soon
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-[#0B1F4D]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
