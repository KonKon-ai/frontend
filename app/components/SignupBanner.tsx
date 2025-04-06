import { scrollToSection } from "~/utils/scrollHelpers";

interface SignupBannerProps {
  signupLink: {
    href: string;
    label: string;
  };
  logoLink: {
    href: string;
    imageUrl: string;
    altText: string | null;
  };
}

export default function SignupBanner({ signupLink, logoLink }: SignupBannerProps) {
  const handleSignupClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default link behavior

    // Scroll to the email section
    scrollToSection("email-section", 100); // Adjust offset to match navbar height

    // Trigger the glow effect on the email input
    const emailInput = document.querySelector("input[name='email']");
    if (emailInput) {
      emailInput.classList.add("glow-effect");
      setTimeout(() => {
        emailInput.classList.remove("glow-effect");
      }, 5000); // Remove the glow effect after 5 seconds
    }
  };

  return (
    <section className="pt-16 sm:py-24 bg-black text-white text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <a
          href={signupLink.href}
          onClick={handleSignupClick} // Attach the click handler
          className="text-3xl sm:text-5xl font-ethnocentric font-bold"
        >
          {signupLink.label}
        </a>
        <a href={logoLink.href}>
          <img
            src={logoLink.imageUrl}
            alt={logoLink.altText || "KonKon.AI Logo"}
            className="hidden sm:flex h-20 sm:h-32 w-auto"
          />
        </a>
      </div>
    </section>
  );
}