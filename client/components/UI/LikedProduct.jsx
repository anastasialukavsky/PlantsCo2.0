import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectWishlist,
  fetchWishlist,
} from '../../slices/users/wishlistSlice';
import heartOutline from '../../../public/assets/heart-outline.svg';
import heartFilled from '../../../public/assets/heart-filled.svg';

const LikedProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const handleHeartClick = () => {
    dispatch(fetchWishlist());
  };

  const wishlist = useSelector(selectWishlist);
  // Boolean of if product is in the wishlist
  const productIsLiked = wishlist[0]?.products.some(
    ({ id }) => +id === +productId
  );

  return (
    <img
      src={productIsLiked ? heartFilled : heartOutline}
      alt="heart outline icon"
      className="w-8"
      onClick={handleHeartClick}
    />
  );
};

export default LikedProduct;
