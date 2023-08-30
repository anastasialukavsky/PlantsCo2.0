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

  function emptyCart() {
    dispatch(purgeCart());
  }

  useEffect(() => {
    console.log('cart:', cart);
  }, [cart]);

  if (cart.loading) {
    return (
      <div className="mx-auto w-screen max-w-7xl">
        <div
          className="mx-auto mt-6 h-48 w-full bg-red-300 px-12"
          style={{
            background: '#ccc',
            animation: 'fade 2s ease-in-out infinite alternate',
            backgroundSize: '200% 100%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            background: '#ccc',
            animation: 'fade 2s ease-in-out infinite alternate',
            backgroundSize: '200% 100%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
          className="mx-auto mt-6 h-48 w-full bg-red-300 px-12"
        ></div>
        <div
          style={{
            background: '#ccc',
            animation: 'fade 2s ease-in-out infinite alternate',
            backgroundSize: '200% 100%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
          className="mx-auto mt-6 h-48 w-full bg-red-300 px-12"
        ></div>
      </div>
    );
  }

  // if (!cart || !cart.cart || !cart.cart.length > 0)
  //   return (
  //     <main className="cart-page-wrapper absolute top-0 left-0 h-screen w-screen bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-bottom bg-no-repeat pt-36">
  //       <div className="mx-auto w-[4/5] max-w-[1200px] rounded-2xl border border-primary-deep-green bg-white/80 p-4">
  //         <h1 className="mb-8 text-center text-3xl">Your Cart</h1>
  //       </div>
  //     </main>
  // <div className="mt-44 text-center">
  //   <h1 className="text-3xl">Your cart is empty...</h1>
  //   <h2 className="my-8 text-xl">
  //     Can we recommend something from our shop?
  //   </h2>
  //   <Link to={'/products'} className="">
  //     <div
  //       onClick={() => dispatch(adjustFilter(''))}
  //       className="border-2, inline-block rounded-lg bg-primary-deep-green px-6 py-3 text-white"
  //     >
  //       <p className="">Shop Now</p>
  //     </div>
  //   </Link>
  // </div>
  // );

  return (
    <main className="cart-page-wrapper absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat pt-36">
      <h1 className="mb-4 text-center text-3xl">Your Cart</h1>
      <div className="mx-auto max-h-[70vh] w-[4/5] max-w-[1200px] overflow-y-auto rounded-2xl border border-primary-deep-green bg-white/80 p-4">
        {cart?.expandedCart.length > 0 ? (
          <>
            <div className="h-full overflow-y-auto">
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
            <div className="mx-auto my-3 mb-6 flex w-1/2 flex-col items-center">
              <Link
                className="mx-auto block w-full rounded-2xl bg-primary-deep-green py-2 text-center text-xl text-white duration-500 ease-in hover:bg-primary-button-hover hover:transition-all"
                to="/shipping"
              >
                Proceed To Payment
              </Link>
              <button onClick={emptyCart} className="">
                Empty Cart
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart-wrapper mx-auto flex w-fit flex-col items-start">
            <h2 className="text-2xl">Your cart is empty...</h2>
            <p>Can we recommend something from our shop?</p>
            <Link
              className="mt-8 self-center rounded-xl bg-primary-deep-green py-3 px-4 text-white hover:bg-primary-button-hover"
              to={'/products'}
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
