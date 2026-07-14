import React from "react";
import type { PlanType } from "@/lib/constants";

interface PlanCardProps {
  planId: PlanType;
  price: string; // formatted price like "$129"
  sessions: number;
  title: string;
  highlights: string[];
  isSelected: boolean;
  onSelect?: () => void;
  variant: "desktop" | "mobile";
  showHighlights: boolean;
  showPaymentDetails: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  planId,
  price,
  sessions,
  title,
  highlights,
  isSelected,
  onSelect,
  variant,
  showHighlights,
  showPaymentDetails,
}) => {
  const priceNumber = parseInt(price.replace("$", "").replace(",", ""));
  const pricePerSession =
    sessions > 0 ? `($${Math.round(priceNumber / sessions)} / session)` : "";

  const isCompactMobile =
    variant === "mobile" && isSelected && showPaymentDetails;
  const cardContent = isCompactMobile ? (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-indigo-300 dark:border-indigo-700 flex flex-col ${onSelect ? "cursor-pointer" : ""} relative bg-gradient-to-br from-indigo-50/90 via-white to-indigo-100/80 dark:from-indigo-900/40 dark:via-gray-900/60 dark:to-indigo-900/30 shadow-indigo-100/70 dark:shadow-indigo-800/40 transition-all duration-300`}
      onClick={onSelect ?? undefined}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-opacity duration-300 opacity-50">
          {title}
        </h3>
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 transition-opacity duration-300 opacity-50">
          {price}
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 transition-opacity duration-300 opacity-50">
        <span>
          {sessions === 1 ? "1 session" : `${sessions} sessions / term`}
        </span>
        <span>{pricePerSession}</span>
      </div>
    </div>
  ) : (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col ${onSelect ? "cursor-pointer" : ""} relative ${
        isSelected
          ? "bg-gradient-to-br from-indigo-50/90 via-white to-indigo-100/80 dark:from-indigo-900/40 dark:via-gray-900/60 dark:to-indigo-900/30"
          : "border-white/50 dark:border-gray-700/60 bg-white/85 dark:bg-gray-900/40 hover:border-indigo-200/80 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-lg"
      } ${
        isSelected && showHighlights
          ? "border-indigo-300 shadow-indigo-100/70 dark:shadow-indigo-800/40"
          : ""
      } transition-all duration-300`}
      onClick={onSelect ?? undefined}
    >
      {planId === "essential" && !isSelected && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span
            className={`inline-block bg-gradient-to-r from-amber-400/20 via-yellow-400/15 to-orange-400/20 dark:from-amber-500/30 dark:via-yellow-500/20 dark:to-orange-500/30 backdrop-blur-md text-amber-900 dark:text-amber-100 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-xl border border-amber-300/30 dark:border-amber-400/40 whitespace-nowrap transition-all duration-300 hover:scale-105 ${isSelected && showPaymentDetails ? "opacity-50" : ""} relative overflow-hidden`}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="text-yellow-500 animate-pulse">⭐</span>
              Most Popular
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/10 to-amber-300/10 dark:from-yellow-400/20 dark:to-amber-400/20 animate-pulse" />
          </span>
        </div>
      )}
      <div className="min-h-[3rem] flex items-center justify-start mb-2">
        <h3
          className={`text-2xl font-bold text-gray-900 dark:text-white transition-opacity duration-300 ${isSelected && showPaymentDetails ? "opacity-50" : ""}`}
        >
          {title}
        </h3>
      </div>
      <div className="min-h-[3rem] flex items-center justify-start mb-2">
        <div
          className={`text-4xl font-bold text-indigo-600 dark:text-indigo-400 transition-opacity duration-300 ${isSelected && showPaymentDetails ? "opacity-50" : ""}`}
        >
          {price}
        </div>
      </div>
      <div className="min-h-[3rem] mb-4">
        <p
          className={`text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1 transition-opacity duration-300 ${isSelected && showPaymentDetails ? "opacity-50" : ""}`}
        >
          {sessions === 1 ? "1 session" : `${sessions} sessions / term`}
        </p>
        <p
          className={`text-gray-600 dark:text-gray-400 transition-opacity duration-300 ${isSelected && showPaymentDetails ? "opacity-50" : ""}`}
        >
          {pricePerSession}
        </p>
      </div>
      <ul className="space-y-2 mb-6 flex-grow min-h-[6rem]">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span
              className={`text-indigo-500 mr-2 transition-opacity duration-300 ${isSelected && showPaymentDetails ? "opacity-50" : ""}`}
            >
              ✓
            </span>
            <span
              className={`text-gray-700 dark:text-gray-300 transition-opacity duration-300 ${isSelected && showPaymentDetails ? "opacity-50" : ""}`}
            >
              {highlight}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={`block w-full text-center py-3 rounded-full font-semibold transform transition-all duration-300 mt-auto ${
          isSelected
            ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
        }`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        <span
          className={`transition-opacity duration-300 ${isSelected && showPaymentDetails ? "opacity-50" : ""}`}
        >
          {isSelected ? "Change Plan" : `Select ${title}`}
        </span>
      </button>
    </div>
  );

  return cardContent;
};

export default PlanCard;
