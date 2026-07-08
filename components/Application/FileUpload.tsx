"use client";

import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import {
  UploadCloud,
  Trash2,
  CheckCircle2,
  ImageIcon,
  Loader2,
} from "lucide-react";

interface FileUploadProps {
  title: string;
  subtitle: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}

interface PreviewFile {
  file: File;
  preview: string;
}

export default function FileUpload({
  title,
  subtitle,
  multiple = false,
  onFilesSelected,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [compressing, setCompressing] = useState(false);

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    setCompressing(true);

    const compressedFiles: File[] = [];

    for (const file of selectedFiles) {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      });

      compressedFiles.push(compressed);
    }

    const previews = compressedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles(previews);

    onFilesSelected(compressedFiles);

    setCompressing(false);
  }

  function removeFile(index: number) {
    const updated = files.filter((_, i) => i !== index);

    setFiles(updated);

    onFilesSelected(updated.map((x) => x.file));

    if (!updated.length && inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div>

      <label className="mb-3 block font-semibold text-[#0B1F4D]">
        {title}
      </label>

      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-[#F8FAFC] px-8 py-10 transition hover:border-[#F97316] hover:bg-[#FFF7F1]">

        <UploadCloud
          size={46}
          className="mb-4 text-[#F97316]"
        />

        <h3 className="text-lg font-bold text-[#0B1F4D]">
          Click to Upload
        </h3>

        <p className="mt-2 text-center text-sm text-gray-500">
          {subtitle}
        </p>

        <span className="mt-6 rounded-xl bg-[#F97316] px-6 py-3 font-semibold text-white">
          Browse Files
        </span>

        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

      </label>

      {compressing && (

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-blue-50 p-4">

          <Loader2
            className="animate-spin text-blue-600"
            size={22}
          />

          <span className="font-medium text-blue-700">
            Optimising images...
          </span>

        </div>

      )}

      {!!files.length && (

        <div className="mt-6">

          <div className="mb-5 flex items-center gap-2">

            <CheckCircle2
              className="text-green-600"
              size={20}
            />

            <span className="font-semibold text-green-700">
              {files.length} file{files.length > 1 ? "s" : ""} ready
            </span>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {files.map((item, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >

                <img
                  src={item.preview}
                  alt=""
                  className="h-52 w-full object-cover"
                />

                <div className="space-y-2 p-4">

                  <div className="flex items-center gap-2">

                    <ImageIcon
                      size={18}
                      className="text-[#F97316]"
                    />

                    <p className="truncate font-semibold">
                      {item.file.name}
                    </p>

                  </div>

                  <p className="text-sm text-gray-500">
                    {(item.file.size / 1024).toFixed(0)} KB
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFile(index);
                    }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-semibold text-red-600 hover:bg-red-100"
                  >

                    <Trash2 size={18} />

                    Remove

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}