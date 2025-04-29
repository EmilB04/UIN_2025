const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const URL =  import.meta.env.VITE_TICKETMASTER_BASE_URL;

export const getSpecificFestival = async (festivalName, setFestival) => {
    fetch(`${URL}/events.json?apikey=${API_KEY}&keyword=${festivalName}&countryCode=NO&locale=no-no`)
        .then((response) => response.json())
        .then((data) => setFestival(data._embedded?.events?.[0]))
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