import { useLocation, useNavigate } from "@remix-run/react";
import { handleNavigationAndGlow } from "~/utils/navigationHelpers";

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

export default function SignupBanner({
  signupLink,
  logoLink,
}: SignupBannerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignupClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default link behavior
    handleNavigationAndGlow(location, navigate, "email-section", 100);
  };

  return (
    <section className="pt-16 sm:py-24 bg-black text-white text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a
          href={signupLink.href}
          onClick={handleSignupClick} // Attach the click handler
          className="text-3xl sm:text-5xl font-ethnocentric font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          {signupLink.label}
        </a>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logoLink.imageUrl}
            alt={logoLink.altText || "KonKon.AI Logo"}
            className="hidden sm:flex h-20 sm:h-32 w-auto"
          />
        </button>
      </div>
    </section>
  );
}