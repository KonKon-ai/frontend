import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSponsors } from "~/data.server";
import BorderLine from "~/components/Borderline";
import SponsorsSection from "~/components/SponsorsSection";

export const meta: MetaFunction = () => {
  return [
    { title: "KonKon.AI Film Festival Sponsors" },
    {
      name: "KonKon.AI Sponsors",
      content:
        "A global celebration of AI-powered storytelling, showcasing innovative films, music videos, and trailers created with cutting-edge technology. Where creativity meets the future of cinema.",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const sponsorsData = await getSponsors();
  console.log("Sponsors Data:", sponsorsData);
  const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
  return { ...sponsorsData, sponsors: sponsorsData.sponsors, strapiUrl };
};

export default function sponsorsPage() {
  const { heading, description, sponsors, strapiUrl } = useLoaderData();

  return (
    <div>
      <h1 className="font-ethnocentric text-2xl sm:text-4xl w-5/6 mx-auto font-bold text-center mt-20">
        {heading}
      </h1>
      <p className="font-ocr text-md sm:text-lg text-center text-gray-300 max-w-2xl w-5/6 mx-auto my-20">
        {description}
      </p>
      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" marginBottom="mb-10"/>
      {sponsors.map((tier) => (
        <SponsorsSection
          key={tier.id}
          tier={tier.tier}
          sponsors={tier.sponsor}
          strapiUrl={strapiUrl}
        />
      ))}
    </div>
  );
}
