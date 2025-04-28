import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { flattenAttributes, getAboutPageData } from "~/data.server";
import BorderLine from "~/components/BorderLine";
import SignupBanner from "~/components/SignupBanner";
import LatestArticles from "~/components/LatestArticles";
import { buildImageUrl } from "~/utils/urlHelpers";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - News & Articles" },
    {
      name: "description",
      content: "Stay updated with the latest news and articles from Konkon.ai.",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
    
    // Fetch articles data with error handling
    let articles = [];
    try {
      const articlesResponse = await fetch(`${strapiUrl}/api/articles?populate=author.image,featuredImage,contentTags`);
      if (!articlesResponse.ok) {
        console.error("Failed to fetch articles:", articlesResponse.status, articlesResponse.statusText);
      } else {
        const articlesData = await articlesResponse.json();
        articles = articlesData.data ? articlesData.data.map(flattenAttributes) : [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    
    // Get signupBanner from aboutPage data since it's properly configured there
    let signupBanner = null;
    try {
      const aboutPageData = await getAboutPageData();
      if (aboutPageData && aboutPageData.signupBanner) {
        signupBanner = aboutPageData.signupBanner;
      }
    } catch (error) {
      console.error("Error fetching about page data for signupBanner:", error);
    }
    
    return json({
      articles: articles || [],
      signupBanner,
      strapiUrl,
    });
  } catch (error) {
    console.error("Error in news loader:", error);
    // Return empty data rather than throwing to ensure the page renders
    return json({
      articles: [],
      signupBanner: null,
      strapiUrl: process.env.STRAPI_URL || "http://127.0.0.1:1337",
    });
  }
};

export default function NewsPage() {
  const { articles = [], signupBanner, strapiUrl } = useLoaderData<{
    articles: {
      id: number;
      title: string;
      description: string;
      slug: string;
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
        title: string;
      }[];
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
    } | null;
    strapiUrl: string;
  }>();

  // Function to render the SignupBanner component
  const renderSignupBanner = () => {
    if (!signupBanner) return null;
    if (!signupBanner.signupLink || !signupBanner.logoLink) return null;
    if (!signupBanner.logoLink.image || !signupBanner.logoLink.image.url) return null;
    
    return (
      <SignupBanner
        signupLink={signupBanner.signupLink}
        logoLink={{
          href: signupBanner.logoLink.href,
          imageUrl: buildImageUrl(strapiUrl, signupBanner.logoLink.image.url),
          altText: signupBanner.logoLink.image.alternativeText || '',
        }}
      />
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 font-ethnocentric text-white tracking-wider">
          News & Articles
        </h1>
        <p className="text-white font-ocr max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and developments from Konkon.ai
        </p>
      </div>

      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" />

      {/* Latest Articles Section */}
      {articles.length > 0 ? (
        <LatestArticles articles={articles} strapiUrl={strapiUrl} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-white font-ocr">No articles available at the moment. Check back soon!</p>
        </div>
      )}

      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" />

      {/* Signup Banner with safe rendering */}
      {renderSignupBanner()}
    </div>
  );
}
