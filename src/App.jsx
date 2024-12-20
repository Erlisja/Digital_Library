import DisplayBooks from './pages/DisplayBooks'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import { useState } from 'react'
import fetchBooks  from './services/api/fetchBooks'

import './App.css'

function App() {

  const [searchResults, setSearchResults] = useState([]); // Centralized search results
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [query, setQuery] = useState(''); // Query state for search

  // Handler for searching books
  const handleSearch = async (query) => {
    setQuery(query); // keep track of the query
    if(!query.trim()){  // If the query is empty
      setSearchResults([]); // Clear the search results
      return; 
    }
    setLoading(true);
    const data = await fetchBooks({ query });
    console.log('fetched data:', data);
    setSearchResults(data.items || []);
    setLoading(false);
  };

   // Handle clearing the search and showing the carousels
   const handleHomeClick = () => {
    setSearchResults([]); // Clear search results
    setQuery(''); // Reset query
  };



  return (
    <>
      <div className="app">
        <SideNav onSearch={handleSearch} onHomeClick={handleHomeClick}/>
        
          <DisplayBooks  searchResults={searchResults} loading={loading}/> 
          
       
        {/* <Footer /> */}
      </div>
      
    </>
  )
}

export default App