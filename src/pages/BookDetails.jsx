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
    console.log(`Downloading ${format} file...`);

    const fileName = `${book.volumeInfo.title}.${format}`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch the file");
            }
            return response.blob();
        })
        .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            a.click();

            // Save book details in local storage
            const savedBooks = JSON.parse(localStorage.getItem("downloadedBooks")) || [];
            const downloadedBook = {
                image: book.volumeInfo.imageLinks?.thumbnail || "",  // Save the thumbnail image
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
                format: format,
                filePath: url,   // Save the original URL for re-downloading

            };

            // Avoid duplicates
            if (!savedBooks.some((b) => b.title === downloadedBook.title && b.format === downloadedBook.format)) {
                savedBooks.push(downloadedBook);
                localStorage.setItem("downloadedBooks", JSON.stringify(savedBooks));
            }

            setIsDownloading(false);
        })
        .catch((error) => {
            setIsDownloading(false);
            console.error(error.message); // Log the exact error
            alert("Failed to download the book. Please try again.");
        });
};



  // Fetch book details from API
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

  // Bookmark the book to save it as a favorite
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
                    onClick={() =>
                      downloadBook(book.accessInfo.pdf.acsTokenLink, "pdf")
                    }
                    disabled={isDownloading}
                  >
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </button>
                )}
                {book.accessInfo.epub && (
                  <button
                    onClick={() =>
                      downloadBook(book.accessInfo.epub.acsTokenLink, "epub")
                    }
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
