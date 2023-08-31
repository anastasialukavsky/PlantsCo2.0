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

  function addToCart() {
    dispatch(addOneToCart(productId));
  }

  const [fullDescription, setFullDescription] = useState(
    singleProduct.shortDescription
  );

  const handleFullDescription = () => {
    if (fullDescription === singleProduct.shortDescription) {
      setFullDescription(singleProduct.description);
    } else {
      setFullDescription(singleProduct.shortDescription);
    }
  };

  useEffect(() => {
    setFullDescription(singleProduct.shortDescription);
  }, [singleProduct.shortDescription]);

  const notify = () => toast.success('Product added to cart!');

  // strip the extension from the product image filename to be re-used as [.webp|.png]
  const imageBaseURL = singleProduct?.imageURL?.split('.').at(0);

  return (
    <>
      {/**
      <PromoBanner />
    */}
      {!productLoading ? (
        <main className="flex justify-center font-raleway text-[#212922] md:h-[470px] 3xl:mt-[4%] 4xl:mx-auto 4xl:min-h-[690px] 4xl:w-[1700px] 6xl:w-[2200px]">
          <section className="mt-8 flex flex-col justify-center md:flex-row md:gap-20">
            {/**mobile header only */}
            <div className="mx-auto md:mx-0 ">
              <header className=" font-meduim-light flex justify-center pb-4  text-center font-outfit text-[4.9vw] uppercase text-green-gray md:hidden ">
                {singleProduct.name}
              </header>

              <picture className="h-96 md:h-full">
                <source type="image/webp" srcSet={imageBaseURL + '.webp'} />
                <source type="image/png" srcSet={singleProduct?.imageURL} />
                <img
                  className="h-96 md:h-full"
                  src={`${singleProduct.imageURL}`}
                  alt="error showing photo"
                />
              </picture>
            </div>
            {/**desktop header */}
            <div className="mx-8 md:mx-0 md:w-1/3">
              <div className="mb-[5%] hidden flex-col  items-end justify-center md:flex">
                <header className=" font-meduim-light self-center pr-6 font-outfit text-[2.3vw] uppercase text-green-gray 3xl:text-[2vw] 4xl:text-[1.5vw]">
                  {singleProduct.name}
                </header>
                <LikedProduct />
              </div>

              <div className="mb-0 flex justify-between p-2 text-[2.5vw] md:mb-4 md:border-b-4 md:p-0 md:text-[1vw] 3xl:text-[.7vw]">
                <p>
                  {singleProduct?.tags
                    ?.map(({ tagName }) => tagName)
                    .join(', ')}
                </p>
              </div>
              <p className="mb-2 text-[3.7vw] font-bold text-[#212922] md:mb-4 md:text-[2vw] xl:text-[1.6vw] 4xl:text-[1.3vw]">
                ${singleProduct.price}
              </p>

              {fullDescription && (
                <p
                  className="mb-8 min-w-full cursor-pointer text-justify text-[2.8vw] leading-tight md:text-[1vw] 4xl:text-[.7vw]"
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

              <div className="mb-3 md:border-b-4 md:pb-4">
                <button
                  onClick={() => {
                    notify();
                    addToCart();
                  }}
                  className="mx-auto block w-full  bg-green-gray py-2 font-marcellus text-[3.8vw] text-white hover:bg-primary-button-green hover:transition-all md:text-[2vw] 4xl:text-[1.5vw] 5xl:text-[1.2vw]"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={box}
                  alt="shipping box icon"
                  className="w-4 4xl:w-[6]"
                />
                <p className="text-[2.5vw] md:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.7vw]">
                  Free shipping in the USA
                </p>
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
      {/* <Toaster /> */}
    </>
  );
};

export default singleProduct;
