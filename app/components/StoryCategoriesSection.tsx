import { buildImageUrl } from '~/utils/urlHelpers';

interface Category {
  id: number;
  heading: string;
  description: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
}

interface StoryCategoriesSectionProps {
  heading: string;
  categories: Category[];
  strapiUrl: string;
}

export default function StoryCategoriesSection({
  heading,
  categories,
  strapiUrl,
}: StoryCategoriesSectionProps) {
  return (
    <section className="py-12 max-w-6xl w-5/6 mx-auto">
      <h2 className="font-ethnocentric medium-heading font-bold text-center py-12 mb-12">{heading}</h2>
      <div className="space-y-12">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } items-center gap-6`}
          >
            <img
              src={buildImageUrl(strapiUrl, category.image.url)}
              alt={category.image.alternativeText || category.heading}
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="font-ocr text-lg sm:text-xl md:text-2xl font-bold underline mb-4">{category.heading}</h3>
              <p className="font-ocr paragraph-text text-gray-600">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}