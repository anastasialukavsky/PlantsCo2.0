import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, selectCart, purgeCart } from '../slices/users/cartSlice';
import CartCard from './CartCard.jsx';
import CartSubtotal from './CartSubtotal.jsx';
import { adjustFilter } from '../slices/product/productSlice';

export default function CartView(props) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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
      <div className="max-h-[75vh] overflow-scroll">
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
      <div className="flex justify-end pr-10">
        <button onClick={emptyCart} className="">
          Empty Cart
        </button>
      </div>
    </>
  );
}
