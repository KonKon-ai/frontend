import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLandingPageData } from "~/data.server";
import Hero from "~/components/hero";
import SponsorsSection from "~/components/SponsorsSection";
import ParallaxBanner from "~/components/ParallaxBanner";
import StoryCategoriesSection from "~/components/StoryCategoriesSection";
import SignupBanner from "~/components/SignupBanner";
import BorderLine from "~/components/BorderLine";

export const meta: MetaFunction = () => {
  return [
    { title: "KonKon.AI Film Festival" },
    {
      name: "KonKon.AI",
      content:
        "A global celebration of AI-powered storytelling, showcasing innovative films, music videos, and trailers created with cutting-edge technology. Where creativity meets the future of cinema.",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const landingPageData = await getLandingPageData();
  const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
  return { ...landingPageData, strapiUrl };
};

export default function Index() {
  const { blocks, strapiUrl } = useLoaderData<{
    blocks: any[];
    strapiUrl: string;
  }>();

  const heroBlock = blocks.find(
    (block: any) => block.__component === "blocks.hero"
  );
  const sponsorsBlock = blocks.filter(
    (block: any) => block.__component === "blocks.sponsors"
  );
  const parallaxBannerBlock = blocks.find(
    (block: any) => block.__component === "blocks.parallax-banner"
  );
  const storyCategoriesBlock = blocks.find(
    (block: any) => block.__component === "blocks.story-categories"
  );
  const signupBannerBlock = blocks.find(
    (block: any) => block.__component === "blocks.signup-banner"
  );

  if (!heroBlock) {
    console.error("Hero block is missing from the data.");
    return <div>Error: Hero block is missing.</div>;
  }

  return (
    <div>
      <Hero
        titleOne={heroBlock.titleOne}
        titleTwo={heroBlock.titleTwo}
        description={heroBlock.description}
        submit={heroBlock.submit}
      />
      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" borderThickness="border-2"/>
      <BorderLine color="border-aquaKonkon" borderThickness="border-2"/>
      {sponsorsBlock.map((block: any) => (
        <SponsorsSection
          key={block.id}
          tier={block.tier}
          sponsors={block.sponsor}
          strapiUrl={strapiUrl}
        />
      ))}
      {parallaxBannerBlock && (
        <ParallaxBanner
          backgroundLayer={`${strapiUrl}${parallaxBannerBlock.backgroundLayer[0].url}`}
          batmanLayer={`${strapiUrl}${parallaxBannerBlock.batmanLayer[0].url}`}
          altText={"Parallax Banner"}
        />
      )}
      {storyCategoriesBlock && (
        <StoryCategoriesSection
          heading={storyCategoriesBlock.heading}
          categories={storyCategoriesBlock.category}
          strapiUrl={strapiUrl}
        />
      )}
      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" borderThickness="border-2"/>
      <BorderLine color="border-aquaKonkon" borderThickness="border-2"/>
      {signupBannerBlock && (
        <SignupBanner
          signupLink={signupBannerBlock.signupLink}
          logoLink={{
            href: signupBannerBlock.logoLink.href,
            imageUrl: `${strapiUrl}${signupBannerBlock.logoLink.image.url}`,
            altText: signupBannerBlock.logoLink.image.alternativeText,
          }}
        />
      )}
    </div>
  );
}
