import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectWishlist, fetchWishlist } from '../slices/users/wishlistSlice';
import WishlistCard from './WishlistCard.jsx';

export default function Wishlist() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const wishlist = useSelector(selectWishlist);

  if (!wishlist) return <h2>Loading...</h2>;

  return (
    <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[url('/assets/bg_img/wishlist_page.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat pt-36">
      <h1 className="mb-8 text-center text-4xl">Your Wishlist</h1>
      <div className="mx-auto max-h-[70vh] w-[4/5] max-w-[1200px] overflow-y-auto rounded-2xl border border-primary-deep-green bg-white/80 p-4">
        {wishlist[0]?.products.length > 0 ? (
          wishlist[0]?.products.map((product) => {
            return <WishlistCard key={product.id} product={product} />;
          })
        ) : (
          <div className="mx-auto flex w-fit flex-col items-start">
            <h2 className="text-2xl">No items in your wishlist...</h2>
            <p>Click the heart icon on a product to add one!</p>
            <Link
              className="mt-8 self-center rounded-xl bg-primary-deep-green py-3 px-4 text-white hover:bg-primary-button-hover"
              to={'/products'}
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
