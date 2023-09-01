import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustWishlist, selectWishlist } from '../slices/users/wishlistSlice';
import { Link } from 'react-router-dom';

const WishlistCard = ({ product }) => {
  const dispatch = useDispatch();

  const wishlist = useSelector(selectWishlist);

  const handleRemove = (productId) => {
    dispatch(
      adjustWishlist({
        productId,
        action: 'delete',
        wishlistId: wishlist[0]?.id,
      })
    );
  };

  return (
    <>
      <div className="flex h-52 items-center justify-around gap-6 md:mx-4 portrait:xs:gap-3 portrait:xs:px-1">
        <div className="h-36 2xl:w-40">
          <img
            src={`${product.imageURL}`}
            alt={`product photo of ${product.name}`}
            className="h-36 2xl:w-40"
          />
        </div>
        <div className=" min-w-48 flex flex-col  gap-2 align-top">
          <Link to={`/products/${product.id}`}>
            <h1 className="cursor-pointer text-[1.5vw] uppercase hover:underline xl:text-[1.4vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:xs:text-[3.8vw]  portrait:md:text-[2.5vw] portrait:text-center">
              {product.name}
            </h1>
          </Link>
          <p className="portrait:text-center text-[1.2vw] italic text-gray-600 xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-[1.8vw] portrait:xs:text-[2.7vw] portrait:md:text-[2vw]">
            {product?.tags?.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p className="text-[1.5vw] xl:text-[1.3vw] 2xl:text-[1.1vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:text-[2.3vw] portrait:xs:text-[3.2vw] portrait:md:text-[2.5vw] portrait:text-center">
            ${product.price}
          </p>
        </div>
        <div className="ml-8">
          <button
            onClick={() => handleRemove(product.id)}
            className="block   border border-green-gray/30 py-1 px-2 text-[1.2vw] transition-all duration-300 hover:bg-gray-100 3xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-[2vw] portrait:xs:text-[3.1vw] portrait:md:text-[2.2vw]"
          >
            remove
          </button>
        </div>
      </div>
      <div className="mx-auto w-5/6 border-b-2 border-gray-300"></div>
    </>
  );
};

export default WishlistCard;
