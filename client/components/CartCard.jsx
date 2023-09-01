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
      <div className="mx-3 flex h-52 items-center justify-around gap-2 text-green-gray sm:mx-8 sm:gap-6">
        <div className="h-36">
          <img
            src={`${product.imageURL}`}
            alt={`product photo of ${product.name}`}
            className="h-36"
          />
        </div>
        <div className="flex w-48 flex-col gap-3 md:w-56">
          <Link to={`/products/${product.id}`}>
            <h1 className="text-xl uppercase hover:underline">
              {product.name}
            </h1>
          </Link>
          <p className="text-xs italic text-gray-600">
            {product?.tags.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p>${product.price}</p>
          <div className="flex w-fit gap-2 rounded-full border border-green-gray px-2">
            <button onClick={() => decrementCart(product.id)}>
              <img src={minus} alt="minus qty icon" className="w-5" />
            </button>
            <p>{item.qty}</p>
            <button onClick={() => incrementCart(product.id)}>
              <img src={plus} alt="plus qty icon" className="w-5" />
            </button>
          </div>
        </div>
        <div className="">
          <button
            onClick={() => {
              removeFromCart(product.id);
            }}
            className="block  border border-green-gray/30 py-1 px-2   hover:bg-gray-200"
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
