import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { fetchCart, selectCart, purgeCart } from '../slices/users/cartSlice';
import CartCard from './CartCard.jsx';
import CartSubtotal from './CartSubtotal.jsx';
import { adjustFilter } from '../slices/product/productSlice';

export default function CartView(props) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  if (!cart || !cart.cart || !cart.cart.length > 0)
    return (
      <div className="text-center mt-44">
        <h1 className="text-3xl">Your cart is empty...</h1>
        <h2 className="my-8 text-xl">
          Can we recommend something from our shop?
        </h2>
        <Link to={'/products'} className="">
          <div
            onClick={() => dispatch(adjustFilter(''))}
            className="border-2, px-6 py-3 bg-primary-deep-green text-white rounded-lg inline-block"
          >
            <p className="">Shop Now</p>
          </div>
        </Link>
      </div>
    );

  function emptyCart() {
    dispatch(purgeCart());
  }

  return (
    <>
      <div>
        <h1 className="text-3xl text-center">CART</h1>
      </div>
      <div className="max-h-[60vh] overflow-scroll">
        {cart.expandedCart &&
          cart.expandedCart.map((item) => {
            return (
              <div key={item.product.id}>
                <CartCard product={item.product} item={item} />
              </div>
            );
          })}
      </div>
      <CartSubtotal />
      <div className="flex flex-col items-center gap-14 w-1/2 mx-auto mb-6">
        <Link
          className="ease-in duration-500 text-center hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-2xl mx-auto block text-xl hover:transition-all mt-5"
          to="/shipping"
        >
          Proceed To Payment
        </Link>
        <button onClick={emptyCart} className="">
          Empty Cart
        </button>
      </div>
    </>
  );
}
