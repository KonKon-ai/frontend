import { Link } from "@remix-run/react";
import { FaXTwitter, FaTwitch, FaInstagram, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black">
      {/* Top divider line */}
      <div className="border-t border-gray-800 mx-4"></div>
      
      {/* Main footer with navigation and social links */}
      <div className="bg-black py-8 px-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-start">
            {/* Logo and Navigation */}
            <div className="flex items-start gap-8">
              {/* Logo */}
              <div>
                <Link to="/" className="flex items-center">
                  <img src="/logo-dark.png" alt="Konkon.ai Logo" className="h-16" />
                </Link>
              </div>
              
              {/* Navigation - Vertical Layout */}
              <div>
                <ul className="flex flex-col space-y-2 text-sm font-ocr">
                  <li><Link to="/about" className="hover:text-tertiary-pink">About us</Link></li>
                  <li><Link to="/team" className="hover:text-tertiary-pink">Team</Link></li>
                  <li><Link to="/sponsors" className="hover:text-tertiary-pink">Sponsors</Link></li>
                  <li><Link to="/contact" className="hover:text-tertiary-pink">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
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
        </div>
      </div>
    </footer>
  );
}
