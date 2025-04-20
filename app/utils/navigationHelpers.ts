import { scrollToSection } from "./scrollHelpers";

export const handleNavigationAndGlow = (
  location: Location,
  navigate: (path: string) => void,
  sectionId: string,
  offset: number = 100
) => {
  if (location.pathname !== "/") {
    // If the user is not on the landing page, navigate to it
    navigate("/");

    // Use a timeout to ensure the navigation completes before triggering the glow effect
    setTimeout(() => {
      triggerEmailGlowEffect(sectionId);
    }, 500); // Adjust the delay as needed
  } else {
    // If the user is already on the landing page, scroll to the section
    scrollToSection(sectionId, offset); // Adjust offset to match navbar height
    triggerEmailGlowEffect(sectionId);
  }
};

export const triggerEmailGlowEffect = (sectionId: string) => {
  const emailInput = document.querySelector(`input[name='email']`);
  if (emailInput) {
    emailInput.classList.remove("glow-effect-email");
    emailInput.classList.add("glow-effect");
    setTimeout(() => {
      emailInput.classList.remove("glow-effect");
      emailInput.classList.add("glow-effect-email");
    }, 5000); // Remove the glow effect after 5 seconds
  }
};
