interface ParallaxBannerProps {
  imageUrl: string;
  altText: string | null;
}

export default function ParallaxBanner({ imageUrl, altText }: ParallaxBannerProps) {
  return (
    <div
      className="w-full h-56 bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
      role="img"
      aria-label={altText || "Parallax Batman Banner"}
    ></div>
  );
}