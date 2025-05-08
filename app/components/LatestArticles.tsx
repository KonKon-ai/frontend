interface Article {
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
}

interface LatestArticlesProps {
  articles: Article[];
  strapiUrl: string;
}

export default function LatestArticles({
  articles,
  strapiUrl,
}: LatestArticlesProps) {
  return (
    <section className="py-16 max-w-7xl mx-auto">
      <h2 className="medium-heading font-ethnocentric font-bold text-center mb-8">
        Latest Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-whiteKonKon shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`${strapiUrl}${article.featuredImage.url}`}
              alt={article.featuredImage.alternativeText || article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl text-black font-semibold mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <div className="flex items-center">
                <img
                  src={`${strapiUrl}${article.author.image.url}`}
                  alt={
                    article.author.image.alternativeText ||
                    article.author.fullName
                  }
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span className="text-gray-800">{article.author.fullName}</span>
              </div>
              <a
                href={`/news/${article.slug}`}
                className="mt-4 inline-block text-pinkKonkon hover:underline"
              >
                Read More
              </a>
              <div className="mt-2">
                {article.contentTags.map((tag) => (
                  <span
                    key={tag.title}
                    className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
