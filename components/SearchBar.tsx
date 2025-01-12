import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/apps?query=${searchQuery}`);
  };


  // This function could be used to handle key press events if you wish
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress} // Optional: Allows search on enter key press
        className="px-2 py-1 border rounded-md"
      />
      <button type="submit" onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md">
        Search
      </button>
    </div>
  );
};

export default SearchBar;