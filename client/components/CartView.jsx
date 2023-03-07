import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCart } from '../slices/users/cartSlice';
import CartCard from './CartCard.jsx';
import CartSubtotal from './CartSubtotal.jsx';

export default function CartView(props) {
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (!cart || !cart.cart || !cart.cart.length > 0)
    return <h1>Your cart is empty...</h1>;

  return (
    <>
      <div>
        <h1 className="text-3xl text-center">CART</h1>
      </div>
      <div className="max-h-[75vh] overflow-scroll">
        {/* <ul className="flex flex-col flex-nowrap gap-4 w-1/6"> */}
        {cart.expandedCart &&
          cart.expandedCart.map((item) => {
            return (
              <div key={item.product.id}>
                <CartCard product={item.product} item={item} />
              </div>
            );
          })}
      </div>
      <CartSubtotal />
    </>
  );
}
