import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adjustFilter,
  selectFilterBy,
  selectUseSearch,
} from '../slices/product/productSlice';
import FilterDropdownMenu from './UI/FilterDropdownMenu.jsx';

const FilterSection = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState('hidden');

  const filters = useSelector(selectFilterBy);
  const useSearch = useSelector(selectUseSearch);


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
    <div className="my-[6%] md:my-[3%] 5xl:mt-[7%] 6xl:mt-[10%]  flex justify-center items-center relative">
      <ul className="flex justify-center gap-12 3xl:text-[.9vw] 5xl:text-[.7vw] text-[4vw] md:text-[1.1vw] font-raleway">
        <button onClick={() => handleFilter('')}>
          <li>ALL</li>
        </button>
        {/* <li>Popular</li> */}
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleHide}
          className="relative group"
        >
          <button>
            <li className={`relative group uppercase`}>
              {useSearch
                ? 'Filter By: Search Term'
                : `Filter By: ${filters.length ? filters.join(', ') : 'All'}`}
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
