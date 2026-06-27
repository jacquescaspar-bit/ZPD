const BACKGROUND_ROWS = ["WHERE", "LEARNING", "HAPPENS"];

const ZPDBackgroundLetters = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0 flex min-h-full flex-col overflow-hidden"
  >
    {BACKGROUND_ROWS.map((word) => (
      <div
        key={word}
        className="flex w-3/4 max-w-none flex-1 items-center justify-between self-center sm:w-full"
      >
        {word.split("").map((letter, index) => (
          <span
            key={`${word}-${index}`}
            className="select-none text-[2.8125rem] font-light leading-none text-gray-400 opacity-20 dark:text-gray-700 sm:text-6xl md:text-8xl md:opacity-30 lg:text-[12rem]"
          >
            {letter}
          </span>
        ))}
      </div>
    ))}
  </div>
);

export default ZPDBackgroundLetters;
