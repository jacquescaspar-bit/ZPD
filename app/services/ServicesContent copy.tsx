// app/services/ServiceCard.tsx
import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  iconPath: string;
  gradient: string;
  children: ReactNode;
}

const ServiceCard = ({ id, title, iconPath, gradient, children }: Props) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id={id}
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div
          className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center`}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d={iconPath}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          {title}
        </h3>
        {children}
      </div>
    </div>
  </div>
);

export default ServiceCard;
