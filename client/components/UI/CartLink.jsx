import React from 'react';

export default function CartLink({ cartQty }) {
  return (
    <div className="relative">
      <h2>CART</h2>
      {cartQty > 0 && (
        <div className="absolute top-1/2 -right-6 flex aspect-square w-fit min-w-[16px] -translate-y-1/2 items-center justify-center rounded-full bg-primary-button-green p-1 text-xs leading-[0] text-white">
          {cartQty}
        </div>
      )}
    </div>
  );
}
