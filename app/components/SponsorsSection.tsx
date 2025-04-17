import { motion } from "framer-motion";
import { buildImageUrl } from "~/utils/urlHelpers";

interface Sponsor {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  image: {
    url: string;
    alternativeText: string | null;
  };
  tierIndex: number;
}

interface SponsorsSectionProps {
  tier: string;
  sponsors: Sponsor[];
  strapiUrl: string;
  tierIndex?: number; //For determining animation direction (optional)
}

export default function SponsorsSection({
  tier,
  sponsors,
  strapiUrl,
  tierIndex,
}: SponsorsSectionProps) {
  // Determine the text color based on the tier
  const tierTextColor =
    tier === "Tier 1 Sponsors"
      ? "text-goldKonkon"
      : tier === "Tier 2 Sponsors"
      ? "text-silverKonkon"
      : tier === "Tier 3 Sponsors"
      ? "text-bronzeKonkon"
      : "text-white"; // Default color if no match

  // Alternate slide direction by tierIndex (tierIndex prop is optional)
  const slideDirection = (tierIndex ?? 0) % 2 === 0 ? -100 : 100;

  // Fallback option in case sponsors fail to load
  if (!sponsors || sponsors.length === 0) {
    return (
      <motion.section
        className="pt-9"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="font-ethnocentric medium-heading font-bold text-center mb-8 text-white">
          {tier}
        </h2>
  
        <div className="text-center text-gray-400 italic pb-12">
          Sponsor info coming soon...
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
    id="sponsors-section"
    className="pt-9"
    initial={{ opacity: 0, x: slideDirection }}
    whileInView={{
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        delay: 0.1,
      },
    }}
    viewport={{ once: true }}
  >
    <h2
      className={`font-ethnocentric medium-heading font-bold text-center mb-8 ${tierTextColor}`}
    >
      {tier}
    </h2>

    {/* Rectangle encapsulating all sponsors */}
    <div className="bg-black border-gray-800 border-[2px] rounded-lg shadow-lg m-12 p-6 mx-auto w-9/12 max-w-5xl">
      <div className="flex flex-wrap justify-center items-center gap-12">
        {sponsors.map((sponsor, index) => (
          <motion.a
            key={sponsor.id}
            href={sponsor.href}
            target={sponsor.isExternal ? "_blank" : "_self"}
            rel="noreferrer"
            className="flex items-center justify-center"
            initial={{
              opacity: 0,
              x: -100, // All sponsor sections come in from the left
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
                delay: index * 0.3 + 0.3,
              },
            }}
            viewport={{ once: true }}
          >
            <img
              src={buildImageUrl(strapiUrl, sponsor.image.url)}
              alt={sponsor.image.alternativeText || sponsor.label}
              className="h-20 w-auto transition-all duration-700 ease-in-out hover:scale-110"
            />
          </motion.a>
        ))}
      </div>
    </div>
  </motion.section>

  );
}
