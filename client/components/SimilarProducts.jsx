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
    <section className="mx-auto  mt-[9%] pb-[5%] min-h-96 w-screen max-w-6xl">
      <h2 className="my-4 ml-4 text-center font-outfit text-[2vw]">
        YOU MIGHT ALSO LIKE
      </h2>
      <div className="flex md:items-center">
        <button
          className=" flex h-full min-w-[52px] max-w-sm items-center justify-center"
          onClick={() => handlePageChange('previous')}
        >
          <img src={leftArrow} alt="left arrow icon" className="w-8" />
        </button>

        <div className=" mx-auto grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4 ">
          {similarProducts && window.innerWidth <= 768
            ? similarProducts
                .slice(similarPage, similarPage + 2)
                .map((product) => {
                  console.log(window.innerWidth);
                  return <ProductCard key={product.id} product={product} />;
                })
            : similarProducts
                .slice(similarPage, similarPage + 4)
                .map((product) => {
                  console.log(window.innerWidth);
                  return <ProductCard key={product.id} product={product} />;
                })}
        </div>
        <button
          className=" flex h-full min-w-[52px] max-w-sm items-center justify-center"
          onClick={() => handlePageChange(['next', similarProducts.length])}
        >
          <img src={rightArrow} alt="right arrow icon" className="w-8" />
        </button>
      </div>
    </section>
  );
};

export default SimilarProducts;
