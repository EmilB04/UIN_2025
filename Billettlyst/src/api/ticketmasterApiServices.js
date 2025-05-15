// Importerer API-nøkkelen og URL-en fra env.filen
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const URL = import.meta.env.VITE_TICKETMASTER_BASE_URL;

const mapCategoryName = (name) => {
  const lower = name.toLowerCase();
  if (lower === "teater/show") return "Arts & Theatre";
  return name;
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

// Generisk event-henter basert på kategori
export const fetchEventsByCategory = async (category) => {
  const categoryParam = mapCategoryName(category);
  try {
    const response = await fetch(
      `${URL}/events.json?apikey=${API_KEY}&classificationName=${categoryParam}&countryCode=NO&locale=no-no&size=50`
    );
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error(`Error fetching ${category} events:`, error);
    return [];
  }
};


// Funksjon for å hente alle attraksjoner
export const fetchAttractions = async (categoryName) => {
  try {
    const response = await fetch(
      `${URL}/attractions.json?apikey=${API_KEY}&classificationName=${categoryName}&countryCode=NO&locale=no-no&size=8`
    );
    const data = await response.json();
    return data._embedded?.attractions || [];
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return [];
  }
};


// Funksjon for å hente spillesteder for en hvilken som helst kategori
export const fetchVenues = async (categoryName) => {
  try {
    const response = await fetch(
      `${URL}/events.json?apikey=${API_KEY}&classificationName=${categoryName}&countryCode=NO&locale=no-no&size=8`
    );
    const data = await response.json();
    const venues = data._embedded?.events?.map(event => event._embedded?.venues?.[0]);
    
    // Fjern duplikater basert på venue-id
    const uniqueVenues = new Map();
    venues?.forEach(venue => {
      if (venue && !uniqueVenues.has(venue.id)) {
        uniqueVenues.set(venue.id, venue);
      }
    });

    return Array.from(uniqueVenues.values());
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
};

// Hent attraksjoner, events og venues basert på suggest-endepunktet
export const fetchSuggestions = async (keyword) => {
  const keywordParam = mapCategoryName(keyword);
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

export const fetchFilteredEvents = async ({ kategori, dato, land, by }) => {
  try {
    const baseUrl = `${URL}/events.json`;
    const params = new URLSearchParams({
      apikey: API_KEY,
      size: 15,
    });

    if (kategori) params.append("classificationName", kategori);
    if (land) params.append("countryCode", land);

    // Hvis by er "København", inkluder alle bydeler
    if (by && by.toLowerCase() === "københavn") {
      const neighborhoods = ["København S", "København N", "København K", "København V"];
      neighborhoods.forEach((neighborhood) => {
        params.append("city", neighborhood);  // Legg til hver bydel
      });
    } else if (by) {
      // Hvis det er en annen spesifikk by, filtrer på den
      params.append("city", by);
    }

    if (dato) {
      const startDate = `${dato}T00:00:00Z`;
      const endDate = `${dato}T23:59:59Z`;
      params.append("startDateTime", startDate);
      params.append("endDateTime", endDate);
    }

    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching events with filter: ", error);
    return [];
  }
};

export const fetchSearchEvents = async ({ keyword, kategori }) => {
  try {
    const baseUrl = `${URL}/events.json`;
    const params = new URLSearchParams({
      apikey: API_KEY,
      size: 15,
      keyword: keyword,
    });

    if (kategori) params.append("classificationName", kategori);

    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching events on that search: ", error);
    return [];
  }
};

export const fetchFilteredVenues = async ({ land, by, keyword }) => {
  try {
    const baseUrl = `${URL}/events.json`;
    const params = new URLSearchParams({
      apikey: API_KEY,
      size: 50,
    });

    if (land) params.append("countryCode", land);

    // Hvis by er "København", inkluder alle bydeler
    if (by && by.toLowerCase() === "københavn") {
      const neighborhoods = ["København S", "København N", "København K", "København V"];
      neighborhoods.forEach((neighborhood) => {
        params.append("city", neighborhood);  // Legg til hver bydel
      });
    } else if (by) {
      // Hvis det er en annen spesifikk by, filtrer på den
      params.append("city", by);
    }

    if (keyword) params.append("keyword", keyword);

    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    const venues = data._embedded?.events?.map(event => event._embedded?.venues?.[0])
      .filter(venue => venue?.name);

    const uniqueVenues = new Map();
    venues?.forEach(venue => {
      if (venue && !uniqueVenues.has(venue.id)) {
        uniqueVenues.set(venue.id, venue);
      }
    });

    return Array.from(uniqueVenues.values());
  } catch (error) {
    console.error("Error fetching filtered venues:", error);
    return [];
  }
};

export const fetchFilteredAttractions = async ({ dato, land, by, keyword }) => {
  try {
    const baseUrl = `${URL}/events.json`;
    const params = new URLSearchParams({
      apikey: API_KEY,
      size: 50,
    });

    if (dato) params.append("startDateTime", `${dato}T00:00:00Z`);
    if (land) params.append("countryCode", land);

    // Hvis by er "København", inkluder alle bydeler
    if (by && by.toLowerCase() === "københavn") {
      const neighborhoods = ["København S", "København N", "København K", "København V"];
      neighborhoods.forEach((neighborhood) => {
        params.append("city", neighborhood);  // Legg til hver bydel
      });
    } else if (by) {
      // Hvis det er en annen spesifikk by, filtrer på den
      params.append("city", by);
    }

    if (keyword) params.append("keyword", keyword);

    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    const attractions = data._embedded?.events?.flatMap(event => event._embedded?.attractions || []);
    const uniqueAttractions = new Map();
    attractions?.forEach(attr => {
      if (attr && !uniqueAttractions.has(attr.id)) {
        uniqueAttractions.set(attr.id, attr);
      }
    });

    return Array.from(uniqueAttractions.values());
  } catch (error) {
    console.error("Error fetching filtered attractions:", error);
    return [];
  }
};