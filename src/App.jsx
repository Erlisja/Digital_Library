import DisplayBooks from "./pages/DisplayBooks";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import { useState } from "react";
import fetchBooks from "./services/api/fetchBooks";
import { Route, Routes, useLocation } from "react-router";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import DownloadedBooks from "./pages/DownloadedBooks";
import WelcomePage from "./pages/WelcomePage";

import "./App.css";


function App() {
  const [searchResults, setSearchResults] = useState([]); // Centralized search results
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [query, setQuery] = useState(""); // Query state for search

  // Handler for searching books
  const handleSearch = async (query) => {
    setQuery(query); // keep track of the query
    if (!query.trim()) {
      // If the query is empty
      setSearchResults([]); // Clear the search results
      return;
    }
    setLoading(true);
    const data = await fetchBooks({ query });
    console.log("fetched data:", data);
    setSearchResults(data.items || []);
    setLoading(false);
  };

  // Handle clearing the search and showing the carousels
  const handleHomeClick = () => {
    setSearchResults([]); // Clear search results
    setQuery(""); // Reset query
  };

  const location = useLocation();

  return (
    <>
      {/* Render Sidebar only if not on the Welcome Page */}
      {location.pathname !== "/" && (
        <SideNav onSearch={handleSearch} onHomeClick={handleHomeClick} />
      )}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/display"
          element={
            <DisplayBooks searchResults={searchResults} loading={loading} />
          }
        />
        <Route path='/downloaded' element = {<DownloadedBooks />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* <Footer /> */}
      </Routes>
    </>
  );
}

export default App;
