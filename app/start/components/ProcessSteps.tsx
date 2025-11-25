"use client";

import React from "react";
import {
  UserCheck,
  Search,
  Lightbulb,
  Target,
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProcessStepsProps {
  currentIndex: number;
  onStepClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}
const ProcessSteps = ({
  currentIndex,
  onStepClick,
  onPrev,
  onNext,
}: ProcessStepsProps) => {
  const steps = [
    { icon: UserCheck, label: "Intake & Matching", number: 1 },
    { icon: Search, label: "Diagnostic Discovery", number: 2 },
    { icon: Lightbulb, label: "Teacher Insight", number: 3 },
    { icon: Target, label: "Personalised Plan", number: 4 },
    { icon: Users, label: "Sessions Commence", number: 5 },
    { icon: MessageSquare, label: "Continuous Feedback", number: 6 },
  ];

  const formatLabel = (label: string): string => {
    const words = label.split(" ");
    if (words.length === 2) {
      return `${words[0]}\n${words[1]}`;
    }
    if (words.length === 3) {
      return `${words[0]} ${words[1]}\n${words[2]}`;
    }
    return label;
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-16">
      {/* Small navigation buttons in corners - hidden on mobile */}
      <button
        aria-label="Previous step"
        className="absolute top-1/2 -translate-y-1/2 left-4 z-10 p-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors hidden md:block"
        onClick={onPrev}
      >
        <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
      <button
        aria-label="Next step"
        className="absolute top-1/2 -translate-y-1/2 right-4 z-10 p-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors hidden md:block"
        onClick={onNext}
      >
        <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>

      <div className="absolute left-8 top-8 bottom-8 right-8 bg-gray-200 dark:bg-gray-600 rounded-3xl -z-10 hidden md:block" />
      <div className="flex md:hidden flex-row justify-between items-center mb-6 w-full">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = index === currentIndex;
          const borderWidth = "border-2";
          const bgClass = isActive
            ? "bg-blue-500 border-blue-600"
            : "bg-white dark:bg-gray-800 border-transparent";
          return (
            <button
              key={index}
              aria-label={`Go to step ${step.number}: ${step.label}`}
              className="relative h-10 flex items-center justify-center focus:outline-none rounded-full"
              onClick={() => onStepClick(index)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 opacity-60"}`}
              >
                <IconComponent className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div
                className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center ${borderWidth} ${bgClass}`}
              >
                <span
                  className={`text-xs font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-blue-500"}`}
                >
                  {step.number}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="hidden md:flex md:justify-between md:items-center relative px-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = index === currentIndex;
          const borderWidth = "border-2";
          const bgClass = isActive
            ? "bg-blue-500 border-blue-600"
            : "bg-white dark:bg-gray-800 border-transparent";
          return (
            <div key={index} className="flex flex-col items-center">
              <button
                aria-label={`Go to step ${step.number}: ${step.label}`}
                className="relative h-16 flex items-center justify-center mb-6 focus:outline-none rounded-full"
                onClick={() => onStepClick(index)}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 opacity-60"}`}
                >
                  <IconComponent
                    className="w-8 h-8 text-white"
                    strokeWidth={2}
                  />
                </div>
                <div
                  className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center ${borderWidth} ${bgClass}`}
                >
                  <span
                    className={`text-xs font-bold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-blue-500"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>
              </button>
              <div className="h-8 flex flex-col justify-center w-24">
                <span
                  className={`text-sm ${isActive ? "font-bold text-gray-900 dark:text-white" : "font-light text-gray-700 dark:text-gray-300"} text-center`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {formatLabel(step.label)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 flex">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-l-full flex-1 opacity-30"
          style={{ flexBasis: "66.67%" }}
        />
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-r-full flex-1"
          style={{ flexBasis: "33.33%" }}
        />
      </div>
      <div className="flex mt-4">
        <div className="flex-1 text-center" style={{ flexBasis: "66.67%" }}>
          <span
            className={
              currentIndex >= 0 && currentIndex <= 3
                ? "font-bold text-gray-900 dark:text-white"
                : "text-sm text-gray-600 dark:text-gray-400"
            }
          >
            Pre-Term Planning
          </span>
        </div>
        <div className="flex-1 text-center" style={{ flexBasis: "33.33%" }}>
          <span
            className={
              currentIndex >= 4 && currentIndex <= 5
                ? "font-bold text-gray-900 dark:text-white"
                : "text-sm text-gray-600 dark:text-gray-400"
            }
          >
            Weeks 1 - 10
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
