
import React, { useState } from 'react';
import './Search.css';

const SearchBar = ({ onSearch }) => {

    const [query, setQuery] = useState("")
    
    function handleSearch(e){
        e.preventDefault()
        onSearch(query) 
    };

    return (
        <form onSubmit={handleSearch} className="search-bar"style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "20px", // Add space to the right
            paddingLeft: "20px",
            width: "100%",
            boxSizing: "border-box",
          }}>
          
            <input className="searchh-input" style={{ flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                background: 'none',
                fontSize: "14px",
                color: '#fff'
                }}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search here..."
            />    
            <button type="submit" className="searchh-btn">🔍</button>
        </form>
       
    );
};

export default SearchBar;