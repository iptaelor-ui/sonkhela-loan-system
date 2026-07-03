interface PersonalInformationProps {
  onNext: () => void;
}

export default function PersonalInformation({
  onNext,
}: PersonalInformationProps) {
  return (
    <div>

      <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">
        Personal Information
      </h2>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-semibold">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Banda"
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="+260..."
              className="w-full rounded-xl border p-4"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              NRC Number
            </label>

            <input
              type="text"
              placeholder="123456/12/1"
              className="w-full rounded-xl border p-4"
            />

          </div>

        </div>

      </div>

      <button
        onClick={onNext}
        className="mt-10 rounded-xl bg-[#F97316] px-10 py-4 font-semibold text-white hover:bg-[#EA580C]"
      >
        Continue
      </button>

    </div>
  );
}