import React from 'react'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import { useState } from 'react'



function SideNav({onSearch, onHomeClick}) {
  const [searchResults, setSearchResults] = useState([]); // state to store the search results


  return (


    <nav>
      <ul>
        <SearchBar  onSearch={(query)=> onSearch(query)} />
        <li>
          <Link to="/" onClick={onHomeClick}>Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
      </ul>
    </nav>

    
  )
}

export default SideNav