import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustFilter, selectFilterBy } from '../slices/product/productSlice';
import FilterDropdownMenu from './UI/FilterDropdownMenu.jsx';

const FilterSection = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState('hidden');

  const filters = useSelector(selectFilterBy);

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
        <li>Popular</li>
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleHide}
          className="relative group"
        >
          <button>
            <li className={`relative group`}>
              Filter By{filters.length ? `: ${filters.join(', ')}` : ': All'}{' '}
            </li>
          </button>
        </div>
      </ul>
      <FilterDropdownMenu
        handleHover={handleHover}
        handleHide={handleHide}
        display={display}
      />
    </div>
  );
};

export default FilterSection;
