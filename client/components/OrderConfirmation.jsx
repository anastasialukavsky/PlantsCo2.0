import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  updateOrderStatus,
  selectCheckout,
} from '../slices/checkout/checkoutSlice';

export default function OrderConfirmation() {
  const dispatch = useDispatch();
  const checkout = useSelector(selectCheckout);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('orderid');

  useEffect(() => {
    if (status && orderId) {
      dispatch(updateOrderStatus({ orderId, status }));
      if (status === 'complete') {
        //dispatch(purgeCart());
      }
    }
  }, [orderId, status]);

  return (
    <div>
      <div className="bg-cover bg-center bg-[url('/assets/bg_img/order_conf_page.jpg')] h-[calc(100vh_-_5rem)]">
        {status && status === 'complete' ? (
          <div className="">
            <h1 className="absolute flex flex-col w-screen pt-48 items-center content-center justify-center font-extrabold text-primary-bright-white text-[3.5rem]  tracking-wide">
              Thank you for your purchase!
            </h1>
            <div>
              <p className="flex flex-col text-center w-screen pt-72  items-center content-center justify-center text-primary-bright-white text-xl  tracking-wide">
                Your order confirmation is #{orderId}
              </p>
            </div>
            <p className=" flex flex-col font-light text-primary-bright-white items-center content-center justify-center">
              We are starting on your order right away, and you should receive
              your order confirmation email shortly!
            </p>
          </div>
        ) : (
          <p>Checkout canceled</p>
        )}
      </div>
    </div>
  );
}
