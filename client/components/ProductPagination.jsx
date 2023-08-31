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
    <div className="flex max-h-[7%] items-center justify-center gap-4 text-[1.4vw] font-raleway pt-[3%] md:pb-[3%] pb-[5%]">
      <button
        className="block h-full min-w-[52px] max-w-sm"
        onClick={() => handlePageChange('previous')}
      >
        <img src={leftArrow} alt="left arrow icon" className="w-6" />
      </button>
      
    
      <button
        className="block h-full min-w-[52px] max-w-sm"
        onClick={() => handlePageChange(['next', filteredProducts?.length])}
      >
        <img src={rightArrow} alt="right arrow icon" className="w-6" />
      </button>
    </div>
  );
};

export default ProductPagination;
