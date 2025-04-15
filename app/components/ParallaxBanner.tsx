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
  height = "450px",
}: ParallaxBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track the scroll position relative to the banner
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Start when the banner enters the viewport, end when it exits
  });

  // State to store the dynamically calculated height
  const [bannerHeight, setBannerHeight] = useState(height);

  // State to store the dynamically calculated buffer height
  const [bufferHeight, setBufferHeight] = useState("90px");

  // State to store the dynamically calculated batman position range
  const [batmanXRange, setBatmanXRange] = useState(["60%", "45%"]);

  // Dynamically calculate heights based on viewport width
  useEffect(() => {
    const calculateHeights = () => {
      const viewportWidth = window.innerWidth;

      // Calculate banner height
      let calculatedBannerHeight = viewportWidth * 0.25; // Example: 25% of the viewport width
      const minHeight = 250; // Minimum height in pixels
      const maxHeight = 450; // Maximum height in pixels
      calculatedBannerHeight = Math.max(
        minHeight,
        Math.min(calculatedBannerHeight, maxHeight)
      );
      setBannerHeight(`${calculatedBannerHeight}px`);

      // Calculate buffer height as 20% of the banner height
      const calculatedBufferHeight = calculatedBannerHeight * 0.55; // 20% of banner height
      setBufferHeight(`${calculatedBufferHeight}px`);
    };

    // Calculate heights on initial render
    calculateHeights();

    // Recalculate heights on window resize
    window.addEventListener("resize", calculateHeights);
    return () => window.removeEventListener("resize", calculateHeights);
  }, []);

  // Dynamically adjust the batman position range based on viewport width
  useEffect(() => {
    const updateBatmanXRange = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1000) {
        setBatmanXRange(["60%", "30%"]); // For viewports 1000px or wider
      } else {
        setBatmanXRange(["60%", "45%"]); // For smaller viewports
      }
    };

    // Set the initial range
    updateBatmanXRange();

    // Update the range on window resize
    window.addEventListener("resize", updateBatmanXRange);
    return () => window.removeEventListener("resize", updateBatmanXRange);
  }, []);

  const backgroundPositionX = useTransform(
    scrollYProgress,
    [0, 1],
    ["60%", "70%"]
  ); // Pan from left to right
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    ["10%", "60%"]
  );
  const backgroundPosition = useMotionTemplate`${backgroundPositionX} ${backgroundPositionY}`;

  // Horizontal movement for the batman layer
  const batmanPositionX = useTransform(scrollYProgress, [0, 1], batmanXRange); // Dynamically set the range
  const batmanPositionY = useTransform(scrollYProgress, [0, 1], ["10%", "40%"]);
  const batmanPosition = useMotionTemplate`${batmanPositionX} ${batmanPositionY}`;

  // Fade-in and fade-out effect
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [0, 1, 1, 0]); // Fade in at the start, fade out at the end
  const opacityFight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  ); // Fade in at the start, fade out at the end

  // State to store the dynamically calculated background size
  const [backgroundSize, setBackgroundSize] = useState("400%");

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
    <div className="relative w-screen overflow-hidden">
      {/* Top Buffer: Gradient */}
      <div
        className="absolute top-0 left-0 w-full z-10"
        style={{
          height: bufferHeight, // Dynamically calculated height
          background: "linear-gradient(to bottom, #030712, transparent)", // Adjust colors as needed
        }}
      ></div>
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
            opacity: opacity,
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
            opacity: opacityFight,
            backgroundImage: `url(${batmanLayer})`,
          }}
          role="img"
          aria-label={`${altText} – combat layer`}
        />
      </div>
      {/* Bottom Buffer: Gradient */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: bufferHeight, // Dynamically calculated height
          background: "linear-gradient(to top, #030712, transparent)", // Adjust colors as needed
        }}
      ></div>
    </div>
  );
}
