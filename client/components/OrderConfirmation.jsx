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
      {status && status === 'complete' ? (
        <div>
          <h1>Thank you for your purchase!</h1>
          <div>
            <p>Your order confirmation is #{orderId}</p>
          </div>
          <p>
            We are starting on your order right away, and you should receive
            your order confirmation email shortly!
          </p>
        </div>
      ) : (
        <p>Checkout canceled</p>
      )}
    </div>
  );
}
