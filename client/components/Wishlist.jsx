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
    <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[url('/assets/bg_img/admin.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat pt-20 font-outfit xl:pt-28 5xl:pt-44 6xl:pt-56 portrait:px-2">
      <h1 className="mb-4 text-center text-[3.8vw] font-bold text-white 3xl:text-[3vw] 4xl:text-[2.5vw] 5xl:text-[2vw] 6xl:text-[1.8vw] portrait:text-green-gray portrait:xs:text-[5vw] portrait:md:text-[4vw]">
        WISHLIST
      </h1>
      <div className="mx-auto max-h-[70vh] w-fit max-w-[1200px] overflow-y-auto border border-green-gray bg-white/80 p-4 md:min-w-[700px] 4xl:min-w-[1000px] 5xl:max-h-[65vh] 5xl:min-w-[900px]  portrait:md:min-h-[80vh] portrait:xs:min-h-[80vh] portrait:w-[90vw] portrait:xs:max-w-[90vw] portrait:xs:p-2 portrait:lg:h-[90vh] lg:text-[2.8vw]">
        {wishlist[0]?.products.length > 0 ? (
          wishlist[0]?.products.map((product) => {
            return <WishlistCard key={product.id} product={product} />;
          })
        ) : (
          <div className="mx-auto flex w-fit flex-col items-center h-full justify-center text-center text-green-gray pt-10">
            <h2 className="text-[2.2vw]  xl:text-[2vw] 2xl:text-[1.6vw] 4xl:text-[1.3vw] 5xl:text-[1.1vw] portrait:xs:text-[5vw] portrait:md:text-[3vw]">
              No items in your wishlist...
            </h2>
            <p className="text-[1.7vw] portrait:md:text-[2.5vw] xl:text-[1.5vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.9vw] portrait:xs:text-[3.7vw]">
              Click the heart icon on a product to add one!
            </p>
            <Link
              className="mt-8 self-center bg-green-gray py-1 px-4 text-[1.3vw] text-white hover:bg-primary-button-hover 2xl:text-[1vw] 4xl:text-[.8vw] portrait:xs:text-[4vw] portrait:md:text-[2.8vw] portrait:px-6"
              to={'/products'}
            >
              shop now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
