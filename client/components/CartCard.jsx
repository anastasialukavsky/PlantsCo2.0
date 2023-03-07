import React from 'react';

const CartCard = (props) => {
  const { product } = props;
  console.log('product', product);

  return (
    <div className="flex h-52 gap-6">
      <div>
        <img
          src={`${product.imageURL}`}
          alt={`product photo of ${product.name}`}
          className="h-full"
        />
      </div>
      <div className="w-44 grow flex flex-col gap-3">
        <h1 className="text-3xl">{product.name}</h1>
        <p className="text-gray-600 text-xs italic">TAGS WILL GO HERE</p>
        <p>{product.price}</p>
        <div className="flex">
          <p>-</p>
          <p>Qty here</p>
          <p>+</p>
        </div>
      </div>
      <div className="justify-self-end">
        <button className="border-2">remove</button>
      </div>
    </div>
  );
};

export default CartCard;
