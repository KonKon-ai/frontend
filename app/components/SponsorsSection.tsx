export default function SponsorsSection() {
  // Sponsors data
  const sponsors = {
    tier1: [
      { id: 1, name: "Tech Innovations Co", logo: "/sponsor-placeholder.png" },
      { id: 2, name: "Future Media Group", logo: "/sponsor-placeholder.png" },
      { id: 3, name: "Digital Frontiers", logo: "/sponsor-placeholder.png" },
      { id: 4, name: "AI Solutions Inc", logo: "/sponsor-placeholder.png" }
    ],
    tier2: [
      { id: 5, name: "Creative Technologies", logo: "/sponsor-placeholder.png" },
      { id: 6, name: "Story Labs", logo: "/sponsor-placeholder.png" },
      { id: 7, name: "Narrative AI", logo: "/sponsor-placeholder.png" },
      { id: 8, name: "Visual Dynamics", logo: "/sponsor-placeholder.png" }
    ],
    tier3: [
      { id: 9, name: "Immersive Studios", logo: "/sponsor-placeholder.png" },
      { id: 10, name: "Future Visions", logo: "/sponsor-placeholder.png" },
      { id: 11, name: "Tech Horizons", logo: "/sponsor-placeholder.png" },
      { id: 12, name: "Innovation Partners", logo: "/sponsor-placeholder.png" }
    ]
  };
  
  return (
    <section className="py-10" aria-labelledby="sponsors-heading">
      {/* Divider - Using the teal color from the style guide */}
      <div className="h-px bg-tertiary-turquoise mb-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Hidden header for accessibility */}
        <h2 id="sponsors-heading" className="sr-only">Our Sponsors</h2>
        
        {/* Tier 1 Sponsors - Using the primary yellow color */}
        <div className="mb-12">
          <h3 className="text-center text-2xl font-ethnocentric text-yellow-400 mb-6">TIER 1 SPONSORS</h3>
          <div className="bg-black mx-auto max-w-5xl p-4 rounded-lg">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sponsors.tier1.map((sponsor) => (
                <li key={sponsor.id} className="flex items-center justify-center p-2">
                  <div className="bg-white w-full h-16 rounded flex items-center justify-center">
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      className="max-h-12 max-w-full"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Tier 2 Sponsors - Using white text */}
        <div className="mb-12">
          <h3 className="text-center text-2xl font-ethnocentric text-white mb-6">TIER 2 SPONSORS</h3>
          <div className="bg-black mx-auto max-w-5xl p-4 rounded-lg">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sponsors.tier2.map((sponsor) => (
                <li key={sponsor.id} className="flex items-center justify-center p-2">
                  <div className="bg-white w-full h-16 rounded flex items-center justify-center">
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      className="max-h-12 max-w-full"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Tier 3 Sponsors - Using the orange color */}
        <div className="mb-12">
          <h3 className="text-center text-2xl font-ethnocentric text-orange-500 mb-6">TIER 3 SPONSORS</h3>
          <div className="bg-black mx-auto max-w-5xl p-4 rounded-lg">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sponsors.tier3.map((sponsor) => (
                <li key={sponsor.id} className="flex items-center justify-center p-2">
                  <div className="bg-white w-full h-16 rounded flex items-center justify-center">
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      className="max-h-12 max-w-full"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 