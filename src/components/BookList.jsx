// import SearchBar from "./SearchBar"
// import { useState } from 'react'
// import fetchBooks from '../services/api/fetchBooks'

// const BookList = () => {

//     const [books, setBooks] = useState([]); // state to store books thar are fetched from the API
//     const [loading, setLoading] = useState(false) // state to store loading state of the fetch request
//     const [query, setQuery] = useState(""); // store search query

//     const handleSearch = async (query) => {
//         setQuery(query); // update query when search is made
//         setLoading(true); // show loading spinner
//         const data = await fetchBooks({ query }); // fetch books based on query
//         setBooks(data.items); // update books state with search results
//         setLoading(false); // hide loading spinner
//     };



//   return (
//     <div>
//         <SearchBar onSearch = {handleSearch} />   {/* pass the handleSearch function as a prop to the SearchBar component */}
//         {loading ? <p>Loading..</p> : null} {/* show a loading message when the fetch request is in progress */}
//         {/* display  the books in a list*/}
//         <div >
//             {books && books.map((book) => (
//                 <div key={book.id}>
//                     <h2>{book.volumeInfo.title}</h2>
//                     <p>{book.volumeInfo.authors}</p>
//                     <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
//                 </div>
//             ))}
            
//         </div>
//     </div>
   
//   )
// }

// export default BookList