import { LoanApplication } from "@/app/apply/page";
import FileUpload from "./FileUpload";

interface SupportingDocumentsProps {
  application: LoanApplication;
  updateApplication: (
    field: keyof LoanApplication,
    value: any
  ) => void;
  loanType: string;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function SupportingDocuments({
  application,
  updateApplication,
  loanType,
  onBack,
  onSubmit,
  loading,
}: SupportingDocumentsProps) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">
        Supporting Documents
      </h2>

      {(loanType === "collateral" ||
        loanType === "white-book") && (
        <>
          <div>
            <label className="mb-2 block font-semibold">
              Describe Your Collateral
            </label>

            <textarea
              rows={5}
              value={application.collateralDescription}
              onChange={(e) =>
                updateApplication(
                  "collateralDescription",
                  e.target.value
                )
              }
              placeholder="Example: iPhone 14 Pro Max 256GB, excellent condition with original box."
              className="w-full rounded-xl border p-4"
            />
          </div>

          <FileUpload
            title="Collateral Photos"
            subtitle="Upload at least 2 clear photos."
            multiple
            onFilesSelected={(files) =>
              updateApplication("collateralImages", files)
            }
          />
        </>
      )}

      {loanType === "student" && (
        <>
          <FileUpload
            title="Student ID"
            subtitle="Upload your student ID."
            onFilesSelected={(files) =>
              updateApplication("collateralImages", files)
            }
          />

          <FileUpload
            title="Admission Letter"
            subtitle="Upload your admission letter."
            onFilesSelected={(files) =>
              updateApplication("nrcFront", files[0] || null)
            }
          />
        </>
      )}

      {loanType === "payslip" && (
        <FileUpload
          title="Latest Payslip"
          subtitle="Upload your latest payslip."
          onFilesSelected={(files) =>
            updateApplication("collateralImages", files)
          }
        />
      )}

      {loanType === "business" && (
        <>
          <div>
            <label className="mb-2 block font-semibold">
              Business Description
            </label>

            <textarea
              rows={5}
              value={application.collateralDescription}
              onChange={(e) =>
                updateApplication(
                  "collateralDescription",
                  e.target.value
                )
              }
              placeholder="Tell us about your business..."
              className="w-full rounded-xl border p-4"
            />
          </div>

          <FileUpload
            title="Business Documents"
            subtitle="Upload supporting documents."
            multiple
            onFilesSelected={(files) =>
              updateApplication("collateralImages", files)
            }
          />
        </>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <FileUpload
          title="NRC Front"
          subtitle="Optional"
          onFilesSelected={(files) =>
            updateApplication("nrcFront", files[0] || null)
          }
        />

        <FileUpload
          title="NRC Back"
          subtitle="Optional"
          onFilesSelected={(files) =>
            updateApplication("nrcBack", files[0] || null)
          }
        />
      </div>

      <div className="mt-12 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="rounded-xl border border-gray-300 px-8 py-4 font-semibold hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="rounded-xl bg-[#F97316] px-10 py-4 font-semibold text-white hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}