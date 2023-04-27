import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustWishlist, selectWishlist } from '../slices/users/wishlistSlice';
import { Link } from 'react-router-dom';

const WishlistCard = ({ product }) => {
  const dispatch = useDispatch();

  const wishlist = useSelector(selectWishlist);

  console.log('product', product);

  const handleRemove = (productId) => {
    console.log(wishlist[0]?.id, productId);
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
      <div className=" mx-8 flex h-52 items-center gap-6">
        <div className="h-48">
          <img
            src={`${product.imageURL}`}
            alt={`product photo of ${product.name}`}
            className="h-48"
          />
        </div>
        <div className=" flex w-48 flex-col gap-3">
          <Link to={`/products/${product.id}`}>
            <h1 className="text-3xl hover:underline">{product.name}</h1>
          </Link>
          <p className="text-xs italic text-gray-600">
            {product?.tags?.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p>${product.price}</p>
        </div>
        <div className="ml-8">
          <button
            onClick={() => handleRemove(product.id)}
            className="block  rounded border-2 px-4 py-2 hover:bg-gray-200"
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
