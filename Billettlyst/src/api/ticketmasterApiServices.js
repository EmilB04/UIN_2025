const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const URL = import.meta.env.VITE_TICKETMASTER_BASE_URL;

export const getSpecificFestival = async (festivalName, setFestival) => {
  fetch(`${URL}/events.json?apikey=${API_KEY}&keyword=${festivalName}&countryCode=NO&locale=no-no`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(`Festival data for ${festivalName}:`, data);
      //console.log(`Alle treff for ${festivalName}:`, data._embedded?.events);
      setFestival(data._embedded?.events?.[0]);
    })
    .catch((error) =>
      console.error("Error fetching festival data:", error)
    );
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

// Funksjon for å hente alle musikk-events
export const fetchMusicEvents = async () => {
  try {
    const response = await fetch(
      `${URL}/events.json?apikey=${API_KEY}&classificationName=Music&countryCode=NO&size=15`
    );
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching music events:", error);
  }
};

// Funksjon for å hente alle sport-events
export const fetchSportsEvents = async () => {
  try {
    const response = await fetch(
      `${URL}/events.json?apikey=${API_KEY}&classificationName=Sports&countryCode=NO&size=15`
    );
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching music events:", error);
  }
};

// Funksjon for å hente teater/show-events
export const fetchTheatreEvents = async () => {
  try {
    const response = await fetch(
      `${URL}/events.json?apikey=${API_KEY}&segmentId=KZFzniwnSyZfZ7v7na&countryCode=NO&size=15`
    );
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching theatre events:", error);
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
    if (by) params.append("city", by);
    if (dato) params.append("startDateTime", `${dato}T00:00:00Z`);

    const url = `${baseUrl}?${params.toString()}`;
    //console.log("Ticketmaster API URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    return data._embedded?.events || [];
  } catch (error) {
    console.error("Feil ved filtrert event-kall:", error);
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
    //console.log("Søk URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    return data._embedded?.events || [];
  } catch (error) {
    console.error("Feil ved søk:", error);
    return [];
  }
};


