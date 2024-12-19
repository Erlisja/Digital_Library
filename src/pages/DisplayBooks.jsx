import React from "react";
import BookCarousel from "../components/BookCarousel";
import fetchBooks from "../services/api/fetchBooks";

const DisplayBooks = () => {
    const query = "Best Sellers";  // query to fetch the best selling books for the top carousel
   const categories = ["Romance","Fiction", "Science", "History", "Fantasy", "Crime"]; // categories to fetch books for the other carousels

  return (
    <>
    <div>
    <BookCarousel key={query} query={query} fetchBooks={fetchBooks} /> {/* Display the BookCarousel component for the top carousel */}
    </div>
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
  );
};

export default DisplayBooks;
