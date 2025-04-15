import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ParallaxBannerProps {
  backgroundLayer: string;
  batmanLayer: string;
  altText?: string;
  height?: string;
}

export default function ParallaxBanner({
  backgroundLayer,
  batmanLayer,
  altText = "Parallax Banner",
  height = " 450px",
}: ParallaxBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track the scroll position relative to the banner
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Start when the banner enters the viewport, end when it exits
  });

  // State to store the dynamically calculated height
  const [bannerHeight, setBannerHeight] = useState(height);

  // Dynamically calculate height based on viewport width
  useEffect(() => {
    const calculateHeight = () => {
      const viewportWidth = window.innerWidth;

      // Calculate height as a fraction of the viewport width
      let calculatedHeight = viewportWidth * 0.25; // Example: 50% of the viewport width

      // Apply min and max height constraints
      const minHeight = 250; // Minimum height in pixels
      const maxHeight = 450; // Maximum height in pixels
      calculatedHeight = Math.max(minHeight, Math.min(calculatedHeight, maxHeight));

      setBannerHeight(`${calculatedHeight}px`);
    };

    // Calculate the height on initial render
    calculateHeight();

    // Recalculate the height on window resize
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  // Parallax effect for layers
  // const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]); // Moves the most
  // const batmanY = useTransform(scrollYProgress, [0, 1], [200, 150]); // Moves less

  const backgroundPositionX = useTransform(scrollYProgress, [0, 1], ["50%", "60%"]); // Pan from left to right
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], ["10%", "60%"]);
  const backgroundPosition = useMotionTemplate`${backgroundPositionX} ${backgroundPositionY}`;

  // Horizontal movement for the batman layer
  const batmanPositionX = useTransform(scrollYProgress, [0, 1], ["60%", "45%"]); // Pan from right to left
  const batmanPositionY = useTransform(scrollYProgress, [0, 1], ["10%", "40%"]);
  const batmanPosition = useMotionTemplate`${batmanPositionX} ${batmanPositionY}`;

  // Fade-in and fade-out effect
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 0, 0]); // Fade in at the start, fade out at the end
  const opacityFight = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9, 1],
    [0, 1, 0, 0]
  ); // Fade in at the start, fade out at the end

  // const clip1 = useTransform(scrollYProgress, [0, 1], [90, 100]);
  // const clip2 = useTransform(scrollYProgress, [0, 1], [5, 0]);

  // const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  // State to store the dynamically calculated background size
  const [backgroundSize, setBackgroundSize] = useState("100%");

  // Dynamically calculate background size based on viewport size
  useEffect(() => {
    const calculateBackgroundSize = () => {
      const viewportWidth = window.innerWidth;

      // Adjust the size based on the viewport dimensions
      let size;
      if (viewportWidth < 350) {
        size = "450%"; // For very small screens
      } else if (viewportWidth >= 350 && viewportWidth < 500) {
        size = "375%"; // For medium screens
      } else if (viewportWidth >= 500 && viewportWidth < 650) {
        size = "275%"; // For medium screens
      } else if (viewportWidth >= 650 && viewportWidth < 800) {
        size = "225%"; // For medium screens
      } else if (viewportWidth >= 800 && viewportWidth < 1000) {
        size = "180%"; // For medium screens
      } else if (viewportWidth >= 1000 && viewportWidth < 1300) {
        size = "140%"; // For medium screens
      } else {
        size = "120%"; // For large screens
      }
      setBackgroundSize(size);
    };

    // Calculate the size on initial render
    calculateBackgroundSize();

    // Recalculate the size on window resize
    window.addEventListener("resize", calculateBackgroundSize);
    return () => window.removeEventListener("resize", calculateBackgroundSize);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-screen overflow-hidden"
      style={{ height: bannerHeight }}
    >
      {/* Bottom Layer: Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          // y: backgroundY,
          backgroundPosition: backgroundPosition, // Pan horizontally
          backgroundSize: backgroundSize,
          // opacity: opacity,
          // clipPath: clipPath,
          backgroundImage: `url(${backgroundLayer})`,
        }}
        role="img"
        aria-label={`${altText} – background`}
      />
      {/* Top Layer: Batman */}
      <motion.div
        className="absolute top-0 left-0 w-[110%] h-full bg-cover bg-center"
        style={{
          // y: batmanY,
          backgroundPosition: batmanPosition, // Pan horizontally
          backgroundSize: backgroundSize,
          // opacity: opacityFight,
          backgroundImage: `url(${batmanLayer})`,
        }}
        role="img"
        aria-label={`${altText} – combat layer`}
      />
    </div>
  );
}
