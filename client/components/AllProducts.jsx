import React, { useEffect, useState } from 'react';
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

  const [display, setDisplay] = useState('hidden');

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => dispatch(resetStatusError());
  }, [dispatch]);

  const allProducts = useSelector(selectAllProducts);

  const handleHover = () => {
    setDisplay('absolute');
  };
  const handleHide = () => {
    setDisplay('hidden');
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
        <main className="grid grid-cols-4 justify-items-center gap-x-8  gap-y-8 mx-12">
          {allProducts.map((product) => {
            return (
              <div key={product.id} className="relative group">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.imageURL}
                    alt="Picture of plant on a counter"
                    className="w-full relative group"
                  />
                  <p className="text-2xl mb-1">{product.name}</p>
                  <p className="text-sm">${product.price}</p>
                </Link>
                <button className="bg-primary-deep-green w-full text-white absolute bottom-14  py-1 invisible group-hover:visible mx-auto opacity-60 transition duration-100 ease-in-out hover:opacity-100">
                  Add To Cart
                </button>
                {/* <button className="bg-primary-deep-green w-full text-white absolute bottom-14 rounded-xl py-1 invisible group-hover:visible mx-auto opacity-60 transition duration-100 ease-in-out hover:opacity-100">
                  Add To Cart
                </button> */}
              </div>
            );
          })}
        </main>
      </section>
    </div>
  );
};

export default AllProducts;
