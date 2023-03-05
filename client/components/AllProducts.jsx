import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchAllProducts,
  resetStatusError,
} from '../slices/product/productSlice';
import FilterSection from './FilterSection.jsx';
import AllProductsSection from './AllProductsSection.jsx';
import ProductPagination from './ProductPagination.jsx';

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => dispatch(resetStatusError());
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <section>
        <FilterSection />
        <AllProductsSection />
        <ProductPagination />
      </section>
    </div>
  );
};

export default AllProducts;
