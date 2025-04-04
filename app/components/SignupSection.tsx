import { useState } from "react";

export default function SignupSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for signing up with: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-[#180525] py-8">
      {/* Horizontal line above section */}
      <div className="border-t border-gray-800 mx-4 mb-8"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-[#180525] border-2 border-white px-6 py-3 text-white text-lg font-ocr rounded-md w-64 focus:outline-none focus:border-tertiary-pink mr-4"
                required
                aria-label="Email for newsletter"
              />
              <button 
                type="submit"
                className="inline-block px-12 py-4 bg-[#180525] text-white text-2xl font-ethnocentric border-2 border-white rounded-md hover:bg-[#281035] transition duration-300"
                aria-label="Sign up for newsletter"
              >
                SIGN UP
              </button>
            </form>
          </div>
          
          <div className="flex items-center">
            <img src="/logo-circular.png" alt="Konkon.ai Logo" className="h-20 w-20" />
          </div>
        </div>
      </div>
    </section>
  );
} 