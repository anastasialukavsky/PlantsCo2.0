import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchCart,
  addOneToCart,
  removeOneFromCart,
  removeCartRow,
} from '../slices/users/cartSlice';
import minus from '../../public/assets/minus.svg';
import plus from '../../public/assets/plus.svg';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CartCard = (props) => {
  const dispatch = useDispatch();

  const { product, item } = props;

  function decrementCart(productId) {
    dispatch(removeOneFromCart(productId));
  }

  function incrementCart(productId) {
    dispatch(addOneToCart(productId));
  }
  function removeFromCart(productId) {
    toast.error('Product removed from cart!');
    dispatch(removeCartRow(productId));
  }

  return (
    <>
      <div className="flex h-52 items-center justify-around gap-6 md:mx-4 portrait:xs:gap-3 portrait:xs:px-1">
        <div className="h-36 2xl:w-40">
          <img
            src={`${product.imageURL}`}
            alt={`product photo of ${product.name}`}
            className="h-36 2xl:h-40"
          />
        </div>
        <div className="min-w-48 flex flex-col gap-2 ">
          <Link to={`/products/${product.id}`}>
            <h1 className="cursor-pointer text-[1.5vw] uppercase hover:underline xl:text-[1.4vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:text-center  portrait:xs:text-[3.8vw] portrait:md:text-[2.5vw]">
              {product.name}
            </h1>
          </Link>
          <p className="text-center text-[1.2vw] italic text-gray-600 xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-center portrait:text-[1.8vw] portrait:xs:text-[2.7vw] portrait:md:text-[2vw]">
            {product?.tags.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p className="text-[1.5vw] xl:text-[1.3vw] 2xl:text-[1.1vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:text-center portrait:text-[2.3vw] portrait:xs:text-[3.2vw] portrait:md:text-[2.5vw] ">
            ${product.price}
          </p>
          <div className="flex w-fit  gap-2 rounded-full border border-green-gray px-2 py-1 2xl:py-[3px] 4xl:py-[2px] portrait:self-center">
            <button onClick={() => decrementCart(product.id)}>
              <img
                src={minus}
                alt="minus qty icon"
                className="w-2 xl:w-3 4xl:w-4 portrait:xs:w-5"
              />
            </button>
            <p className="text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.4vw] portrait:xs:text-[3vw] portrait:xs:py-[1px] portrait:md:text-[2vw] portrait:md:px-2">
              {item.qty}
            </p>
            <button onClick={() => incrementCart(product.id)}>
              <img
                src={plus}
                alt="plus qty icon"
                className="w-2 xl:w-3 4xl:w-4 portrait:xs:w-5"
              />
            </button>
          </div>
        </div>
        <div className="ml-8">
          <button
            onClick={() => {
              removeFromCart(product.id);
            }}
            className="block   border border-green-gray/30 py-1 px-2 text-[1.2vw] transition-all duration-300 hover:bg-gray-100 3xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-[2vw] portrait:xs:text-[3.1vw] portrait:md:text-[2.2vw]"
          >
            remove
          </button>
        </div>
      </div>
      <div className="mx-auto w-5/6 border-b-2 border-gray-300"></div>
      {/* <Toaster /> */}
    </>
  );
};

export default CartCard;
