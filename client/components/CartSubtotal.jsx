import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartSubtotal } from '../slices/users/cartSlice';

const CartSubtotal = () => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="">
      <h2 className="ml-8 text-xl pt-2 text-center">SUBTOTAL: {subtotal.toFixed(2)}</h2>
    </div>
  );
};

export default CartSubtotal;
