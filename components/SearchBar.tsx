// components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Call the onSearch function with the search query
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-2 py-1 border rounded-md"
      />
      <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md">
        Search
      </button>
    </div>
  );
};

export default SearchBar;