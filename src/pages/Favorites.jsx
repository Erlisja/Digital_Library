import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaBookmark } from "react-icons/fa"; // Import bookmark icon

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("favorites")) || [];   // Retrieve from localStorage
    setFavorites(savedBooks);
  }, []);

  const handleBookmark = () => {
    // Save to localStorage or state
    const savedBooks = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!savedBooks.some((savedBook) => savedBook.id === book.id)) {
      savedBooks.push(book);
      localStorage.setItem("favorites", JSON.stringify(savedBooks));  // Save to localStorage
      setIsBookmarked(true);
    }
  }

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
         <div className="bookmark-button" title={isBookmarked ? "Saved!" : "Save"}>
          <FaBookmark
            onClick={handleBookmark}
            color={isBookmarked ? "gold" : "gray"}
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
