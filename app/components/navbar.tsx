import { buildImageUrl } from "~/utils/urlHelpers";
import { scrollToSection } from "~/utils/scrollHelpers";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";

export default function Navbar({
  data,
  strapiUrl,
}: {
  data: any;
  strapiUrl: string;
}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleJoinWaitlistClick = () => {
    // Scroll to the email section
    scrollToSection("email-section", 100); // Adjust offset to match navbar height

    // Trigger the glow effect
    const emailInput = document.querySelector("input[name='email']");
    if (emailInput) {
      emailInput.classList.add("glow-effect");
      setTimeout(() => {
        emailInput.classList.remove("glow-effect");
      }, 5000); // Remove the glow effect after 5 seconds
    }
  };

  const handleScrollToSponsors = () => {
    scrollToSection("sponsors-section", 100); // Adjust offset to match navbar height
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 py-4 px-6 flex items-center justify-between">
      {/* Left Section: Logo + Desktop Nav */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <a href={data.logo.href} className="flex items-center">
          <img
            src={buildImageUrl(strapiUrl, data.logo.image.url)}
            alt={data.logo.image.alternativeText || data.logo.label}
            className="h-12 w-auto"
          />
        </a>
        {/* Desktop Navigation Items */}
        <nav className="hidden sm:block">
          <ul className="flex font-ocr items-center space-x-4">
            {data.navItems.map((item: any) => (
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
      {/* Right Section: Desktop Social Links + CTA */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          {data.socialLinks.map((link: any) => (
            <a
              key={link.id}
              href={link.href}
              target={link.isExternal ? "_blank" : "_self"}
              rel="noreferrer"
              className="group"
            >
              <div
                className="h-6 w-6 bg-white group-hover:bg-pinkKonkon"
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
        <button
          onClick={handleJoinWaitlistClick}
          className="px-4 py-1 border-[1px] border-pinkKonkon bg-black font-ocr text-white hover:bg-gray-900 rounded-lg"
        >
          {data.cta.label}
        </button>
      </div>
      {/* Mobile Hamburger Icon */}
      <div className="sm:hidden" onClick={handleToggleMenu}>
        <GrAdd
          className={`text-4xl hover:text-pinkKonkon transform transition-transform duration-300 ${
            isMobileMenuOpen ? "rotate-45" : ""
          }`}
        />
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 top-[64px] bg-black text-white flex flex-col justify-between items-center p-4 z-40 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Middle Section: Nav Items centered vertically */}
          <div
            className="flex-grow flex items-center justify-center w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <nav>
              <ul className="flex flex-col items-center space-y-4 text-2xl font-ocr">
                {data.navItems.map((item: any) => (
                  <li key={item.id}>
                    {item.label === "Sponsors" ? (
                      <button
                        onClick={() => {
                          handleScrollToSponsors();
                          setMobileMenuOpen(false);
                        }}
                        className="hover:text-pinkKonkon"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-pinkKonkon"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Bottom Section: Social Links and CTA */}
          <div
            className="w-full flex flex-col items-center space-y-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              {data.socialLinks.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group"
                >
                  <div
                    className="h-6 w-6 bg-white group-hover:bg-pinkKonkon"
                    style={{
                      maskImage: `url(${buildImageUrl(
                        strapiUrl,
                        link.image.url
                      )})`,
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
            <button
              onClick={() => {
                handleJoinWaitlistClick();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-1 border-[1px] border-pinkKonkon bg-black font-ocr text-white hover:bg-gray-900 rounded-lg"
            >
              {data.cta.label}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
