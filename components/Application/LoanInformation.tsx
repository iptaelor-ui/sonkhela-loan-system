import { LoanApplication } from "@/app/apply/page";

interface LoanInformationProps {
  application: LoanApplication;
  loanName: string;
  updateApplication: (
    field: keyof LoanApplication,
    value: any
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function LoanInformation({
  application,
  loanName,
  updateApplication,
  onNext,
  onBack,
}: LoanInformationProps) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">
        Loan Information
      </h2>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-semibold">
            Loan Product
          </label>

          <input
            readOnly
            value={loanName}
            className="w-full rounded-xl border bg-gray-100 p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Loan Amount (ZMW)
          </label>

          <input
            type="number"
            value={application.loanAmount}
            onChange={(e) =>
              updateApplication("loanAmount", e.target.value)
            }
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Repayment Period
          </label>

          <select
            value={application.repaymentPeriod}
            onChange={(e) =>
              updateApplication("repaymentPeriod", e.target.value)
            }
            className="w-full rounded-xl border p-4"
          >
            <option value="1">1 Week</option>
            <option value="2">2 Weeks</option>
            <option value="3">3 Weeks</option>
            <option value="4">4 Weeks</option>
          </select>
        </div>

      </div>

      <div className="mt-10 flex justify-between">

        <button
          onClick={onBack}
          className="rounded-xl border px-8 py-4 font-semibold"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white hover:bg-[#EA580C]"
        >
          Continue
        </button>

      </div>
    </div>
  );
}