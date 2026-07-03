import FileUpload from "./FileUpload";

interface SupportingDocumentsProps {
  onBack: () => void;
}

export default function SupportingDocuments({
  onBack,
}: SupportingDocumentsProps) {
  return (
    <div>

      <h2 className="mb-8 text-3xl font-bold text-[#0B1F4D]">
        Supporting Documents
      </h2>

      <div className="space-y-8">

        <div>

          <label className="mb-2 block font-semibold">
            Describe Your Collateral
          </label>

          <textarea
            rows={5}
            placeholder="Describe your collateral..."
            className="w-full rounded-xl border p-4"
          />

        </div>

        <FileUpload
          title="Collateral Photos"
          subtitle="Upload at least 2 clear photos."
          multiple
        />

        <div className="grid gap-8 md:grid-cols-2">

          <FileUpload
            title="NRC Front"
            subtitle="Upload the front of your NRC."
          />

          <FileUpload
            title="NRC Back"
            subtitle="Upload the back of your NRC."
          />

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
          className="rounded-xl bg-[#F97316] px-10 py-4 font-semibold text-white"
        >
          Submit Application
        </button>

      </div>

    </div>
  );
}