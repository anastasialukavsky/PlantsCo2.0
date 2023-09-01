import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart } from '../slices/users/cartSlice';
import toast from 'react-hot-toast';
import { selectProductLoading } from '../slices/product/productSlice';

const ProductCard = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const productsLoading = useSelector(selectProductLoading);

  function addToCart() {
    dispatch(addOneToCart(product.id));
    toast.success('Product added to cart!');
  }

  const imageBaseURL = product?.imageURL.split('.').at(0);

  return productsLoading !== 'loading' ? (
    <div key={product.id} className="group font-raleway">
      <div className="relative">
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to={`/products/${product.id}`}
        >
          <picture className="group relative w-full">
            {/* Product images are a few pixels off of given h/w below, but this is good enough for preventing layout shift */}
            <source
              type="image/webp"
              srcSet={imageBaseURL + '.webp'}
              width={1070}
              height={1400}
            />
            <source
              type="image/png"
              srcSet={product.imageURL}
              width={1070}
              height={1400}
            />
            <img
              src={`${product.imageURL}`}
              alt="Picture of plant on a counter"
              width={1070}
              height={1400}
              // className="group relative w-full"
            />
          </picture>
        </Link>
        <button
          onClick={addToCart}
          className="ease bottom-0 mx-auto flex w-full justify-center bg-green-gray py-1  font-medium text-white opacity-80 transition duration-500 hover:opacity-100 group-hover:visible md:invisible md:absolute md:opacity-60"
        >
          ADD TO CART
        </button>
      </div>
      <Link to={`/products/${product.id}`}>
        <p className="pt-1 text-center text-[3.9vw] font-medium-light uppercase md:mb-1 md:text-[2vw] lg:text-[1.5vw] 3xl:text-[1vw] 6xl:text-[.8vw]">
          {product.name}
        </p>
        <p className="text-center text-[3.7vw] md:text-[1.3vw] 3xl:text-[.9vw] 6xl:text-[.7vw]">
          ${product.price}
        </p>
      </Link>
    </div>
  ) : (
    <div className="font-raleway">
      <div
        key={product.id}
        style={{
          background: '#ccc',
          animation: 'fade 2s ease-in-out infinite alternate',
          backgroundSize: '200% 100%',
          animation: 'pulse 2s left infinite',
        }}
        className="mb-2 block h-48 w-36 animate-pulse rounded-md bg-gray-300"
      ></div>
      <div
        className="rounded- h-6 w-full"
        style={{
          background: '#ccc',
          animation: 'fade 2s ease-in-out infinite alternate',
          backgroundSize: '200% 100%',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      ></div>
    </div>
  );
};

export default ProductCard;
