import Link from "next/link";

export default function CollateralLoanPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-[#0B1F4D] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            COLLATERAL BACKED LOANS
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            Get Cash Using Your Valuable Assets
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-8">
            Receive quick financing by securing your loan with valuable
            collateral. Our process is fast, secure and transparent.
          </p>

        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

          {/* Left */}
          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">
              Accepted Collateral
            </h2>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>📱 Smartphones</li>
              <li>💻 Laptops & Computers</li>
              <li>📺 Televisions</li>
              <li>🎮 Gaming Consoles</li>
              <li>⌚ Watches & Jewellery</li>
              <li>🚗 Motor Vehicles</li>
              <li>📦 Other Valuable Assets</li>
            </ul>

            <hr className="my-10" />

            <h3 className="mb-5 text-2xl font-bold text-[#0B1F4D]">
              Requirements
            </h3>

            <ul className="space-y-4 text-gray-700">
              <li>✅ Valid NRC</li>
              <li>✅ Valuable Collateral</li>
              <li>✅ Proof of Ownership (if available)</li>
              <li>✅ Active Phone Number</li>
            </ul>

          </div>

          {/* Right */}
          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">
              Loan Terms
            </h2>

            <div className="space-y-6">

              <div className="flex justify-between border-b pb-4">
                <span>1 Week</span>
                <strong>15%</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span>2 Weeks</span>
                <strong>25%</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span>3 Weeks</span>
                <strong>30%</strong>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span>4 Weeks</span>
                <strong>40%</strong>
              </div>

              <div className="rounded-xl bg-[#FFF4EC] p-5">

                <p className="font-semibold text-[#F97316]">
                  Maximum Repayment Period
                </p>

                <p className="mt-2 text-gray-700">
                  All loans must be fully repaid within <strong>1 month (4 weeks)</strong>.
                </p>

              </div>

              <Link href="/apply?loan=collateral">
                <button className="mt-6 w-full rounded-xl bg-[#F97316] py-4 text-lg font-semibold text-white transition hover:bg-[#EA580C]">
                  Continue Application
                </button>
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}