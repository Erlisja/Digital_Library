import { useParams } from "react-router";
import { useEffect, useState } from "react";
import fetchBook from "../services/api/fetchBooks";

const BookDetails = () => {
  const { id } = useParams(); // useParams hook to get the route parameter
  const [book, setBook] = useState(null); // State to store the book details
  const [loading, setLoading] = useState(true); // Loading state for fetching

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBook({ query: "", category: "", author: "", id }); // fetch the book details using the id
      console.log("Book Details:", data);
      setBook(data); // Set the book details in the state
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // Display loading message while fetching book details
  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="back-button" style={{ marginLeft: "280px" }}>
        <button className="back-button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
      <div
        className="main-content book-details"
        style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
      >
        <div className="book-cover">
          {book.volumeInfo.imageLinks?.thumbnail ? (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              style={{ width: "150px", height: "auto", borderRadius: "8px" }}
            />
          ) : (
            <p>No image available.</p>
          )}
        </div>
        <div
          className="book-info"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {book.volumeInfo ? (
            <>
              <h2>{book.volumeInfo.title}</h2>
              <p>
                <strong>Authors:</strong>{" "}
                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
              <p>
                <strong>Published Date:</strong>{" "}
                {book.volumeInfo.publishedDate || "N/A"}
              </p>
              {/* Display the book description using dangerouslySetInnerHTML which allows rendering HTML content in React components
               */}
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    book.volumeInfo.description || "Description not available.",
                }}
              />
            </>
          ) : (
            <p>Loading book details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookDetails;
