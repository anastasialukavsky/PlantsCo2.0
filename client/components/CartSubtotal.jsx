import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartSubtotal } from '../slices/users/cartSlice';

const CartSubtotal = () => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="">
      <h2 className="ml-8 text-xl">Subtotal: {subtotal.toFixed(2)}</h2>
    </div>
  );
};

export default CartSubtotal;
