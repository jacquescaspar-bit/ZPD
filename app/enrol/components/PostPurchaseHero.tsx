"use client";

interface PostPurchaseHeroProps {
  scrollTargetId?: string;
}

const PostPurchaseHero: React.FC<PostPurchaseHeroProps> = ({
  scrollTargetId = "tasks-section",
}) => (
  <div className="text-center py-12">
    {/* Clean Success Message */}
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
      Thank you for choosing ZPD Learning. Your receipt and next steps have been
      emailed to you via grow@zpdlearning.com
    </p>

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
      Help us plan for the term and match you with the most suitable tutor:
    </p>

    {/* Simple CTA */}
    <div className="mt-8">
      <button
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        onClick={() => {
          const tasksSection = document.getElementById(scrollTargetId);
          if (tasksSection) {
            const navbarHeight = 80; // Approximate navbar height
            const elementPosition = tasksSection.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }}
      >
        Continue to Complete Profile
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
    </div>
  </div>
);

export default PostPurchaseHero;
