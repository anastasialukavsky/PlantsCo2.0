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
    <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[url('/assets/bg_img/admin.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat pt-20 xl:pt-28 font-outfit 5xl:pt-44 6xl:pt-56 portrait:px-2">
      <h1 className="mb-4 text-center 4xl:text-[2.5vw] 3xl:text-[3vw] 5xl:text-[2vw] 6xl:text-[1.8vw] portrait:text-green-gray portrait:md:text-[4vw] portrait:xs:text-[5vw] text-[3.8vw] text-white font-bold">WISHLIST</h1>
      <div className="mx-auto portrait:max-h-[80vh] portrait:lg:h-[90vh] portrait:w-[90vw] portrait:xs:max-w-[90vw] max-h-[70vh] 5xl:max-h-[65vh] 5xl:min-w-[900px] 4xl:min-w-[1000px] md:min-w-[700px] w-fit max-w-[1200px] overflow-y-auto  border border-green-gray bg-white/80 p-4 portrait:xs:p-2">
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
