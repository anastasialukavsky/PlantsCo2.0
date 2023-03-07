import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  selectCart,
  addOneToCart,
  removeOneFromCart,
  removeCartRow,
} from '../slices/users/cartSlice';
import minus from '../../public/assets/minus.svg';
import plus from '../../public/assets/plus.svg';
import { Link } from 'react-router-dom';

const CartCard = (props) => {
  const dispatch = useDispatch();

  const { product, item } = props;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  function decrementCart(productId) {
    dispatch(removeOneFromCart(productId));
  }

  function incrementCart(productId) {
    dispatch(addOneToCart(productId));
  }
  function removeFromCart(productId) {
    dispatch(removeCartRow(productId));
  }

  return (
    <>
      <div className=" mx-8 flex h-52 gap-6 items-center">
        <div className="h-48">
          <img
            src={`${product.imageURL}`}
            alt={`product photo of ${product.name}`}
            className="h-48"
          />
        </div>
        <div className=" flex flex-col gap-3 w-48">
          <Link to={`/products/${product.id}`}>
            <h1 className="text-3xl hover:underline">{product.name}</h1>
          </Link>
          <p className="text-gray-600 text-xs italic">
            {product?.tags.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p>${product.price}</p>
          <div className="flex gap-2">
            <button onClick={() => decrementCart(product.id)}>
              <img src={minus} alt="minus qty icon" className="w-6" />
            </button>
            <p>{item.qty}</p>
            <button onClick={() => incrementCart(product.id)}>
              <img src={plus} alt="plus qty icon" className="w-6" />
            </button>
          </div>
        </div>
        <div className="ml-8">
          <button
            onClick={() => removeFromCart(product.id)}
            className="border-2  px-4 py-2 block rounded hover:bg-gray-200"
          >
            remove
          </button>
        </div>
      </div>
      <div className="w-5/6 mx-auto border-b-2 border-gray-300"></div>
    </>
  );
};

export default CartCard;
