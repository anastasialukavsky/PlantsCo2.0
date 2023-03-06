import React from 'react';
import { useDispatch } from 'react-redux';
import { adjustSort } from '../slices/product/productSlice';

const Sort = () => {
  const dispatch = useDispatch();
  const handleSort = (e) => {
    console.log(e.target.value);
    dispatch(adjustSort(e.target.value));
  };

  return (
    <div className="mb-4 flex gap-2">
      <label className="ml-12" htmlFor="sort">
        Sort by
      </label>
      <select name="sort" id="sort" onChange={handleSort}>
        <option value="id">None</option>
        <option value="name">A-Z</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
};

export default Sort;
