import type { MetaFunction } from "@remix-run/node";
import SignupSection from "~/components/SignupSection";
import { FaXTwitter, FaTwitch, FaInstagram, FaYoutube } from "react-icons/fa6";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - About Us" },
    { name: "description", content: "Learn more about Konkon.ai and our mission." },
  ];
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#180525]">
      {/* Video Space */}
      <div className="container mx-auto px-4 py-8">
        <div className="border border-gray-700 rounded-lg w-full max-w-3xl mx-auto aspect-video bg-[#20072C]">
          {/* Video will be added here later */}
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="border-t border-gray-800 mx-4 my-6"></div>
      
      {/* About Us Content */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-5xl font-bold mb-8 font-ethnocentric text-white tracking-wider">ABOUT US</h1>
        
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-white font-ocr mb-6 leading-relaxed">
            Lorem ipsum usus possint que nos copia nos et abundans ferina universis. Lorem ipsum usus possint que nos copia nos et abundans ferina universis.
          </p>
          
          <ul className="text-left space-y-4 text-white font-ocr">
            <li className="flex items-start">
              <span className="text-white mr-2 mt-1">•</span>
              <p>Lorem ipsum usus possint que nos copia nos et abundans ferina universis Lorem ipsum</p>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2 mt-1">•</span>
              <p>Lorem ipsum usus possint que nos copia nos et abundans ferina universis Lorem ipsum</p>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2 mt-1">•</span>
              <p>Lorem ipsum usus possint que nos copia nos et abundans ferina universis Lorem ipsum</p>
            </li>
          </ul>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://twitter.com/konkonai" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white">
            <FaXTwitter className="text-2xl hover:text-tertiary-pink" />
          </a>
          <a href="https://twitch.tv/konkonai" target="_blank" rel="noopener noreferrer" aria-label="Twitch" className="text-white">
            <FaTwitch className="text-2xl hover:text-tertiary-pink" />
          </a>
          <a href="https://instagram.com/konkonai" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white">
            <FaInstagram className="text-2xl hover:text-tertiary-pink" />
          </a>
          <a href="https://youtube.com/c/konkonai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white">
            <FaYoutube className="text-2xl hover:text-tertiary-pink" />
          </a>
        </div>
      </div>
      
      {/* Sign Up Section */}
      <SignupSection />
    </div>
  );
} 