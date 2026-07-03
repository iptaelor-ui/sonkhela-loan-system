interface LoanInformationProps {
  loanName: string;
  onNext: () => void;
  onBack: () => void;
}

export default function LoanInformation({
  loanName,
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
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Repayment Period
          </label>

          <select className="w-full rounded-xl border p-4">
            <option>1 Week</option>
            <option>2 Weeks</option>
            <option>3 Weeks</option>
            <option>4 Weeks</option>
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
          className="rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white"
        >
          Continue
        </button>

      </div>

    </div>
  );
}