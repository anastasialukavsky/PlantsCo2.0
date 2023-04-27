import React from 'react';
import ProductCard from './ProductCard.jsx';
import {
  selectFilteredProducts,
  selectProductPage,
  selectSearchedItems,
  selectUseSearch,
} from '../slices/product/productSlice';
import { useSelector } from 'react-redux';

const AllProductsSection = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const searchedItems = useSelector(selectSearchedItems);
  const productPage = useSelector(selectProductPage);
  const useSearch = useSelector(selectUseSearch);

  const shownProducts = useSearch ? searchedItems : filteredProducts;

  return (
    <main className="mx-6 mb-4 grid max-w-7xl grid-cols-1 justify-items-center gap-x-4 gap-y-8 xs:grid-cols-2 sm:mx-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
      {shownProducts?.slice(productPage, productPage + 8).map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </main>
  );
};

export default AllProductsSection;
