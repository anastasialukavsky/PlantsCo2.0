import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import leftArrow from '../../public/assets/left-arrow.svg';
import rightArrow from '../../public/assets/right-arrow.svg';
import {
  fetchAllProducts,
  resetStatusError,
  productPageChange,
} from '../slices/product/productSlice';
import FilterSection from './FilterSection.jsx';
import AllProductsSection from './AllProductsSection.jsx';

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => dispatch(resetStatusError());
  }, [dispatch]);

  const handlePageChange = (pageInfo) => {
    if (filteredProducts.length < 8) return;
    dispatch(productPageChange(pageInfo));
  };

  return (
    <div className="flex justify-center">
      <section>
        <FilterSection />
        <AllProductsSection />
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
      </section>
    </div>
  );
};

export default AllProducts;
