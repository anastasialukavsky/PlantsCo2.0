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
    <div className="relative bg-[url('/assets/bg_img/order_conf_page.webp')] bg-cover bg-center font-outfit md:h-[calc(100vh_-_4rem)]  lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)] 6xl:h-[calc(100dvh_-_200px)] portrait:h-[calc(100dvh_-_4rem)] portrait:xs:h-[calc(100dvh_-_5rem)]">
      <div className="flex h-full items-center justify-center pb-20 xl:pb-36 5xl:pb-56 ">
        <div className="relative z-10 w-4/6 bg-green-gray bg-opacity-60 p-[3%]  3xl:w-fit portrait:xs:w-full portrait:md:w-4/5 portrait:md:py-8">
          {status && status === 'complete' ? (
            <div className="">
              <h1 className="pb-4 text-center text-[2.3vw] font-bold tracking-wide text-primary-bright-white  3xl:text-[2.1vw] 4xl:text-[1.9vw] portrait:xs:text-[6vw] portrait:md:text-[3vw]">
                THANK YOU FOR YOUR PURCHASE!
              </h1>
              <div>
                <p className="text-center text-[1.5vw] tracking-wide text-primary-bright-white 3xl:text-[1.3vw] 4xl:text-[1.1vw] 5xl:text-[.8vw] portrait:xs:text-[3.8vw] portrait:md:text-[2vw]">
                  Your order confirmation is #{orderId}
                </p>
              </div>
              <p className="text-center text-[1.3vw] text-primary-bright-white 3xl:text-[1vw] 4xl:text-[.9vw] 5xl:text-[.7vw] portrait:xs:text-[3.8vw] portrait:md:text-[1.8vw]">
                We are starting on your order right away, and you should receive
                your order confirmation email shortly!
              </p>
            </div>
          ) : (
            <p className="text-center text-xl text-primary-bright-white">
              Checkout canceled
            </p>
          )}
          <div className="mt-2 portrait:xs:mt-4 text-center text-[1.3vw] tracking-wide text-primary-bright-white 3xl:text-[1vw]  4xl:text-[.9vw] 5xl:text-[.7vw] portrait:md:text-[1.8vw] portrait:xs:text-[3.5vw]">
            <p className="font-light">
              While you are waiting on your order, take a look at our new{' '}
              <Link to={'/products'} className="font-semibold underline">
                new arivals
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
