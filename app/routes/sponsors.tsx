import type { MetaFunction } from "@remix-run/node";
import SignupSection from "~/components/SignupSection";
import { FaXTwitter, FaTwitch, FaInstagram, FaYoutube } from "react-icons/fa6";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - Our Sponsors" },
    { name: "description", content: "See the organizations and partners supporting Konkon.ai." },
  ];
};

const sponsors = {
  tier1: [
    { id: 1, name: "Gold Sponsor1", logo: "/placeholder-logo.png" },
    { id: 2, name: "Gold Sponsor2", logo: "/placeholder-logo.png" },
    { id: 3, name: "Gold Sponsor3", logo: "/placeholder-logo.png" },
    { id: 4, name: "Gold Sponsor4", logo: "/placeholder-logo.png" }
  ],
  tier2: [
    { id: 5, name: "Silver Sponsor1", logo: "/placeholder-logo.png" },
    { id: 6, name: "Silver Sponsor2", logo: "/placeholder-logo.png" },
    { id: 7, name: "Silver Sponsor3", logo: "/placeholder-logo.png" },
    { id: 8, name: "Silver Sponsor4", logo: "/placeholder-logo.png" }
  ],
  tier3: [
    { id: 9, name: "Bronze Sponsor1", logo: "/placeholder-logo.png" },
    { id: 10, name: "Bronze Sponsor2", logo: "/placeholder-logo.png" },
    { id: 11, name: "Bronze Sponsor3", logo: "/placeholder-logo.png" },
    { id: 12, name: "Bronze Sponsor4", logo: "/placeholder-logo.png" }
  ]
};

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-[#180525]">
      {/* Sponsors Header */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold mb-8 font-ethnocentric text-white tracking-wider">OUR SPONSORS</h1>
        
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-white font-ocr leading-relaxed">
            Lorem Ipsum Usus possint qua mos copia mos et abundans ferina universis Lorem Ipsum Usus possint qua mos copia mos et abundans ferina universis.
          </p>
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="border-t border-cyan-400 mx-4 mb-12"></div>
      
      {/* Tier 1 Sponsors */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-center text-3xl font-ethnocentric text-yellow-400 mb-6">TIER 1 SPONSORS</h2>
        <div className="bg-black rounded-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.tier1.map((sponsor) => (
              <div key={sponsor.id} className="bg-white p-2 aspect-square flex items-center justify-center rounded">
                <div className="text-center text-black text-xs">
                  <div className="font-bold">{sponsor.name.split(' ')[0]}</div>
                  <div>{sponsor.name.split(' ')[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tier 2 Sponsors */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-center text-3xl font-ethnocentric text-gray-300 mb-6">TIER 2 SPONSORS</h2>
        <div className="bg-black rounded-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.tier2.map((sponsor) => (
              <div key={sponsor.id} className="bg-white p-2 aspect-square flex items-center justify-center rounded">
                <div className="text-center text-black text-xs">
                  <div className="font-bold">{sponsor.name.split(' ')[0]}</div>
                  <div>{sponsor.name.split(' ')[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tier 3 Sponsors */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-center text-3xl font-ethnocentric text-orange-500 mb-6">TIER 3 SPONSORS</h2>
        <div className="bg-black rounded-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.tier3.map((sponsor) => (
              <div key={sponsor.id} className="bg-white p-2 aspect-square flex items-center justify-center rounded">
                <div className="text-center text-black text-xs">
                  <div className="font-bold">{sponsor.name.split(' ')[0]}</div>
                  <div>{sponsor.name.split(' ')[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sign Up Section */}
      <SignupSection />
    </div>
  );
} 