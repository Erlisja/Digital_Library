// here it's the api service that will be used to make the requests to the API

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// use the localStorage API to cache the data and implement rate-limiting in the fetchBooks function
// the cacheData function will store the data in the local storage
// the getCachedData function will retrieve the data from the local storage
// the canFetchAgain function will check if the last fetch time is less than 3 seconds ago

//=== this is in order to avoid making too many requests to the API in a short  period of time
// the rate limit is preventing me to continue working on the project so i had to take measures to avoid it 🤯😡

// Utility function to cache data
const cacheData = (key, data) => {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: new Date().getTime() }));
};

// Utility function to get cached data
const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const oneMinute = 300 * 1000; // 1 minute expiration time
        if (new Date().getTime() - timestamp < oneMinute) {
            return data; // Return cached data if still valid
        }
    }
    return null;
};


const fetchBooks = async ({ query = '', category = '', author = '', id}) => {
    const cacheKey = `${query}-${category}-${author}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        return cachedData; // Return cached data if exists
    }


    try {
        // build the search query based on the search terms provided by the user 
        // this will create a dynamic search query based on the search terms provided
        const searchTerms = [];
        if (query) searchTerms.push(query);
        if (category) searchTerms.push(`subject:${category}`);
        if (author) searchTerms.push(`inauthor:${author}`);

        // encode the search query to make it URL safe
        const encodedQuery = encodeURIComponent(searchTerms.join(' ')); // Space-separated query terms
        let url = `${BASE_URL}?q=${encodedQuery}&maxResults=50&key=${API_KEY}`;

        console.log('url', url);

        if (id){
             url = `${BASE_URL}/${id}?key=${API_KEY}`;   
        }

        // make a fetch request to the Google Books API
        const response = await fetch(url);
        const data = await response.json();


        if (data.items) {
            cacheData(cacheKey, data); // Cache the response
        }
        return data;

    } catch (error) {
        console.error("Error fetching books", error);
        return null;
    }
}
export default fetchBooks;


