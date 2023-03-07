import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectWishlist, fetchWishlist } from '../slices/users/wishlistSlice';
import WishlistCard from './WishlistCard.jsx';

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const wishlist = useSelector(selectWishlist);
  return (
    <div>
      <div>
        <h1 className="text-3xl text-center">Wishlist</h1>
      </div>
      {wishlist[0]?.products.map((product) => {
        return <WishlistCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Wishlist;
