import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import leftArrow from '../../public/assets/left-arrow.svg';
import rightArrow from '../../public/assets/right-arrow.svg';
import {
  selectAllProducts,
  fetchAllProducts,
  resetStatusError,
  selectStatus,
  productPageChange,
  selectProductPage,
} from '../slices/product/productSlice';

const AllProducts = () => {
  const dispatch = useDispatch();

  const [display, setDisplay] = useState('hidden');

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => dispatch(resetStatusError());
  }, [dispatch]);

  const allProducts = useSelector(selectAllProducts);
  const productPage = useSelector(selectProductPage);

  const handleHover = () => {
    setDisplay('absolute');
  };
  const handleHide = () => {
    setDisplay('hidden');
  };

  const handlePageChange = (pageInfo) => {
    dispatch(productPageChange(pageInfo));
  };

  return (
    <div className="flex justify-center">
      <h1 className=" text-sm"></h1>
      <section>
        <div className="my-9">
          <ul className="flex justify-center gap-12 text-2xl">
            <li>All</li>
            <li>Popular</li>
            <div
              onMouseEnter={handleHover}
              onMouseLeave={handleHide}
              className="relative group"
            >
              <li className="relative group">Filter By</li>
            </div>
            <div
              onMouseEnter={handleHover}
              onMouseLeave={handleHide}
              className={`w-1/2 top-36 h-36 bg-white ${display} delay-100 z-10 border-2 overflow-hidden`}
            >
              <div className="text-xs">
                <ul>
                  <li>Pet Friendly</li>
                  <li>Indoor</li>
                  <li>Outdoor</li>
                  <li>Easy Care</li>
                  <li>Low Light</li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
        <main className="grid grid-cols-4 justify-items-center gap-x-8  gap-y-8 mx-12 mb-4">
          {allProducts?.slice(productPage, productPage + 8).map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </main>
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
            onClick={() => handlePageChange(['next', allProducts?.length])}
          >
            <img src={rightArrow} alt="right arrow icon" className="w-12" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
