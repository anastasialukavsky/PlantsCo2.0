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
    <div className="relative  xl:pt-28 5xl:pt-44 6xl:pt-56">
      <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[url('/assets/bg_img/admin.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat pt-3  font-outfit  md:h-[calc(100vh_-_4rem)] lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)]  6xl:h-[calc(100dvh_-_200px)] portrait:absolute portrait:top-0 portrait:mt-20 portrait:h-[calc(100dvh_-_5rem)] portrait:w-full portrait:px-2 portrait:lg:mt-20">
        <h1 className="mb-4 text-center text-[2.7vw] font-bold  text-green-gray  mix-blend-luminosity lg:text-[2.6vw] xl:text-[2.3vw] 3xl:text-[2.3vw] 3xl:text-white 4xl:text-[2.1vw] 5xl:text-[1.8vw] 6xl:text-[1.5vw] portrait:text-green-gray portrait:xs:text-[5vw] portrait:md:text-[4vw]">
          WISHLIST
        </h1>
        <div className="mx-auto max-h-[70vh] w-fit max-w-[1200px] overflow-y-auto border border-green-gray bg-white/80 p-4 md:min-w-[700px] lg:text-[2.8vw] 4xl:min-w-[1000px] 5xl:max-h-[65vh] 5xl:min-w-[900px]  portrait:w-[90vw] portrait:border-green-gray portrait:xs:min-h-[80vh] portrait:xs:max-w-[90vw] portrait:xs:p-2 portrait:md:min-h-[80vh] portrait:lg:h-[90vh]">
          {wishlist[0]?.products.length > 0 ? (
            wishlist[0]?.products.map((product) => {
              return <WishlistCard key={product.id} product={product} />;
            })
          ) : (
            <div className="mx-auto flex h-full w-fit flex-col items-center justify-center pt-10 text-center text-green-gray">
              <h2 className="text-[2.2vw]  xl:text-[2vw] 2xl:text-[1.6vw] 4xl:text-[1.3vw] 5xl:text-[1.1vw] portrait:xs:text-[5vw] portrait:md:text-[3vw]">
                No items in your wishlist...
              </h2>
              <p className="text-[1.7vw] xl:text-[1.5vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.9vw] portrait:xs:text-[3.7vw] portrait:md:text-[2.5vw]">
                Click the heart icon on a product to add one!
              </p>
              <Link
                className="mt-8 self-center bg-green-gray py-1 px-4 text-[1.3vw] text-white hover:bg-primary-button-hover 2xl:text-[1vw] 4xl:text-[.8vw] portrait:px-6 portrait:xs:text-[4vw] portrait:md:text-[2.8vw]"
                to={'/products'}
              >
                shop now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
            }
            