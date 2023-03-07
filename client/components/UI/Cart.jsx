import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCart } from '../../slices/users/cartSlice';
import { selectAuth } from '../../slices/users/authSlice';

export default function Cart(props) {
  const dispatch = useDispatch();

  // dummy cart for testing
  // const localCart = [
  //   {
  //     productId: 2,
  //     qty: 4,
  //   },
  //   {
  //     productId: 6,
  //     qty: 1,
  //   },
  //   {
  //     productId: 12,
  //     qty: 14,
  //   },
  // ];

  // window.localStorage.setItem('cart', JSON.stringify(localCart));
  const cart = useSelector(selectCart);
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, auth]);

  return (
    <div className="cart">
      {/* {cart && cart.length > 0 && <ul>
      {cart.map(cartLine => {
        return (
          <li key={`${cart.userId}${cart.productId}`}></li>
        )
      })}
      </ul>} */}
    </div>
  );
}
