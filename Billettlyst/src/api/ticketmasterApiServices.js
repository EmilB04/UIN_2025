// Importerer API-nøkkelen og URL-en fra env.filen
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const URL = import.meta.env.VITE_TICKETMASTER_BASE_URL;

/*
  Maps Norwegian category names to Ticketmaster's classification values
*/
export const mapCategoryToApiValue = (name) => {
  switch (name.toLowerCase()) {
    case "musikk":
      return "Music";
    case "sport":
      return "Sports";
    case "teater/show":
      return "Arts & Theatre";
    default:
      return "";
  }
};

export const getSpecificFestival = async (festivalName, setFestival) => {
  try {
    const attractionResponse = await fetch(`${URL}/attractions?apikey=${API_KEY}&keyword=${festivalName}&locale=no-no&preferredCountry=no`);
    const attractionData = await attractionResponse.json();
    const attraction = attractionData._embedded?.attractions?.[0];

    if (!attraction) {
      console.error(`Attraction not found for: ${festivalName}`);
      return;
    }

    const eventResponse = await fetch(`${URL}/events.json?apikey=${API_KEY}&keyword=${festivalName}&locale=no-no`);
    const eventData = await eventResponse.json();
    const event = eventData._embedded?.events?.[0];

    if (!event) {
      console.error(`Event not found for: ${festivalName}`);
      return;
    }

    // Combining the event and attraction data
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const attractionAndEventData = {
      ...attraction,
      id: event.id,
    };

    setFestival(attractionAndEventData);

  } catch (error) {
    console.error("Error fetching festival data using GetSpecificFestival: ", error);
  }
   
};

export const fetchCityEvents = async (city) => {
  try {
    const response = await fetch(
      `${URL}/events.json?city=${city}&size=10&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const getEventById = async (id) => {
  try {
    const response = await fetch(`${URL}/events/${id}.json?apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
};

export const getFestivalPassesByKeyword = async (keyword) => {
  try {
    const response = await fetch(
      `${URL}/events.json?apikey=${API_KEY}&keyword=${keyword}&countryCode=NO&locale=no-no`
    );
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching festival passes:", error);
    return [];
  }
}

/*
  Unified data fetching function for CategoryPage
  Originally, fetching events, venues, and attractions was split across 3 different functions.
  I used ChatGPT to combine these into one efficient function that still supported filtering by:

  - category (classificationName)
  - date (start/endDateTime)
  - country (countryCode)
  - city (city), with special handling for "København"
  - keyword (for search functionality)

  ChatGPT helped restructure the logic to ensure:
  - Filter combinations are supported via URLSearchParams
  - Deduplication of venues and attractions using Map objects
  - A cleaner and DRY solution overall
  - All functionality from the separate functions stayed the same.
*/
export const fetchCategoryPageData = async ({ kategori, dato, land, by, keyword }) => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      size: 12,
    });

    if (kategori) params.append("classificationName", kategori);
    if (land) params.append("countryCode", land);
    if (keyword) params.append("keyword", keyword);

    /*
      ChatGPT-assisted solution:
      The Ticketmaster API separates parts of Copenhagen into different sub-names like 
      "København S", "København N", "København K", and "København V", so filtering by just 
      "København" returns incomplete results. I asked ChatGPT how to ensure I capture all 
      of Copenhagen when filtering by city. Pompt:
      
      "How can I filter events from Ticketmaster API that are located in all parts of 
      Copenhagen, like København S, N, K, and V, if the API doesn't treat 'København' 
      as a single city?"
      
      Based on that, the solution below was generated:
    */
    if (by && by.toLowerCase() === "københavn") {
      ["København S", "København N", "København K", "København V"].forEach(city =>
        params.append("city", city)
      );
    } else if (by) {
      params.append("city", by);
    }

    if (dato) {
      // Format date for Ticketmaster API: ISO with full day range
      params.append("startDateTime", `${dato}T00:00:00Z`);
      params.append("endDateTime", `${dato}T23:59:59Z`);
    }

    const response = await fetch(`${URL}/events.json?${params.toString()}`);
    const data = await response.json();
    const events = data._embedded?.events || [];

    // Use Maps to store only unique venues and attractions by ID
    const uniqueVenues = new Map();
    const uniqueAttractions = new Map();

    events.forEach(event => {
      const venue = event._embedded?.venues?.[0];
      if (venue && !uniqueVenues.has(venue.id)) {
        uniqueVenues.set(venue.id, venue);
      }

      event._embedded?.attractions?.forEach(attr => {
        if (attr && !uniqueAttractions.has(attr.id)) {
          uniqueAttractions.set(attr.id, attr);
        }
      });
    });

    return {
      events,
      venues: Array.from(uniqueVenues.values()).filter(v => v?.name),
      attractions: Array.from(uniqueAttractions.values()).filter(a => a?.name),
    };
  } catch (error) {
    console.error("Error fetching category page data:", error);
    return {
      events: [],
      venues: [],
      attractions: [],
    };
  }
};

/*
  Fetches search suggestions (events, attractions, venues) based on keyword
*/
export const fetchSuggestions = async (keyword) => {
  const keywordParam = mapCategoryToApiValue(keyword);
  try {
    const response = await fetch(
      `${URL}/suggest.json?apikey=${API_KEY}&keyword=${keywordParam}`
    );
    const data = await response.json();
    return data._embedded || {};
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return {};
  }
};

/*
  Fetch events matching a keyword and optionally a category
*/
export const fetchSearchEvents = async ({ keyword, kategori }) => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      size: 12,
      keyword,
    });

    if (kategori) {
      params.append("classificationName", kategori);
    }

    const response = await fetch(`${URL}/events.json?${params.toString()}`);
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching events on that search:", error);
    return [];
  }
};