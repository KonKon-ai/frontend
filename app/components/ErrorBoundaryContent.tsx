export default function ErrorBoundaryContent({ error }: { error?: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <h1 className="font-ethnocentric text-xl sm:text-3xl font-bold px-8 mb-4 text-center">
        Something went wrong
      </h1>
      <p className="font-ocr text-lg text-gray-300 mb-8 px-8 text-center">
        {error?.message || "An unexpected error occurred. Please try again later."}
      </p>
      <a
        href="/"
        className="font-ocr px-4 py-2 bg-pinkKonkon text-white rounded-lg border-[1px] border-pinkKonkon hover:bg-gray-900 hover:text-white border-solid text-center max-w-xs sm:max-w-xs"
      >
        Go back to the homepage
      </a>
    </div>
  );
}