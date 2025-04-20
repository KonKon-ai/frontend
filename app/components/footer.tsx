import { buildImageUrl } from "~/utils/urlHelpers";
import { handleNavigationAndGlow } from "~/utils/navigationHelpers";
import { useNavigate, useLocation } from "@remix-run/react";

interface FooterProps {
  data: {
    logo: {
      image: {
        url: string;
        alternativeText?: string;
      };
      label: string;
    };
    nav_items: {
      id: string | number;
      navItems: {
        label: string;
        href?: string;
      };
    }[];
    social_links: {
      id: string | number;
      socialLink: {
        href: string;
        isExternal: boolean;
        image: {
          url: string;
          alternativeText?: string;
        };
      };
    }[];
  };
  strapiUrl: string;
}

export default function Footer({ data, strapiUrl }: FooterProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (location.pathname === href) {
      // If already on the target page, scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to the target page
      navigate(href);
    }
  };

  return (
    <footer className="bg-black text-white py-8 px-16">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-10">
          <button
            onClick={() => handleNavigation("/")}
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
              {data.nav_items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.navItems.href}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      handleNavigation(item.navItems.href || "/");
                    }}
                    className="relative h-12 overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-700 ease-in-out hover:bg-gray-800 hover:ring-pinkKonkon hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
                  >
                    {item.navItems.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Social Links */}
        <div className="flex items-center space-x-4 sm:self-start pt-2">
          {data.social_links.map((link) => (
            <a
              key={link.id}
              href={link.socialLink.href}
              target={link.socialLink.isExternal ? "_blank" : "_self"}
              rel="noreferrer"
              className="group"
            >
              <div
                className="h-7 w-7 bg-white group-hover:bg-pinkKonkon transform transition-transform duration-500 group-hover:scale-110"
                style={{
                  maskImage: `url(${buildImageUrl(
                    strapiUrl,
                    link.socialLink.image.url
                  )})`,
                  WebkitMaskImage: `url(${buildImageUrl(
                    strapiUrl,
                    link.socialLink.image.url
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
