import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  selectCart,
  addOneToCart,
  removeOneFromCart,
} from '../slices/users/cartSlice';
import ProductCard from './ProductCard.jsx';

export default function CartView(props) {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  function decrementCart(productId) {
    dispatch(removeOneFromCart(productId));
  }

  function incrementCart(productId) {
    dispatch(addOneToCart(productId));
  }

  console.log('cart state:', cart);

  if (!cart || !cart.cart || !cart.cart.length > 0)
    return <h1>Your cart is empty...</h1>;

  return (
    <div className="bg-[url('/assets/bg_img/cart.jpg')] bg-fixed bg-cover bg-[right_top_-40rem] w-screen cart-container pt-10">
      <ul className="flex flex-col flex-nowrap gap-4 w-1/6">
        {cart.expandedCart &&
          cart.expandedCart.map((item) => {
            return (
              <li key={item.product.id}>
                <ProductCard product={item.product} />
                <button onClick={() => incrementCart(item.product.id)}>
                  Add One
                </button>
                <button onClick={() => decrementCart(item.product.id)}>
                  Remove One
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
