"use client";

interface StepperProps {
  currentStep: number;
}

const steps = [
  "Personal Information",
  "Loan Information",
  "Supporting Documents",
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="mb-14">

      <div className="flex items-center justify-between">

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = stepNumber <= currentStep;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all ${
                    active
                      ? "bg-[#F97316] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>

                <p
                  className={`mt-3 text-center text-sm font-medium ${
                    active
                      ? "text-[#0B1F4D]"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </p>

              </div>

              {stepNumber !== steps.length && (
                <div
                  className={`mx-4 h-1 flex-1 rounded-full ${
                    currentStep > stepNumber
                      ? "bg-[#F97316]"
                      : "bg-gray-200"
                  }`}
                />
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}