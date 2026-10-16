"use client";

const PDF_HREF = "/guides/is-tutoring-the-right-fit.pdf";

const GuidePrintActions = () => (
  <p className="no-print text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
    <a
      download
      className="underline decoration-dotted underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
      href={PDF_HREF}
    >
      Download PDF
    </a>
    {" · "}
    <button
      className="underline decoration-dotted underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
      type="button"
      onClick={() => window.print()}
    >
      Print
    </button>
  </p>
);

export default GuidePrintActions;
