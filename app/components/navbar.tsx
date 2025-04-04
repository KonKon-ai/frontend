import { Link } from "@remix-run/react";
import { FaXTwitter, FaTwitch } from "react-icons/fa6";
import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full bg-secondary text-white py-4 px-8 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo-dark.png" alt="Konkon.ai Logo" className="h-16" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-10 text-xl font-ocr">
        <Link to="/" className="hover:text-tertiary-pink">Home</Link>
        <Link to="/about" className="hover:text-tertiary-pink">About</Link>
        <Link to="/team" className="hover:text-tertiary-pink">Team</Link>
        <Link to="/sponsors" className="hover:text-tertiary-pink">Sponsors</Link>
      </div>

      {/* Social Media Links and CTA */}
      <div className="flex items-center space-x-6">
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://twitter.com/konkonai" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaXTwitter className="text-2xl hover:text-tertiary-pink" />
          </a>
          <a href="https://twitch.tv/konkonai" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
            <FaTwitch className="text-2xl hover:text-tertiary-pink" />
          </a>
          <a href="https://instagram.com/konkonai" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl hover:text-tertiary-pink" />
          </a>
          <a href="https://youtube.com/c/konkonai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube className="text-2xl hover:text-tertiary-pink" />
          </a>
        </div>

        {/* Join Waitlist Button */}
        <Link 
          to="/waitlist" 
          className="bg-secondary border border-tertiary-pink rounded-lg px-5 py-2 text-white text-sm font-ocr"
        >
          Join waitlist
        </Link>
      </div>
    </nav>
  );
}
