import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllProducts,
  fetchAllProducts,
  resetStatus,
  selectStatus,
} from '../slices/product/productSlice';

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => dispatch(resetStatus());
  }, [dispatch]);

  const allProducts = useSelector(selectAllProducts);

  return (
    <div className="text-yellow-500 text-3xl">
      <h1 className=" text-sm">This is the all products page</h1>
      {allProducts.map((product) => {
        return (
          <section key={product.id} className="flex">
            <h1 className="">{product.name}</h1>
            <img src={product.imageURL} alt="Picture of plant on a counter" />
            <p>${product.price}</p>
          </section>
        );
      })}
    </div>
  );
};

export default AllProducts;
