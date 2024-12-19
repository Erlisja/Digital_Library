import SearchBar from "./SearchBar"
import { useState } from 'react'
import fetchBooks from '../services/api/fetchBooks'

const BookList = () => {

    const [books, setBooks] = useState([]); // state to store books thar are fetched from the API
    const [loading, setLoading] = useState(false) // state to store loading state of the fetch request

    const handleSearch = async (query) =>{
        setLoading(true) // set loading to true when the search is initiated
        const data = await fetchBooks(query) ; // fetch books from the API based on the query provided by the user
       
        console.log(data);
        setBooks(data.items); // set the fetched books to the state
        setLoading(false) // set loading to false when the search is completed (success or error based on the response) 
    }





  return (
    <div>
        <SearchBar onSearch = {handleSearch} />   {/* pass the handleSearch function as a prop to the SearchBar component */}
        {loading ? <p>Loading..</p> : null} {/* show a loading message when the fetch request is in progress */}
        {/* display  the books in a list*/}
        <div >
            {books && books.map((book) => (
                <div key={book.id}>
                    <h2>{book.volumeInfo.title}</h2>
                    <p>{book.volumeInfo.authors}</p>
                    <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                </div>
            ))}
            
        </div>
    </div>
   
  )
}

export default BookList