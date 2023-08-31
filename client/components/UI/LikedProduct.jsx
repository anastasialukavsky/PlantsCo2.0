import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  selectWishlist,
  fetchWishlist,
  adjustWishlist,
} from '../../slices/users/wishlistSlice';
import heartOutline from '../../../public/assets/heart-outline.svg';
import heartFilled from '../../../public/assets/heart-filled.svg';
import toast, { Toaster } from 'react-hot-toast';

const LikedProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const wishlist = useSelector(selectWishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const handleHeartClick = () => {
    if (!wishlist) {
      toast('Please login to mark favorites.', { duration: 2000 });
    } else {
      if (productIsLiked) {
        toast.error('Item removed from wishlist', { duration: 1000 });
      } else {
        toast.success('Item added to wishlist');
      }

      dispatch(
        adjustWishlist({
          productId,
          action: productIsLiked ? 'delete' : 'add',
          wishlistId: wishlist[0]?.id,
        })
      );
    }
  };

  // Boolean of if product is in the wishlist
  let productIsLiked = false;
  if (wishlist) {
    productIsLiked = wishlist[0]?.products.some(({ id }) => +id === +productId);
  }

  return (
    <>
      <button
        className="w-6 3xl:w-[8] 5xl:w-[11] 6xl:w-[20]"
        onClick={() => {
          // notify();
          handleHeartClick();
        }}
      >
        <img
          src={productIsLiked ? heartFilled : heartOutline}
          alt="heart outline icon"
        />
      </button>
      {/* <Toaster /> */}
    </>
  );
};

export default LikedProduct;
