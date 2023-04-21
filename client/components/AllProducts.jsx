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

  console.log('products loading?', productsLoading);

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      dispatch(resetStatusError());
      dispatch(adjustFilter(''));
    };
  }, [dispatch]);

  return !productsLoading ? (
    // return !true ? (
    <div className="flex justify-center">
      <section>
        <FilterSection />
        <Sort />
        <AllProductsSection />
        <ProductPagination />
      </section>
    </div>
  ) : (
    <div className="w-full max-w-7xl mx-auto">
      <FilterSection />
      {/* <Sort /> */}
      <div className="flex flex-wrap justify-center gap-12 ">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e) => (
          <div className="block w-64">
            <div
              style={{
                background: '#ccc',
                animation: 'fade 2s ease-in-out infinite alternate',
                backgroundSize: '200% 100%',
                animation: 'pulse 2s ease-in-out infinite',
              }}
              className="bg-gray-300 w-full h-80 block mb-2 animate-pulse rounded-md mx-auto"
            ></div>
            <div
              className="h-6 w-full mx-auto pr-12"
              style={{
                background: '#ccc',
                animation: 'fade 2s ease-in-out infinite alternate',
                backgroundSize: '200% 100%',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
