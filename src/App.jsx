import DisplayBooks from './pages/DisplayBooks'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import { useState } from 'react'
import fetchBooks  from './services/api/fetchBooks'
import { Route, Routes } from 'react-router'
import BookDetails from './pages/BookDetails'
import Favorites from './pages/Favorites'

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
  <SideNav onSearch={handleSearch} onHomeClick={handleHomeClick}/>
 <Routes>

        <Route path='/' element= {<DisplayBooks  searchResults={searchResults} loading={loading}/> } />
        <Route path='/books/:id' element ={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
       
         
        {/* <Footer /> */}
      
</Routes>
    </>
  )
}

export default App