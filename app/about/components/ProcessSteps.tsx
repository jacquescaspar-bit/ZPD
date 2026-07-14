import { Search, Target, UserCheck, Users } from "lucide-react";

const steps = [
  { icon: UserCheck, label: "Intake & Matching", number: 1 },
  { icon: Search, label: "Diagnostic Discovery", number: 2 },
  { icon: Target, label: "Personalised Plan", number: 3 },
  { icon: Users, label: "Sessions Commence", number: 4 },
] as const;

const formatLabel = (label: string): string => {
  const words = label.split(" ");
  if (words.length === 2) return `${words[0]}\n${words[1]}`;
  if (words.length === 3) return `${words[0]} ${words[1]}\n${words[2]}`;
  return label;
};

const ProcessSteps = () => (
  <div className="relative mb-4 hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:block">
    <div className="absolute bottom-8 left-8 right-8 top-8 -z-10 hidden rounded-3xl bg-gray-200 dark:bg-gray-600 md:block" />
    <div className="relative h-28 px-8">
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        return (
          <div
            key={step.label}
            className="absolute flex flex-col items-center"
            style={{
              left: `${(index + 0.5) * 25}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="relative mb-6 flex h-16 items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 shadow-lg">
                <IconComponent className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
              <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-500">
                <span className="font-mono text-xs font-bold text-white">
                  {step.number}
                </span>
              </div>
            </div>
            <div className="flex h-10 w-24 flex-col justify-center">
              <span
                className="text-center text-base font-semibold text-gray-900 dark:text-white"
                style={{ whiteSpace: "pre-line" }}
              >
                {formatLabel(step.label)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-8 flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-2.5 flex-1 rounded-l-full bg-indigo-600"
        style={{ flexBasis: "75%" }}
      />
      <div
        className="h-2.5 flex-1 rounded-r-full bg-indigo-600"
        style={{ flexBasis: "25%" }}
      />
    </div>
    <div className="mt-4 flex">
      <div className="flex-1 text-center" style={{ flexBasis: "75%" }}>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          Pre-Term Discovery & Planning
        </span>
      </div>
      <div className="flex-1 text-center" style={{ flexBasis: "25%" }}>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          Weeks 1 - 9
        </span>
      </div>
    </div>
  </div>
);

export default ProcessSteps;
