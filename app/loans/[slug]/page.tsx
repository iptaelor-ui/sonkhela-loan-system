import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Banknote,
  GraduationCap,
  Store,
  Briefcase,
  Car,
  Bell,
  ShieldCheck,
} from "lucide-react";

const PRODUCTS: Record<
  string,
  { title: string; tagline: string; desc: string; Icon: React.ElementType }
> = {
  payslip: {
    title: "Payslip Backed Loans",
    tagline: "FOR SALARIED EMPLOYEES",
    desc: "Affordable loans secured against your monthly payslip — no physical collateral needed. Designed for civil servants and salaried workers.",
    Icon: Banknote,
  },
  student: {
    title: "Student Loans",
    tagline: "FOR STUDENTS",
    desc: "Flexible financial support for tuition, accommodation, project costs and everyday student needs at UNZA, Mulungushi, UNILUS, NIPA and beyond.",
    Icon: GraduationCap,
  },
  marketeer: {
    title: "Marketeer Loans",
    tagline: "FOR TRADERS & VENDORS",
    desc: "Working capital designed around the daily and weekly cash flow of market traders and vendors — restock today, repay as you sell.",
    Icon: Store,
  },
  business: {
    title: "Business Loans",
    tagline: "FOR GROWING BUSINESSES",
    desc: "Finance to help registered small businesses grow — stock, equipment, and expansion capital with clear, honest terms.",
    Icon: Briefcase,
  },
  "white-book": {
    title: "White Book Loans",
    tagline: "FOR VEHICLE OWNERS",
    desc: "Unlock larger amounts using your vehicle's white book as security — while you keep driving your car.",
    Icon: Car,
  },
};

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export default async function ComingSoonLoanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) notFound();

  const { title, tagline, desc, Icon } = product;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0B1F4D] pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto mb-8 inline-flex rounded-3xl bg-white/10 p-6">
            <Icon size={56} className="text-[#F97316]" />
          </div>
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            {tagline}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold">{title}</h1>
          <div className="mx-auto mt-6 inline-block rounded-full bg-[#F97316] px-6 py-2 text-sm font-bold uppercase tracking-widest">
            🚀 Coming Soon
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg leading-9 text-gray-700">{desc}</p>

          <div className="mt-12 rounded-3xl border border-[#F97316]/20 bg-[#FFF8F3] p-10">
            <Bell size={36} className="mx-auto text-[#F97316]" />
            <h2 className="mt-4 text-2xl font-bold text-[#0B1F4D]">
              We&apos;re working on it!
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-8 text-gray-700">
              This product is being prepared and will launch soon. Follow us or{" "}
              <Link
                href="/contact"
                className="font-semibold text-[#F97316] underline"
              >
                contact us
              </Link>{" "}
              to be notified when it becomes available.
            </p>
          </div>

          {/* Redirect to what IS available */}
          <div className="mt-12 rounded-3xl bg-white p-10 shadow-lg">
            <ShieldCheck size={36} className="mx-auto text-green-600" />
            <h2 className="mt-4 text-2xl font-bold text-[#0B1F4D]">
              Need cash right now?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-8 text-gray-700">
              Our <strong>Collateral Backed Loans</strong> are available today —
              get quick cash secured against a phone, laptop, TV, or other
              valuable item, with same-day review.
            </p>
            <Link href="/loans/collateral">
              <button className="mt-8 rounded-xl bg-[#F97316] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#EA580C]">
                Apply for a Collateral Loan
              </button>
            </Link>
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="font-semibold text-[#0B1F4D] underline hover:text-[#F97316]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
