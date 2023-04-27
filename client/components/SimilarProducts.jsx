import ProductCard from './ProductCard.jsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSimilar,
  selectSimilarPage,
  similarPageChange,
} from '../slices/product/productSlice';
import leftArrow from '../../public/assets/left-arrow.svg';
import rightArrow from '../../public/assets/right-arrow.svg';

const SimilarProducts = () => {
  const dispatch = useDispatch();

  const similarProducts = useSelector(selectSimilar);
  const similarPage = useSelector(selectSimilarPage);

  const handlePageChange = (pageInfo) => {
    dispatch(similarPageChange(pageInfo));
  };

  return (
    <section className="mx-auto mb-12 h-96 w-screen max-w-6xl">
      <h2 className="my-4 ml-4 text-2xl">You might also like</h2>
      <div className="flex md:items-center">
        <button
          className="block h-full min-w-[52px] max-w-sm"
          onClick={() => handlePageChange('previous')}
        >
          <img src={leftArrow} alt="left arrow icon" className="w-12" />
        </button>
        <div className="mx-12 grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4 ">
          {similarProducts
            ?.slice(similarPage, similarPage + 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <button
          className="block h-full min-w-[52px] max-w-sm"
          onClick={() => handlePageChange(['next', similarProducts.length])}
        >
          <img src={rightArrow} alt="right arrow icon" className="w-12" />
        </button>
      </div>
    </section>
  );
};

export default SimilarProducts;
