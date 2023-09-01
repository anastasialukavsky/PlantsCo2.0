import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartSubtotal } from '../slices/users/cartSlice';

const CartSubtotal = () => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="">
      <h2 className="ml-8 text-[1.6vw] 6xl:text-[.9vw] 3xl:text-[1.4vw] 5xl:text-[1.2vw] pt-2 text-center portrait:xs:text-[4vw]">SUBTOTAL: {subtotal.toFixed(2)}</h2>
    </div>
  );
};

export default CartSubtotal;
