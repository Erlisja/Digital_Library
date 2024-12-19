// here it's the api service that will be used to make the requests to the API

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;


const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';


const fetchBooks = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${query}&key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching books", error);
    }
}

export default fetchBooks;


