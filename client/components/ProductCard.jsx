import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart } from '../slices/users/cartSlice';
import toast, { Toaster } from 'react-hot-toast';
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
    <div key={product.id} className="group">
      <div className="relative">
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to={`/products/${product.id}`}
        >
          <picture className="group relative w-full">
            <source type="image/webp" srcSet={imageBaseURL + '.webp'} />
            <source type="image/png" srcSet={product.imageURL} />
            <img
              src={`${product.imageURL}`}
              alt="Picture of plant on a counter"
              // className="group relative w-full"
            />
          </picture>
        </Link>
        <button
          onClick={addToCart}
          className="invisible absolute bottom-0 mx-auto w-full  bg-primary-deep-green py-1 text-white opacity-60 transition duration-100 ease-in-out hover:opacity-100 group-hover:visible"
        >
          Add To Cart
        </button>
      </div>
      <Link to={`/products/${product.id}`}>
        <p className="mb-1 text-2xl">{product.name}</p>
        <p className="text-sm">${product.price}</p>
      </Link>
      <Toaster gutter={15} />
    </div>
  ) : (
    <div>
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
