import React from "react";
import BookCarousel from "../components/BookCarousel";
import fetchBooks from "../services/api/fetchBooks";
import { useNavigate } from "react-router";

const DisplayBooks = ({ searchResults, loading }) => {
 const navigate = useNavigate(); // useNavigate hook to navigate to different route

 const handleBookClick = (id) => {
    navigate(`/books/${id}`); // navigate to the book details page with the book id as a route parameter
  }


  const query = "Best Sellers"; // query to fetch the best selling books for the top carousel
  const categories = [
    "Romance",
    "Fiction",
    "Science",
    "History",
    "Fantasy",
    "Crime",
  ]; // categories to fetch books for the other carousels

  return (
    <div className="main-content ">
      {loading ? (
        <p>Loading...</p>
      ) : searchResults?.length > 0 ? (
        <div className="grid-container">
          {searchResults.map((book) => (
            <div key={book.id} onClick={()=> handleBookClick(book.id)} className="book-card">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <h3 className="title">{book.volumeInfo.title}</h3>
              <p className="author">{book.volumeInfo.authors?.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
       
            <BookCarousel key={query} query={query} fetchBooks={fetchBooks} /> {/* Display the BookCarousel component for the top carousel */}
    
          {/* Display the BookCarousel component for each category */}
          <div>
            {categories.map((category) => (
              <BookCarousel
              
                key={category}                // key prop is used to uniquely identify each component in the list
                category={category}           // category prop is used to pass the category to the BookCarousel component 
                fetchBooks={fetchBooks}       // fetchBooks prop is used to pass the fetchBooks function to the BookCarousel component 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayBooks;

