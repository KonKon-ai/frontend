import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNewsPageData, getTags } from "~/data.server";
import BorderLine from "~/components/BorderLine";
import SignupBanner from "~/components/SignupBanner";
import LatestArticles from "~/components/LatestArticles";
import FilterAndSearch from "~/components/FilterAndSearch";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - News & Articles" },
    {
      name: "description",
      content: "Stay updated with the latest news and articles from Konkon.ai.",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";

  const url = new URL(request.url);

  // Extract query parameters from the request URL
  const tags = url.searchParams.get("tags"); // This will now be a single string (e.g., "narrative,rendering")
  const sort = url.searchParams.get("sort");
  const search = url.searchParams.get("search");

  // Construct query parameters for the API
  const queryParams = new URLSearchParams();
  if (tags) queryParams.append("tags", tags);
  if (sort) queryParams.append("sort", sort);
  if (search) queryParams.append("search", search);

  // Fetch the news data
  const newsData = await getNewsPageData(queryParams);

  // Fetch all tags from the tags collection
  const allTags = await getTags();

  // Extract the signup banner block
  const signupBannerBlock = newsData.blocks?.find(
    (block: any) => block.__component === "blocks.signup-banner"
  );

  return { ...newsData, strapiUrl, signupBannerBlock, allTags };
};

export default function NewsPage() {
  const { heading, description, articles, meta, strapiUrl, signupBannerBlock, allTags } =
    useLoaderData<{
      heading: string;
      description: string;
      articles: {
        id: number;
        title: string;
        description: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        author: {
          fullName: string;
          image: {
            url: string;
            alternativeText: string | null;
          };
        };
        featuredImage: {
          url: string;
          alternativeText: string | null;
        };
        contentTags: {
          id: number;
          title: string;
        }[];
      }[];
      meta: {
        pagination: {
          page: number;
          pageSize: number;
          total: number;
        };
      };
      strapiUrl: string;
      signupBannerBlock: {
        signupLink: {
          href: string;
          label: string;
          isExternal: boolean;
        };
        logoLink: {
          href: string;
          image: {
            url: string;
            alternativeText: string | null;
          };
        };
      } | null;
      allTags: string[];
    }>();

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 font-ethnocentric text-white tracking-wider">
          {heading}
        </h1>
        <p className="text-white font-ocr max-w-2xl mx-auto">{description}</p>
      </div>

      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" />

      {/* Filter and Search Section */}
      <FilterAndSearch allTags={allTags} />

      {/* Latest Articles Section */}
      <LatestArticles articles={articles} strapiUrl={strapiUrl} />

      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" />

      {/* Pagination Info */}
      <div className="text-center py-4">
        <p className="text-white font-ocr">
          Page {meta.pagination.page} of{" "}
          {Math.ceil(meta.pagination.total / meta.pagination.pageSize)}
        </p>
      </div>

      {/* Signup Banner Section */}
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
