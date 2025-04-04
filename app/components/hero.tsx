interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ 
  title, 
  subtitle
}: HeroProps) {
  return (
    <div className="relative bg-secondary text-white pt-16 pb-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Stylized title with different colors for KONKON, ., and AI */}
          <h1 className="font-bold font-ethnocentric text-center" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
            <span className="text-tertiary-pink">KONKON</span>
            <span className="text-tertiary-turquoise">.</span>
            <span className="text-tertiary-turquoise">AI</span>
          </h1>
          
          {/* Subtitle with centered text as shown in the Figma */}
          <div className="mt-4 mb-10">
            <p className="text-sm font-ocr leading-relaxed text-gray-300 tracking-wide text-center">
              A global celebration of AI-powered<br/>
              storytelling, showcasing innovative films,<br/>
              music videos, and trailers created with<br/>
              cutting-edge technology. Where creativity<br/>
              meets the future of cinema.
            </p>
          </div>
          
          {/* Email signup form that exactly matches the Figma */}
          <div className="flex justify-center items-center gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-black border border-gray-800 text-white px-4 py-2.5 rounded-md w-48 text-sm focus:outline-none font-ocr"
              aria-label="Enter your email address"
            />
            <button 
              type="button"
              className="bg-tertiary-turquoise text-black px-8 py-3 rounded-lg font-ocr text-sm border-2 border-tertiary-pink hover:bg-tertiary-turquoise/90 transition duration-300"
            >
              Reserve a spot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
