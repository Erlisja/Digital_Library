// here it's the api service that will be used to make the requests to the API

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;


const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';


const fetchBooks = async ({ query = '', category = '', author = '' }) => {
    try {
        // build the search query based on the search terms provided by the user 
        // this will create a dynamic search query based on the search terms provided
        const searchTerms = [];
        if (query) searchTerms.push(query);
        if (category) searchTerms.push(`subject:${category}`);
        if (author) searchTerms.push(`inauthor:${author}`);

        // encode the search query to make it URL safe
        const encodedQuery = encodeURIComponent(searchTerms.join(' ')); // Space-separated query terms
        const url = `${BASE_URL}?q=${encodedQuery}&maxResults=40&key=${API_KEY}`;

        console.log('url', url);

        // make a fetch request to the Google Books API
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching books", error);
    }
}

export default fetchBooks;


