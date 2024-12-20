import { useRef, useState, useEffect } from "react";

const BookCarousel = ({ category, author,fetchBooks,query }) => {

  const itemsRef = useRef(null);   // Create a ref to store the items in the carousel 
  const [books, setBooks] = useState([]);  // Create a state to store the books

  // Fetch books when the component mounts
  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks({category,author,query});   // Fetch books based on the category, author
      console.log("API Response:", data);  
      const filteredBooks = (data.items || []).filter(book =>book.volumeInfo.imageLinks?.thumbnail); // Filter out books without images
      console.log(filteredBooks);
      setBooks(filteredBooks || []);               // Set the books in the state
    };
    loadBooks();
  }, [category,author,query, fetchBooks]);

//   function scrollToId(itemId) {
//     const map = getMap();
//     const node = map.get(itemId);
//     node.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//       inline: "center",
//     });
//   }

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <div className="carousel-container">
      <h2>{category || query}</h2>
      {/* <nav>
        {books.map((book, index) => (
          <button key={index} onClick={() => scrollToId(index)}>
            {book.volumeInfo.title}
          </button>
        ))}
      </nav> */}
      <div className="carousel">
        <ul>
          {books.map((book, index) => (
            <li
              key={book.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(index, node);
                } else {
                  map.delete(index);
                }
              }}
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />  
              <h4 className="title">{book.volumeInfo.title}</h4>
              <p className="author">{book.volumeInfo.authors?.join(", ")}</p>
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookCarousel;
