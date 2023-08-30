import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PromoBanner from './UI/PromoBanner.jsx';
import box from '../../public/assets/box.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError,
  fetchAllProducts,
  selectProductLoading,
} from '../slices/product/productSlice.js';
import LikedProduct from './UI/LikedProduct.jsx';
import { addOneToCart } from '../slices/users/cartSlice.js';
import SimilarProducts from './SimilarProducts.jsx';
import toast, { Toaster } from 'react-hot-toast';
import ProductSkeleton from './UI/ProductSkeleton.jsx';
import { setDefaultOptions } from 'date-fns';

const singleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productLoading = useSelector(selectProductLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchAllProducts());
    return () => dispatch(resetStatusError());
  }, [dispatch, productId]);

  const singleProduct = useSelector(selectSingleProduct);
  console.log('DESC', singleProduct.description);

  function addToCart() {
    dispatch(addOneToCart(productId));
  }

  const [fullDescription, setFullDescription] = useState(
    singleProduct.shortDescription
  );

  const handleFullDescription = () => {
    if(fullDescription === singleProduct.shortDescription) {
      setFullDescription(singleProduct.description);

    } else {
      setFullDescription(singleProduct.shortDescription)
    }
  };

  
  useEffect(() => {
    setFullDescription(singleProduct.shortDescription)
  }, [singleProduct.shortDescription]);

  const notify = () => toast.success('Product added to cart!');

  return (
    <>
      {/**
      <PromoBanner />
    */}
      {!productLoading ? (
        <main className="flex font-raleway text-[#212922] md:h-[470px]">
          <section className="mt-8 flex flex-col justify-center md:flex-row md:gap-20">
            <div className="mx-auto md:mx-0">
              <img
                className="h-96 md:h-full"
                src={`${singleProduct.imageURL}`}
                alt="error showing photo"
              />
            </div>
            <div className="mx-8 md:mx-0 md:w-1/3">
              <div className="mb-[5%] flex  flex-col items-end justify-center">
                <header className=" font-meduim-light self-center pr-6 font-outfit text-[2.3vw] uppercase text-green-gray">
                  {singleProduct.name}
                </header>
                <LikedProduct />
              </div>

              <div className="mb-4 flex justify-between border-b-4 pb-2 text-[1vw]">
                <p>
                  {singleProduct?.tags
                    ?.map(({ tagName }) => tagName)
                    .join(', ')}
                </p>
              </div>
              <p className="mb-4 text-[2vw] font-bold text-[#212922]">
                ${singleProduct.price}
              </p>

              {fullDescription && (
                <p
                  className="mb-8 cursor-pointer text-[1vw] leading-tight"
                  onClick={handleFullDescription}
                >
                  {fullDescription}

                  {fullDescription === singleProduct.shortDescription ? (
                    <span className="font-bold"> see more</span>
                  ) : (
                    <span className="font-bold"> see less</span>
                  )}
                </p>
              )}

              <div className="mb-3 border-b-4 pb-4">
                <button
                  onClick={() => {
                    notify();
                    addToCart();
                  }}
                  className="mx-auto block w-full  bg-green-gray py-2 font-marcellus text-[2vw] text-white hover:bg-primary-button-green hover:transition-all"
                >
                  ADD TO CART
                </button>

              </div>
              <div className="flex items-center gap-2">
                <img src={box} alt="shipping box icon" className="w-4" />
                <p className="text-[1vw]">Free shipping in the USA</p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <ProductSkeleton />
      )}
      {/* <div className="hidden md:block"> */}
      <SimilarProducts />
      {/* </div> */}
      <Toaster />
    </>
  );
};

export default singleProduct;
