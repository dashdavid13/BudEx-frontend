import React from 'react'

function FilterSort({ sortBy, setSortBy }) {
    

    return(
        <div>
            <select
				className="filter"
				name="sort"
				onChange={(e) => setSortBy(e.target.value)}
				value={sortBy}
            >
				<option value="name">Name</option>
				<option value="Due soon">Due soon</option>
			</select>
        </div>
    )
}

export default FilterSort