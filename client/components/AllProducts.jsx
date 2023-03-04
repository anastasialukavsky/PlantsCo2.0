import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAllProducts,
  fetchAllProducts,
  resetStatusError,
  selectStatus,
} from '../slices/product/productSlice';

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => dispatch(resetStatusError());
  }, [dispatch]);

  const allProducts = useSelector(selectAllProducts);

  return (
    <div className="flex justify-center">
      <h1 className=" text-sm"></h1>
      <section>
        <div className="my-9">
          <ul className="flex justify-center gap-12 text-2xl">
            <li>All</li>
            <li>Popular</li>
            <li>Filter By</li>
          </ul>
        </div>
        <main className="grid grid-cols-4 justify-items-center gap-x-8  gap-y-8 mx-12">
          {allProducts.map((product) => {
            return (
              <div key={product.id} className="">
                <Link to={`/products/${product.id}`}>
                  <h1 className="">{product.name}</h1>
                  <img
                    src={product.imageURL}
                    alt="Picture of plant on a counter"
                    className="w-full"
                  />
                  <p>${product.price}</p>
                </Link>
                <button className="bg-primary-deep-green mx-auto block w-full text-white rounded-xl py-1">
                  Add To Cart
                </button>
              </div>
            );
          })}
        </main>
      </section>
    </div>
  );
};

export default AllProducts;
