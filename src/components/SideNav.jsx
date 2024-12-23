import React from 'react'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import { useState } from 'react'



function SideNav({onSearch, onHomeClick}) {


  return (

    <nav>  
     <ul> 
        <h4>Digital Library</h4>
        <br/>  
        {''}
        <SearchBar  onSearch={(query)=> onSearch(query)} />
        <li>
          <Link to="/display" onClick={onHomeClick}>Home</Link>
        </li>
        <li>
          <Link to="/downloaded">Downloads</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
      </ul>
    </nav>

    
  )
}

export default SideNav