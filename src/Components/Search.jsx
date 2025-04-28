import React from 'react'

function Search({ search, setSearch, handleSearch }) {
    return (
        <div className="w-full p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md shadow-lg flex items-center justify-center">
            <input
                type="text"
                placeholder="Enter city name"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black"
            />
            <button
                onClick={handleSearch}
                className="ml-4 px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition-all duration-300 ease-in-out"
            >
                Search
            </button>
        </div>
    );
}

export default Search;
