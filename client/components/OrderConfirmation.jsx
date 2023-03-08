import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  updateOrderStatus,
  selectCheckout,
} from '../slices/checkout/checkoutSlice';
import { purgeCart } from '../slices/users/cartSlice';

export default function OrderConfirmation() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('orderid');

  useEffect(() => {
    if (status && orderId) {
      dispatch(updateOrderStatus({ orderId, status }));
      if (status === 'complete') {
        window.localStorage.removeItem('cart');
        dispatch(purgeCart());
      }
    }
  }, [orderId, status]);

  return (
    <div className="relative bg-cover bg-center bg-[url('/assets/bg_img/order_conf_page.jpg')] h-[calc(100vh_-_5rem)]">
      <div className="flex justify-center items-center h-full">
        <div className="absolute inset-0"></div>
        <div className="p-14 py-16 bg-primary-deep-green rounded-md bg-opacity-60 relative z-10">
          {status && status === 'complete' ? (
            <div className="">
              <h1 className="text-center font-extrabold text-primary-bright-white text-[2.5rem] tracking-wide pb-7 ">
                Thank you for your purchase!
              </h1>
              <div>
                <p className="text-center text-primary-bright-white text-xl tracking-wide mb-6">
                  Your order confirmation is #{orderId}
                </p>
              </div>
              <p className="text-center text-xl text-primary-bright-white">
                We are starting on your order right away, and you should receive
                your order confirmation email shortly!
              </p>
            </div>
          ) : (
            <p>Checkout canceled</p>
          )}
          <div className="text-center text-primary-bright-white text-xl tracking-wide mt-10">
            <p className="font-light">
              Take me back to{' '}
              <Link to={'/products'} className="font-semibold">
                Plant Shop
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
