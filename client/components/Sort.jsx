import React from 'react';
import { useDispatch } from 'react-redux';
import { adjustSort } from '../slices/product/productSlice';

const Sort = () => {
  const dispatch = useDispatch();
  const handleSort = (e) => {
    // console.log(e.target.value);
    dispatch(adjustSort(e.target.value));
  };

  return (
    <div className="mb-4 flex gap-2 text-[4vw] md:text-[1.1vw] 3xl:text-[.9vw] 5xl:text-[.7vw]">
      <label className="ml-12 font-raleway" htmlFor="sort">
        SORT BY
      </label>
      <select name="sort" id="sort" onChange={handleSort}>
        <option value="name">A-Z</option>
        <option value="price">PRICE</option>
        <option value="id">NONE</option>
      </select>
    </div>
  );
};

export default Sort;
