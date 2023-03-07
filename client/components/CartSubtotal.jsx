import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartSubtotal } from '../slices/users/cartSlice';

const CartSubtotal = () => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);
  console.log(subtotal.toFixed(2));

  return (
    <div className="h-12">
      <h2 className="text-xl ml-8 my-6">Subtotal: {subtotal.toFixed(2)}</h2>
    </div>
  );
};

export default CartSubtotal;
