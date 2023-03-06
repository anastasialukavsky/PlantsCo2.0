import React from 'react';
import ProductCard from './ProductCard.jsx';
import {
  selectFilteredProducts,
  selectProductPage,
} from '../slices/product/productSlice';
import { useSelector } from 'react-redux';

const AllProductsSection = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const productPage = useSelector(selectProductPage);

  return (
    <main className="grid grid-cols-4 justify-items-center gap-x-8  gap-y-8 mx-12 mb-4">
      {filteredProducts?.slice(productPage, productPage + 8).map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </main>
  );
};

export default AllProductsSection;
