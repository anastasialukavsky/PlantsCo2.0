import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCart } from '../../slices/users/cartSlice';
import { selectAuth } from '../../slices/users/authSlice';

export default function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    const timer = setTimeout(() => dispatch(fetchCart()), 100);

    return () => clearTimeout(timer);
  }, [auth]);

  return;
}
