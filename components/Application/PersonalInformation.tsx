import { LoanApplication } from "@/app/apply/page";

interface PersonalInformationProps {
  application: LoanApplication;
  updateApplication: (
    field: keyof LoanApplication,
    value: any
  ) => void;
  onNext: () => void;
}

export default function PersonalInformation({
  application,
  updateApplication,
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
            value={application.fullName}
            onChange={(e) =>
              updateApplication("fullName", e.target.value)
            }
            placeholder="John Banda"
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Email Address
          </label>

          <input
            type="email"
            value={application.email}
            onChange={(e) =>
              updateApplication("email", e.target.value)
            }
            placeholder="john@email.com"
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
              value={application.phone}
              onChange={(e) =>
                updateApplication("phone", e.target.value)
              }
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
              value={application.nrcNumber}
              onChange={(e) =>
                updateApplication("nrcNumber", e.target.value)
              }
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