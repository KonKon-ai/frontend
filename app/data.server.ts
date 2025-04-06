// data.server.ts

// Define your base URL for Strapi (ensure STRAPI_URL is set in your .env file if needed)
const strapiBaseUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";

/**
 * Recursively flattens Strapi's nested attribute objects.
 * It also checks for any image objects and prepends the Strapi base URL to their URLs.
 */
export function flattenAttributes(data: any): any {
  // Base case: if there's no data, return null
  if (!data) return null;

  // If data is an array, flatten each item in the array
  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened: { [key: string]: any } = {};

  // Process attributes if they exist
  if (data.attributes) {
    for (let key in data.attributes) {
      const value = data.attributes[key];

      // If the attribute is an object with a "data" property, recursively flatten it
      if (typeof value === "object" && value !== null && "data" in value) {
        flattened[key] = flattenAttributes(value.data);
      } else {
        flattened[key] = value;
      }

      // If this key is "image" and it has a relative URL, prepend the base URL
      if (
        key === "image" &&
        flattened[key] &&
        typeof flattened[key] === "object" &&
        flattened[key].url &&
        typeof flattened[key].url === "string" &&
        flattened[key].url.startsWith("/uploads/")
      ) {
        flattened[key].url = strapiBaseUrl + flattened[key].url;
      }
    }
  }

  // Copy over other properties that are not part of "attributes" or "data"
  for (let key in data) {
    if (key !== "attributes" && key !== "data") {
      flattened[key] = data[key];
    }
  }

  // If there's nested data, flatten that as well and merge with current flattened result
  if (data.data) {
    flattened = { ...flattened, ...flattenAttributes(data.data) };
  }

  return flattened;
}

/**
 * Fetches global data from Strapi, flattens it, and returns the result.
 */
export async function getGlobalData() {
  try {
    const response = await fetch(strapiBaseUrl + "/api/global");
    const data = await response.json();
    console.dir(data, { depth: null });
    // Flatten the data returned by Strapi
    const globalData = flattenAttributes(data.data);
    console.dir(globalData, { depth: null });
    return globalData;
  } catch (error) {
    console.error("Error fetching global data", error);
    throw error;
  }
}

/**
 * Fetches homepage data (hero, sponsors, story categories) from Strapi,
 * flattens it, and returns the result.
 */
export async function getLandingPageData() {
  try {
    const response = await fetch(strapiBaseUrl + "/api/landing-page");
    const data = await response.json();

    // Flatten the data returned by Strapi
    const landingPageData = flattenAttributes(data.data);

    return landingPageData;
  } catch (error) {
    console.error("Error fetching landing page data", error);
    throw error;
  }
}

export async function joinWaitlist(data: any) {
  try {
    const response = await fetch(strapiBaseUrl + "/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to join waitlist.");
    }

    const responseData = await response.json();
    const flattenAttributesData = flattenAttributes(responseData.data);
    return flattenAttributesData;
  } catch (error) {
    console.error("Error joining waitlist:", error);
    throw new Error("Oh no! Something went wrong!");
  }
}

export async function getSponsors() { 
  try {
    const response = await fetch(strapiBaseUrl + "/api/sponsors-page");
    const data = await response.json();

    // Flatten the data returned by Strapi
    const sponsorsData = flattenAttributes(data.data);
    console.dir(sponsorsData, { depth: null });

    return sponsorsData;
  } catch (error) {
    console.error("Error fetching sponsors data", error);
    throw error;
  }
}