import { buildImageUrl } from "~/utils/urlHelpers";
import { scrollToSection } from "~/utils/scrollHelpers";

interface FooterProps {
  data: {
    logo: {
      image: {
        url: string;
        alternativeText?: string;
      };
      label: string;
    };
    navItems: {
      id: string | number;
      label: string;
      href?: string;
    }[];
    socialLinks: {
      id: string | number;
      href: string;
      isExternal: boolean;
      image: {
        url: string;
      };
    }[];
  };
  strapiUrl: string;
}

export default function Footer({ data, strapiUrl }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page smoothly
  };
  
  const handleScrollToSponsors = () => {
    scrollToSection("sponsors-section", 100); // Adjust offset to match navbar height
  };

  return (
    <footer className="bg-black text-white py-8 px-16">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-10">
          <button
            onClick={handleScrollToTop}
            className="flex items-center mb-4 md:mb-0"
          >
            <img
              src={buildImageUrl(strapiUrl, data.logo.image.url)}
              alt={data.logo.image.alternativeText || data.logo.label}
              className="h-32 sm:h-16 w-auto"
            />
          </button>
          {/* Navigation Items */}
          <nav className="mb-4 md:mb-0">
            <ul className="font-ocr text-sm flex flex-col items-center sm:place-items-start">
              {data.navItems.map((item) => (
                <li key={item.id}>
                  {item.label === "Sponsors" ? (
                    <button
                      onClick={handleScrollToSponsors}
                      className="hover:text-pinkKonkon"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a href={item.href} className="hover:text-pinkKonkon">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Social Links */}
        <div className="flex items-center space-x-4 sm:self-start pt-2">
          {data.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.isExternal ? "_blank" : "_self"}
              rel="noreferrer"
              className="group"
            >
              <div
                className="h-7 w-7 bg-white group-hover:bg-pinkKonkon transform transition-transform duration-500 group-hover:scale-110"
                style={{
                  maskImage: `url(${buildImageUrl(strapiUrl, link.image.url)})`,
                  WebkitMaskImage: `url(${buildImageUrl(
                    strapiUrl,
                    link.image.url
                  )})`,
                  maskSize: "cover",
                  WebkitMaskSize: "cover",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              ></div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
