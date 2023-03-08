import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  adjustFilter,
  fetchAllProducts,
  resetStatusError,
} from '../slices/product/productSlice';
import FilterSection from './FilterSection.jsx';
import AllProductsSection from './AllProductsSection.jsx';
import ProductPagination from './ProductPagination.jsx';
import Sort from './Sort.jsx';

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      dispatch(resetStatusError());
      dispatch(adjustFilter(''));
    };
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <section>
        <FilterSection />
        <Sort />
        <AllProductsSection />
        <ProductPagination />
      </section>
    </div>
  );
};

export default AllProducts;
