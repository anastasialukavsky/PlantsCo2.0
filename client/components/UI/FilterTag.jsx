import React from 'react';
import { useDispatch } from 'react-redux';
import { adjustFilter } from '../../slices/product/productSlice';

const FilterTag = (props) => {
  const dispatch = useDispatch();

  const handleFilterClick = (e) => {
    // console.log(e.target.innerHTML === 'Medium');
    dispatch(adjustFilter(e.target.innerHTML));
  };

  return (
    <button
      className="block hover:underline underline-offset-2 text-center text-[3.8vw] md:text-[1.3vw] 3xl:text-[1vw] 5xl:text-[.7vw] 6xl:text-[.5vw] lowercase portrait:lg:text-[2.6vw]"
      onClick={handleFilterClick}
    >
      <li>{props.children}</li>
    </button>
  );
};

export default FilterTag;
