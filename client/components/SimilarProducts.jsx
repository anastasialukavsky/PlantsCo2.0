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
    <section className="w-4/5 mx-auto mb-12 h-96">
      <h2 className="text-2xl mb-4">You might also like</h2>
      <div className="flex items-center">
        <button
          className="block h-full max-w-sm min-w-[52px]"
          onClick={() => handlePageChange('previous')}
        >
          <img src={leftArrow} alt="left arrow icon" className="w-12" />
        </button>
        <div className="grid grid-cols-4 justify-items-center gap-x-8 gap-y-8 mx-12">
          {similarProducts
            ?.slice(similarPage, similarPage + 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <button
          className="block h-full max-w-sm min-w-[52px]"
          onClick={() => handlePageChange(['next', similarProducts.length])}
        >
          <img src={rightArrow} alt="right arrow icon" className="w-12" />
        </button>
      </div>
    </section>
  );
};

export default SimilarProducts;
