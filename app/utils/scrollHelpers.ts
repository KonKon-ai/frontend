export const scrollToSection = (sectionId: string, offset: number = 0) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;
  
      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };