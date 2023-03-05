import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';

import {
  fetchAllProducts,
  resetStatusError,
  productPageChange,
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
