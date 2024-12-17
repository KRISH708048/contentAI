import { Search } from 'lucide-react'
import React, { useState } from 'react';

const SearchSection = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value); 
  };

  return (
    <div className='flex gap-2 rounded-md p-2 bg-white w-1/2'>
      <Search />
      <input 
        type="text" 
        value={inputValue}
        onChange={handleChange}
        placeholder='Browse Template' 
        className='text-black outline-none w-full rounded-md' 
      />
    </div>
  );
};

export default SearchSection;
