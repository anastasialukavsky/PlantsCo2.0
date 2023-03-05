import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adjustFilter } from '../slices/product/productSlice';

const FilterSection = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState('hidden');

  const handleHover = () => {
    setDisplay('absolute');
  };
  const handleHide = () => {
    setDisplay('hidden');
  };

  const handleFilter = (filter) => {
    dispatch(adjustFilter(filter));
  };

  return (
    <div className="my-9">
      <ul className="flex justify-center gap-12 text-2xl">
        <button onClick={() => handleFilter('')}>
          <li>All</li>
        </button>
        <button onClick={() => handleFilter('Air-purifying')}>
          <li>Easy-care</li>
        </button>
        <li>Popular</li>
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleHide}
          className="relative group"
        >
          <li className="relative group">Filter By</li>
        </div>
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleHide}
          className={`w-1/2 top-36 h-36 bg-white ${display} delay-100 z-10 border-2 overflow-hidden`}
        >
          <div className="text-xs">
            <ul>
              <li>Pet Friendly</li>
              <li>Indoor</li>
              <li>Outdoor</li>
              <li>Easy Care</li>
              <li>Low Light</li>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default FilterSection;
