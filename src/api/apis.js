const fetchAPI = async (endpoint) => {
   
    try {
      const response = await fetch(`${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
      throw error;
    }
  };
  
  // Funciones específicas para cada API
  export const fetchRandomDogImage = () => fetchAPI('https://dog.ceo/api/breeds/image/random');
  export const fetchNewspapers = () => fetchAPI('https://chroniclingamerica.loc.gov/newspapers.json');
  export const fetchExtraDataNewPaper = (endpoint) => fetchAPI(endpoint)
  export const fetchJournals = () => fetchAPI('journals?query=pharmacy+health');
  export const fetchTickers = () => fetchAPI('tickers/24hr');