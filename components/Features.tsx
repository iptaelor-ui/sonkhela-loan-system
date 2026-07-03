import Link from "next/link";
import {
  Shield,
  BadgeDollarSign,
  GraduationCap,
  Store,
  BriefcaseBusiness,
  CarFront,
} from "lucide-react";

const loans = [
  {
    title: "Collateral Backed Loans",
    description: "Unlock quick cash using valuable assets as collateral.",
    icon: Shield,
    link: "/loans/collateral",
  },
  {
    title: "Payslip Backed Loans",
    description: "Affordable loans for salaried employees with payslips.",
    icon: BadgeDollarSign,
    link: "/loans/payslip",
  },
  {
    title: "Student Loans",
    description: "Flexible financial support for tuition and student needs.",
    icon: GraduationCap,
    link: "/loans/student",
  },
  {
    title: "Marketeer Loans",
    description: "Working capital designed for market traders and vendors.",
    icon: Store,
    link: "/loans/marketeer",
  },
  {
    title: "Business Loans",
    description: "Finance to help your business grow and expand.",
    icon: BriefcaseBusiness,
    link: "/loans/business",
  },
  {
    title: "White Book Loans",
    description: "Access funds using your vehicle's white book as security.",
    icon: CarFront,
    link: "/loans/white-book",
  },
];

export default function Features() {
  return (
    <section
      id="loan-products"
      className="bg-[#F8FAFC] py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            OUR LOAN PRODUCTS
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-[#0B1F4D]">
            Loans Designed For You
          </h2>

          <p className="mt-4 text-gray-600">
            Choose the loan product that best fits your financial needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => {
            const Icon = loan.icon;

            return (
              <Link key={loan.title} href={loan.link}>
                <div className="group h-full cursor-pointer rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-xl">

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4EC] text-[#F97316]">
                    <Icon size={32} />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-[#0B1F4D]">
                    {loan.title}
                  </h3>

                  <p className="mb-8 text-gray-600">
                    {loan.description}
                  </p>

                  <span className="font-semibold text-[#F97316] transition group-hover:translate-x-2">
                    Learn More →
                  </span>

                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}