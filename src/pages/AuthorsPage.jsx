

import React, { useState, useEffect } from "react";
import BookCarousel from "../components/BookCarousel";

const AuthorsPage = ({ fetchBooks }) => {
  const [authors, setAuthors] = useState({});
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state to manage loading behavior

  // Generate carousels for all letters (A-Z) or fetch filtered books based on the query
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setIsLoading(true); // Start loading when fetching
        const queryParam = query ? { query } : {}; // Only pass query if it's non-empty
        const allBooks = await fetchBooks(queryParam);
        console.log("Fetched Books:", allBooks);

        const authorsData = {};

        (allBooks.items || []).forEach((book) => {
          const authorNames = book.volumeInfo.authors || [];
          authorNames.forEach((author) => {
            const initial = author[0]?.toUpperCase();
            if (initial) {
              if (!authorsData[initial]) {
                authorsData[initial] = [];
              }
              if (!authorsData[initial].includes(author)) {
                authorsData[initial].push(author);
              }
            }
          });
        });

        // Ensure all letters A-Z have a key, even if no authors exist for a letter
        const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        allLetters.forEach((letter) => {
          if (!authorsData[letter]) {
            authorsData[letter] = [];
          }
        });

        setAuthors(authorsData);
        setIsLoading(false); // End loading once the data is fetched
      } catch (error) {
        console.error("Error fetching authors:", error);
        setIsLoading(false); // End loading even if there's an error
      }
    };

    fetchAuthors();
  }, [query, fetchBooks]); // Only re-fetch when query or fetchBooks changes

  // Filter books by author based on the query
  useEffect(() => {
    const filterBooksByAuthor = async () => {
      if (query) {
        setIsLoading(true); // Start loading when filtering books
        try {
          const allBooks = await fetchBooks({ query });
          console.log("Filtered Books by query:", allBooks);
          setFilteredBooks(
            (allBooks.items || []).filter((book) =>
              book.volumeInfo.authors?.some((author) =>
                author.toLowerCase().includes(query.toLowerCase())
              )
            )
          );
        } catch (error) {
          console.error("Error fetching filtered books:", error);
        }
        setIsLoading(false); // End loading after the filtering is complete
      } else {
        setFilteredBooks([]); // Reset filtered books if query is cleared
      }
    };

    filterBooksByAuthor();
  }, [query, fetchBooks]); // Only re-run if query or fetchBooks changes

  return (
    <div className="main-content">
      <h1>Authors Page</h1>

      {/* Search bar */}
      <div className="filter">
        <input
          type="text"
          placeholder="Search by author name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Show loading message while fetching */}
      {isLoading && <p>Loading...</p>}

      {/* Render filtered books if a query exists */}
      {query && filteredBooks.length > 0 ? (
        <div className="filtered-books">
          <h2>Books by "{query}"</h2>
          <div className="grid">
            {filteredBooks.map((book) => (
              <div key={book.id} className="book">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                />
                <h4>{book.volumeInfo.title}</h4>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
    
        // Render carousels when no search query is active or if query is cleared
        !isLoading && (
          <div>
            {Object.keys(authors)
              .sort()
              .map((letter) =>
                authors[letter].length > 0 ? (
                  <div key={letter}>
                    <h2>Authors Starting with "{letter}"</h2>
                    <BookCarousel
                      key={letter}
                      category={`Authors starting with ${letter}`}
                      author={authors[letter]}
                      fetchBooks={fetchBooks}
                    />
                  </div>
                ) : null
              )}
          </div>
        )
      )}
    </div>
    
  );
  
};

export default AuthorsPage;
