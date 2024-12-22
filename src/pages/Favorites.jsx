import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaBookmark } from "react-icons/fa"; // Import bookmark icon

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("favorites")) || [];   // Retrieve from localStorage
    setFavorites(savedBooks);
  }, []);

  const handleBookmark = (book) => {
    // Remove the book from favorites
    const updatedFavorites = favorites.filter((favBook) => favBook.id !== book.id);
    setFavorites(updatedFavorites); // Update state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div className="main-content">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite books saved yet.</p>
      ) : (
        <div className="grid-container">
          {favorites.map((book) => (
            <div className="book-card" key={book.id}>
              {/* Bookmark Button */}
              <div className="bookmark-button" title="Remove from Favorites">
                <FaBookmark
                  onClick={() => handleBookmark(book)} // Call handleBookmark with the book
                  color="gold" // Yellow since the book is favorited
                  size={30}
                />
              </div>
              <Link to={`/books/${book.id}`}>    {/*Redirects the user to the book details page */}
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />  
                </Link>
                <h3 className="title" >{book.volumeInfo.title}</h3>
                <p className="author">{book.volumeInfo.authors?.join(", ")}</p> 
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
