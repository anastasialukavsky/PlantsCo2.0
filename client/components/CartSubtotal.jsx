import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartSubtotal } from '../slices/users/cartSlice';

const CartSubtotal = () => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="pt-3">
      <h2 className=" portrait:md:text-[2.7vw] text-[1.6vw] 6xl:text-[.7vw] 3xl:text-[1.4vw] 5xl:text-[.8vw] pt-2 text-center portrait:xs:text-[4vw]">SUBTOTAL: {subtotal.toFixed(2)}</h2>
    </div>
  );
};

export default CartSubtotal;
