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
    <button className="block hover:underline" onClick={handleFilterClick}>
      <li>{props.children}</li>
    </button>
  );
};

export default FilterTag;
