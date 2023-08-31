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
        setTimeout(() => {
          dispatch(purgeCart());
        }, 1000);
      }
    }
  }, [orderId, status]);

  return (
    <div className="relative h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/order_conf_page.webp')] bg-cover bg-center">
      <div className="flex h-full items-center justify-center">
        <div className="absolute inset-0"></div>
        <div className="relative z-10 rounded-md bg-primary-deep-green bg-opacity-60 p-14 py-16">
          {status && status === 'complete' ? (
            <div className="">
              <h1 className="font-extrabold pb-7 text-center text-[2.5rem] tracking-wide text-primary-bright-white ">
                Thank you for your purchase!
              </h1>
              <div>
                <p className="mb-6 text-center text-xl tracking-wide text-primary-bright-white">
                  Your order confirmation is #{orderId}
                </p>
              </div>
              <p className="text-center text-xl text-primary-bright-white">
                We are starting on your order right away, and you should receive
                your order confirmation email shortly!
              </p>
            </div>
          ) : (
            <p className="text-center text-xl text-primary-bright-white">
              Checkout canceled
            </p>
          )}
          <div className="mt-10 text-center text-xl tracking-wide text-primary-bright-white">
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
