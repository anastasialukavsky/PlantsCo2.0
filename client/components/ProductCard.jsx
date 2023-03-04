import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
  const { product } = props;
  return (
    <div key={product.id} className="group">
      <Link to={`/products/${product.id}`}>
        <div className="relative">
          <img
            src={`/${product.imageURL}`}
            alt="Picture of plant on a counter"
            className="w-full relative group"
          />
          <button className="bg-primary-deep-green w-full text-white absolute bottom-0  py-1 invisible group-hover:visible mx-auto opacity-60 transition duration-100 ease-in-out hover:opacity-100">
            Add To Cart
          </button>
        </div>
        <p className="text-2xl mb-1">{product.name}</p>
        <p className="text-sm">${product.price}</p>
      </Link>
      {/* <button className="bg-primary-deep-green w-full text-white absolute bottom-14 rounded-xl py-1 invisible group-hover:visible mx-auto opacity-60 transition duration-100 ease-in-out hover:opacity-100">
                  Add To Cart
                </button> */}
    </div>
  );
};

export default ProductCard;
