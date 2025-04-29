import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams, Form } from "@remix-run/react";
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

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
    
    // Get search and filter parameters from URL
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search");
    const tag = url.searchParams.get("tag");
    
    // Fetch articles data with error handling
    let articles = [];
    try {
      // Build API URL with filters
      let apiUrl = `${strapiUrl}/api/news-article?populate=author.image,featuredImage,contentTags`;
      
      // Add search filter if provided
      if (searchTerm) {
        apiUrl += `&filters[$or][0][title][$containsi]=${encodeURIComponent(searchTerm)}`;
        apiUrl += `&filters[$or][1][description][$containsi]=${encodeURIComponent(searchTerm)}`;
      }
      
      // Add tag filter if provided
      if (tag) {
        apiUrl += `&filters[contentTags][title][$eq]=${encodeURIComponent(tag)}`;
      }
      
      const articlesResponse = await fetch(apiUrl);
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
      searchTerm: searchTerm || "",
      selectedTag: tag || "",
    });
  } catch (error) {
    console.error("Error in news loader:", error);
    // Return empty data rather than throwing to ensure the page renders
    return json({
      articles: [],
      signupBanner: null,
      strapiUrl: process.env.STRAPI_URL || "http://127.0.0.1:1337",
      searchTerm: "",
      selectedTag: "",
    });
  }
};

export default function NewsPage() {
  const { articles = [], signupBanner, strapiUrl, searchTerm, selectedTag } = useLoaderData<{
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
    searchTerm: string;
    selectedTag: string;
  }>();
  const [searchParams] = useSearchParams();

  // Extract all unique tags from articles
  const allTags = Array.from(new Set(
    articles.flatMap(article => article.contentTags?.map(tag => tag.title) || [])
  )).sort();

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

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <Form method="get" className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="w-full md:w-1/2">
            <input 
              type="text" 
              name="search" 
              placeholder="Search articles..." 
              className="w-full p-3 bg-transparent border border-aquaKonkon rounded-sm text-white font-ocr focus:outline-none focus:ring-1 focus:ring-pinkKonkon"
              defaultValue={searchTerm}
            />
          </div>
          <div className="w-full md:w-1/4">
            <select 
              name="tag" 
              className="w-full p-3 bg-transparent border border-pinkKonkon rounded-sm text-white font-ocr appearance-none focus:outline-none focus:ring-1 focus:ring-aquaKonkon"
              defaultValue={selectedTag}
            >
              <option value="">All Categories</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 bg-pinkKonkon text-white font-ocr font-bold rounded-sm hover:bg-opacity-80 transition duration-300 uppercase tracking-wider"
          >
            Filter
          </button>
          {(searchTerm || selectedTag) && (
            <a 
              href="/news" 
              className="px-6 py-3 bg-transparent border border-aquaKonkon text-white font-ocr font-bold rounded-sm hover:bg-aquaKonkon hover:bg-opacity-20 transition duration-300 uppercase tracking-wider"
            >
              Clear
            </a>
          )}
        </Form>
      </div>

      {/* Latest Articles Section */}
      {articles.length > 0 ? (
        <LatestArticles articles={articles} strapiUrl={strapiUrl} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-white font-ocr tracking-wide max-w-2xl mx-auto px-4 border-l-4 border-pinkKonkon py-3 inline-block bg-black bg-opacity-60">
            {searchTerm || selectedTag 
              ? `No articles found matching your search criteria. Try a different search or filter.`
              : `No articles available at the moment. Check back soon!`
            }
          </p>
        </div>
      )}

      <BorderLine color="border-pinkKonkon" marginBottom="mb-1" />
      <BorderLine color="border-aquaKonkon" />

      {/* Signup Banner with safe rendering */}
      {renderSignupBanner()}
    </div>
  );
}
