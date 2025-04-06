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
}

interface SponsorsSectionProps {
  tier: string;
  sponsors: Sponsor[];
  strapiUrl: string;
}

export default function SponsorsSection({
  tier,
  sponsors,
  strapiUrl,
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

  return (
    <section id="sponsors-section" className="pt-9">
      <h2 className={`font-ethnocentric medium-heading font-bold text-center mb-8 ${tierTextColor}`}>
        {tier}
      </h2>
      {/* Rectangle encapsulating all sponsors */}
      <div className={`bg-black border-gray-800 border-[2px] rounded-lg shadow-lg m-12 p-6 mx-auto w-9/12 max-w-3xl`}>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.href}
              target={sponsor.isExternal ? "_blank" : "_self"}
              rel="noreferrer"
              className="flex items-center justify-center"
            >
              <img
                src={buildImageUrl(strapiUrl, sponsor.image.url)}
                alt={sponsor.image.alternativeText || sponsor.label}
                className="h-16 w-auto"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
