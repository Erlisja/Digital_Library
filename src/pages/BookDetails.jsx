import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import fetchBook from "../services/api/fetchBooks";
import { FaBookmark } from "react-icons/fa"; // Import bookmark icon

const BookDetails = () => {
  const { id } = useParams(); // useParams hook to get the route parameter
  const [book, setBook] = useState(null); // State to store the book details
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadBook = (url, format) => {
    setIsDownloading(true);

    // Triggering the download
    const fileName = `${book.title}.${format}`;  // Set the file name
    fetch(url)
      .then((response) => response.blob())   // Convert the response to a blob object, which is a file-like object of immutable, raw data
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);   // Create a URL for the blob object
        const a = document.createElement("a");  // Create an anchor element to trigger the download 
        a.href = url;  // Set the URL as the href attribute
        a.download = fileName;     // Set the file name as the download attribute
        a.click();                // Trigger the download by clicking the anchor element 
        setIsDownloading(false);   // Set isDownloading to false after the download is complete
      })
      .catch(() => {
        setIsDownloading(false);
        alert("Download failed");
      });
  };
  useEffect(() => {
    // Fetch book details from API
    const fetchBookDetails = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      const data = await response.json();
      setBook(data);
      setLoading(false);
    };

    fetchBookDetails();
  }, [id]);

  // Display loading message while fetching book details
  if (!book) {
    return <p>Loading...</p>;
  }

  const handleBookmark = () => {
    // Save to localStorage or state
    const savedBooks = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!savedBooks.some((savedBook) => savedBook.id === book.id)) {
      savedBooks.push(book);
      localStorage.setItem("favorites", JSON.stringify(savedBooks));
      setIsBookmarked(true);
    }
  };

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
        {/* Bookmark Button */}
        <div
          className="bookmark-button"
          title={isBookmarked ? "Saved!" : "Save"}
        >
          <FaBookmark
            onClick={handleBookmark}
            color={isBookmarked ? "gold" : "gray"}
            size={30}
          />
        </div>
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

              <div>
                {book.accessInfo.pdfUrl && (
                  <button
                    onClick={() => downloadBook(book.accessInfo.pdf.acsTokenLink, "pdf")}
                    disabled={isDownloading}
                  >
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </button>
                )}
                {book.accessInfo.epub && (
                  <button
                    onClick={() => downloadBook(book.accessInfo.epub.acsTokenLink, "epub")}
                    disabled={isDownloading}
                  >
                    {isDownloading ? "Downloading..." : "Download EPUB"}
                  </button>
                )}
              </div>
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
