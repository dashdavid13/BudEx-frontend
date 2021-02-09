import React from 'react'

function Search({ search, handleSearchChange}) {
    return(
        <div className="search">   
            <input 
                placeholder='Search' 
                className='js-search' 
                type="text" 
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
            
        </div>
    )
}


export default Search