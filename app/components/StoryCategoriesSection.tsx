export default function StoryCategoriesSection() {
  // Sample categories data - updated to match the Figma mockup
  const categories = [
    {
      id: 1,
      title: "Category",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/category-image-placeholder.png"
    },
    {
      id: 2,
      title: "Category",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/category-image-placeholder.png"
    },
    {
      id: 3,
      title: "Category",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/category-image-placeholder.png"
    }
  ];

  return (
    <section className="py-10" aria-labelledby="story-categories-heading">
      <div className="container mx-auto px-4">
        {/* Featured Image */}
        <div className="relative mb-16 mx-auto max-w-5xl">
          <img 
            src="/featured-image-placeholder.png" 
            alt="Featured story preview" 
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
        
        {/* Story Categories Title - Using ETHNOCENTRIC font */}
        <h2 id="story-categories-heading" className="text-center text-3xl font-ethnocentric text-white mb-10">STORY CATEGORIES</h2>
        
        <div className="mx-auto max-w-5xl">
          {/* Description - Using OCR A Extended font and exact text from mockup */}
          <div className="mb-12">
            <p className="font-ocr text-right text-sm md:text-base max-w-xl ml-auto">
              On the edge of the Singularity, every frame becomes a loop of infinite possibilities. 
              These are the stories that define our past, present, and future.
            </p>
          </div>
          
          {/* Categories Grid - Adjusted to match mockup exactly */}
          <div className="space-y-16">
            {/* Category 1 - Left image, right text */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="col-span-1">
                <img 
                  src="/category-image-placeholder.png" 
                  alt="" 
                  className="w-full h-64 object-cover rounded-lg"
                  aria-hidden="true"
                />
              </div>
              <div className="col-span-1">
                <h3 className="font-ocr text-white text-xl mb-2">Category</h3>
                <p className="text-tertiary-gray text-sm font-sans mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-tertiary-gray text-sm font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </article>
            
            {/* Category 2 - Right image, left text */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="col-span-1 order-2 md:order-1">
                <h3 className="font-ocr text-white text-xl mb-2">Category</h3>
                <p className="text-tertiary-gray text-sm font-sans mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-tertiary-gray text-sm font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="col-span-1 order-1 md:order-2">
                <img 
                  src="/category-image-placeholder.png" 
                  alt="" 
                  className="w-full h-64 object-cover rounded-lg"
                  aria-hidden="true"
                />
              </div>
            </article>
            
            {/* Category 3 - Left image, right text */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="col-span-1">
                <img 
                  src="/category-image-placeholder.png" 
                  alt="" 
                  className="w-full h-64 object-cover rounded-lg"
                  aria-hidden="true"
                />
              </div>
              <div className="col-span-1">
                <h3 className="font-ocr text-white text-xl mb-2">Category</h3>
                <p className="text-tertiary-gray text-sm font-sans mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-tertiary-gray text-sm font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
} 