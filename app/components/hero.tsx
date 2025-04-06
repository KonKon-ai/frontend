import { useRef, useState } from "react";

interface HeroProps {
  titleOne: string;
  titleTwo: string;
  description: string;
  submit: {
    href: string;
    label: string;
  };
}

export default function Hero({
  titleOne,
  titleTwo,
  description,
  submit,
}: HeroProps) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // New loading state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (emailInputRef.current) {
      const formData = new FormData();
      formData.append("email", emailInputRef.current.value);

      setLoading(true); // Set loading to true when submission starts

      try {
        const response = await fetch("/subscribers", {
          method: "POST",
          body: formData, // Send as form data
        });

        if (response.ok) {
          setStatusMessage("Thank you for joining the waitlist!");
          setIsError(false);
          emailInputRef.current.value = ""; // Clear the input field
        } else {
          const errorData = await response.json();
          setStatusMessage(
            errorData.error || "Something went wrong. Please try again."
          );
          setIsError(true);
        }
      } catch (error) {
        setStatusMessage("An error occurred. Please try again later.");
        setIsError(true);
      } finally {
        setLoading(false); // Reset loading state after submission
      }

      // Automatically clear the message after 5 seconds
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  return (
    <section className="text-center px-6 py-16 sm:py-32" id="email-section">
      <h1 className="responsive-heading font-ethnocentric large-heading font-bold text-gray-100">
        <span className="text-pinkKonkon">{titleOne}</span>
        <span className="text-aquaKonkon">{titleTwo}</span>
      </h1>
      <p className="font-ocr mt-6 paragraph-text text-gray-300 max-w-2xl mx-auto">
        {description}
      </p>
      {statusMessage && (
        <div
          className={`mt-4 p-4 font-ocr rounded-lg mx-auto max-w-2xl w-auto ${
            isError ? "bg-red-200 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {statusMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          ref={emailInputRef}
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="font-ocr max-w-md w-10/12 sm:w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-aquaKonkon bg-gray-800 border-gray-500 text-gray-100"
          disabled={loading} // Disable input while loading
        />
        <button
          type="submit"
          className={`px-6 py-2 border-[1px] border-pinkKonkon bg-aquaKonkon font-ocr text-black hover:bg-gray-900 hover:text-white border-solid rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? <div className="loader"></div> : submit.label}
        </button>
      </form>
    </section>
  );
}
