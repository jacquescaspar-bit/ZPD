interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  popular = false,
}: PricingCardProps) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      popular
        ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400"
        : "border-gray-100 dark:border-gray-700"
    }`}
  >
    {popular && (
      <div className="text-center mb-4">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full">
          Most Popular
        </span>
      </div>
    )}

    <div className="text-center mb-6">
      <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {description}
      </p>
      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
        {price}
      </div>
      <div className="text-gray-500 dark:text-gray-400 text-sm">{period}</div>
    </div>

    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            {feature}
          </span>
        </li>
      ))}
    </ul>

    <div className="text-center">
      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
        Choose Plan
      </button>
    </div>
  </div>
);

export default PricingCard;
