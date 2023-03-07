import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  selectCart,
  addOneToCart,
  removeOneFromCart,
} from '../slices/users/cartSlice';
import CartCard from './CartCard.jsx';
import ProductCard from './ProductCard.jsx';

export default function CartView(props) {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  console.log('cart state:', cart);

  if (!cart || !cart.cart || !cart.cart.length > 0)
    return <h1>Your cart is empty...</h1>;

  return (
    <div className="">
      {/* <ul className="flex flex-col flex-nowrap gap-4 w-1/6"> */}
      {cart.expandedCart &&
        cart.expandedCart.map((item) => {
          console.log('item', item);
          return (
            <div key={item.product.id}>
              <CartCard product={item.product} item={item} />
            </div>
          );
        })}
    </div>
  );
}
