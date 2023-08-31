import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  adjustFilter,
  fetchAllProducts,
  resetStatusError,
} from '../slices/product/productSlice';
import FilterSection from './FilterSection.jsx';
import AllProductsSection from './AllProductsSection.jsx';
import ProductPagination from './ProductPagination.jsx';
import Sort from './Sort.jsx';
import { selectProductLoading } from '../slices/product/productSlice';

const AllProducts = () => {
  const dispatch = useDispatch();

  const productsLoading = useSelector(selectProductLoading);


  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      dispatch(resetStatusError());
      dispatch(adjustFilter(''));
    };
  }, [dispatch]);

  return !productsLoading ? (
    // return !true ? (
    <>
    {/**
    <PromoBanner />
  */}
      <div className="flex justify-center">
        <section>
          <FilterSection />
          <Sort />
          <AllProductsSection />
          <ProductPagination />
        </section>
      </div>
    </>
  ) : (
    <div className="mx-auto w-full max-w-7xl">
      <FilterSection />
      {/* <Sort /> */}
      <main className="all-prods-skeleton mx-6 mb-4 grid max-w-7xl grid-cols-1 justify-items-center gap-x-4 gap-y-8 xs:grid-cols-2 sm:mx-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        {Array(8)
          .fill(1)
          .map((_, idx) => (
            <article
              key={idx}
              className="flex aspect-[3/4] w-full flex-col"
            ></article>
          ))}
      </main>
      {/* <div className="flex flex-wrap justify-center gap-12 ">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, idx) => (
          <div className="block w-64" key={idx}>
            <div
              style={{
                background: '#ccc',
                animation: 'fade 2s ease-in-out infinite alternate',
                backgroundSize: '200% 100%',
                animation: 'pulse 2s ease-in-out infinite',
              }}
              className="mx-auto mb-2 block h-80 w-full animate-pulse rounded-md bg-gray-300"
            ></div>
            <div
              className="mx-auto h-6 w-full pr-12"
              style={{
                background: '#ccc',
                animation: 'fade 2s ease-in-out infinite alternate',
                backgroundSize: '200% 100%',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            ></div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AllProducts;
