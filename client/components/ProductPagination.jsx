import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  productPageChange,
  selectFilteredProducts,
} from '../slices/product/productSlice';
import leftArrow from '../../public/assets/left-arrow.svg';
import rightArrow from '../../public/assets/right-arrow.svg';

const ProductPagination = () => {
  const dispatch = useDispatch();

  const filteredProducts = useSelector(selectFilteredProducts);

  const handlePageChange = (pageInfo) => {
    if (filteredProducts.length < 8) return;
    dispatch(productPageChange(pageInfo));
  };

  return (
    <div className="flex gap-4 justify-center items-center text-2xl h-16">
      <button
        className="block h-full max-w-sm min-w-[52px]"
        onClick={() => handlePageChange('previous')}
      >
        <img src={leftArrow} alt="left arrow icon" className="w-12" />
      </button>
      <p>prev</p>
      next
      <button
        className="block h-full max-w-sm min-w-[52px]"
        onClick={() => handlePageChange(['next', filteredProducts?.length])}
      >
        <img src={rightArrow} alt="right arrow icon" className="w-12" />
      </button>
    </div>
  );
};

export default ProductPagination;
