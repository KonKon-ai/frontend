import { Form, useSearchParams } from "@remix-run/react";

interface FilterAndSearchProps {
    allTags: { id: number; title: string; description: string }[]; // Updated type for tags
  }
  
  export default function FilterAndSearch({ allTags }: FilterAndSearchProps) {
    const [searchParams] = useSearchParams();
  
    // Get current query parameters
    const searchTerm = searchParams.get("search") || "";
    const selectedTags = searchParams.get("tags")?.split(",") || [];
    const sortOrder = searchParams.get("sort") || "desc";
  
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const search = formData.get("search") as string;
      const sort = formData.get("sort") as string;
      const tags = formData.getAll("tags") as string[];
  
      // Build the query string
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (sort) queryParams.append("sort", sort);
      if (tags.length > 0) queryParams.append("tags", tags.join(",")); // Combine tags into a single string
  
      // Redirect to the new URL
      window.location.href = `/news?${queryParams.toString()}`;
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <Form method="get" className="flex flex-col md:flex-row gap-4 items-center justify-center" onSubmit={handleFormSubmit}>
          {/* Search Bar */}
          <div className="w-full md:w-1/2">
            <input
              type="text"
              name="search"
              placeholder="Search articles..."
              className="w-full p-3 bg-transparent border border-aquaKonkon rounded-sm text-white font-ocr focus:outline-none focus:ring-1 focus:ring-pinkKonkon"
              defaultValue={searchTerm}
            />
          </div>
  
          {/* Tags Filter */}
          <div className="w-full md:w-1/4">
            <fieldset className="border border-pinkKonkon rounded-sm p-3">
              <legend className="text-white font-ocr">Filter by Tags</legend>
              <div className="flex flex-wrap gap-2 mt-2">
                {allTags.map((tag) => (
                  <label key={tag.id} className="flex items-center gap-2 text-white font-ocr">
                    <input
                      type="checkbox"
                      name="tags"
                      value={tag.title}
                      defaultChecked={selectedTags.includes(tag.title)}
                      className="accent-pinkKonkon"
                    />
                    {tag.title}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
  
          {/* Sort Order */}
          <div className="w-full md:w-1/4">
            <select
              name="sort"
              className="w-full p-3 bg-transparent border border-pinkKonkon rounded-sm text-white font-ocr appearance-none focus:outline-none focus:ring-1 focus:ring-aquaKonkon"
              defaultValue={sortOrder}
            >
              <option value="desc">Newest to Oldest</option>
              <option value="asc">Oldest to Newest</option>
            </select>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-pinkKonkon text-white font-ocr font-bold rounded-sm hover:bg-opacity-80 transition duration-300 uppercase tracking-wider"
          >
            Apply
          </button>
  
          {/* Clear Filters Button */}
          {(searchTerm || selectedTags.length > 0 || sortOrder !== "desc") && (
            <a
              href="/news"
              className="px-6 py-3 bg-transparent border border-aquaKonkon text-white font-ocr font-bold rounded-sm hover:bg-aquaKonkon hover:bg-opacity-20 transition duration-300 uppercase tracking-wider"
            >
              Clear
            </a>
          )}
        </Form>
      </div>
    );
  }