import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { buildImageUrl } from "~/utils/urlHelpers";
import { useLoaderData } from "@remix-run/react";
import { getAboutPageData } from "~/data.server";
import BorderLine from "~/components/BorderLine";
import SignupBanner from "~/components/SignupBanner";
import { FaXTwitter, FaTwitch, FaInstagram, FaYoutube } from "react-icons/fa6";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - About Us" },
    {
      name: "description",
      content: "Learn more about Konkon.ai and our mission.",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const aboutPageData = await getAboutPageData();
  console.log("About Page Data:", aboutPageData);
  const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
  return {
    ...aboutPageData,
    listItem: aboutPageData.listItem,
    socialLinks: aboutPageData.socialLinks,
    video: aboutPageData.video,
    signupBanner: aboutPageData.signupBanner, // Include signupBanner
    strapiUrl,
  };
};

export default function AboutPage() {
  const {
    heading,
    description,
    listItem,
    socialLinks,
    video,
    signupBanner, // Destructure signupBanner
    strapiUrl,
  } = useLoaderData<{
    heading: string;
    description: string;
    listItem: { id: number; listItem: string }[];
    socialLinks: {
      id: number;
      href: string;
      label: string;
      isExternal: boolean;
      image: { url: string; alternativeText: string };
    }[];
    video: {
      videoUrl: string;
      title: string;
      description: string;
    }[];
    signupBanner: {
      signupLink: {
        href: string;
        label: string;
      };
      logoLink: {
        href: string;
        image: { url: string; alternativeText: string };
      };
    };
    strapiUrl: string;
  }>();

  return (
    <div className="min-h-screen">
      {/* Video Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="border border-gray-700 rounded-lg w-full max-w-3xl mx-auto aspect-video bg-[#20072C]">
          {video.length > 0 && (
            <iframe
              src={video[0].videoUrl.replace("watch?v=", "embed/")} // Convert YouTube URL to embed format
              title={video[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </div>

      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" />

      {/* About Us Content */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-5xl font-bold mb-8 font-ethnocentric text-white tracking-wider">
          {heading}
        </h1>

        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-white font-ocr mb-6 leading-relaxed">
            {description}
          </p>

          <ul className="text-left space-y-4 text-white font-ocr">
            {listItem.map((item) => (
              <li key={item.id} className="flex items-start">
                <span className="text-white mr-2 mt-1">•</span>
                <p>{item.listItem}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          {socialLinks.map((link: any) => (
            <a
              key={link.id}
              href={link.href}
              target={link.isExternal ? "_blank" : "_self"}
              rel="noreferrer"
              className="group"
            >
              <div
                className="h-5 w-5 bg-white group-hover:bg-pinkKonkon"
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
      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" />

      {/* Signup Banner */}
      <SignupBanner
        signupLink={signupBanner.signupLink}
        logoLink={{
          href: signupBanner.logoLink.href,
          imageUrl: buildImageUrl(strapiUrl, signupBanner.logoLink.image.url),
          altText: signupBanner.logoLink.image.alternativeText,
        }}
      />
    </div>
  );
}
