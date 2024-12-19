import React from 'react'
import { Link } from 'react-router'
import SearchBar from './SearchBar'

function SideNav() {
  return (


    <nav>
      <ul>
        <SearchBar />
        <li>
          <Link to="/">Home</Link>
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