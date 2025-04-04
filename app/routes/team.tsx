import type { MetaFunction } from "@remix-run/node";
import { FaXTwitter, FaTwitch, FaInstagram, FaYoutube } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import SignupSection from "~/components/SignupSection";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - The Team" },
    { name: "description", content: "Meet the team behind Konkon.ai." },
  ];
};

const teamMembers = [
  {
    id: 1,
    title: "Team 1 Title",
    role: "CEO"
  },
  {
    id: 2,
    title: "Team 2 Title",
    role: "CTO"
  },
  {
    id: 3,
    title: "Team 3 Title",
    role: "CMO"
  },
  {
    id: 4,
    title: "Team 4 Title",
    role: "COO"
  },
  {
    id: 5,
    title: "Team 5 Title",
    role: "CFO"
  },
  {
    id: 6,
    title: "Team 6 Title",
    role: "CIO"
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-[#180525]">
      {/* Team Content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold mb-8 font-ethnocentric text-white tracking-wider">THE TEAM</h1>
        
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-white font-ocr mb-6 leading-relaxed">
            Lorem ipsum usus possint que nos copia nos et abundans ferina universis. Lorem ipsum usus possint que nos copia nos et abundans ferina universis.
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <div className="mb-4 bg-black rounded-full p-2 inline-block">
                <FaUserCircle className="text-white text-6xl" />
              </div>
              <h3 className="text-white font-ocr">{member.title}</h3>
              <p className="text-gray-400 font-ocr text-sm">{member.role}</p>
            </div>
          ))}
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-16 mb-8">
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