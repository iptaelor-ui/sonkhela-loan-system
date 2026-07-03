"use client";

import { UploadCloud } from "lucide-react";

interface FileUploadProps {
  title: string;
  subtitle: string;
  multiple?: boolean;
}

export default function FileUpload({
  title,
  subtitle,
  multiple = false,
}: FileUploadProps) {
  return (
    <div>
      <label className="mb-3 block font-semibold text-[#0B1F4D]">
        {title}
      </label>

      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-[#F8FAFC] px-8 py-12 transition hover:border-[#F97316] hover:bg-[#FFF7F1]">

        <UploadCloud
          size={48}
          className="mb-4 text-[#F97316]"
        />

        <h3 className="text-lg font-semibold text-[#0B1F4D]">
          Drag & Drop Files Here
        </h3>

        <p className="mt-2 text-center text-sm text-gray-500">
          {subtitle}
        </p>

        <span className="mt-6 rounded-lg bg-[#F97316] px-5 py-3 font-semibold text-white">
          Browse Files
        </span>

        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          className="hidden"
        />

      </label>
    </div>
  );
}
