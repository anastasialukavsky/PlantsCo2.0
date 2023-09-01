import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart, purgeCart } from '../slices/users/cartSlice';
import CartCard from './CartCard.jsx';
import CartSubtotal from './CartSubtotal.jsx';

export default function CartView() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  function emptyCart() {
    dispatch(purgeCart());
  }

  if (cart.loading) {
    return (
      <div className="mx-auto w-screen max-w-7xl">
        <div
          className="mx-auto mt-6 h-48 w-full bg-red-300 px-12"
          style={{
            background: '#ccc',
            animation: 'fade 2s ease-in-out infinite alternate',
            backgroundSize: '200% 100%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            background: '#ccc',
            animation: 'fade 2s ease-in-out infinite alternate',
            backgroundSize: '200% 100%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
          className="mx-auto mt-6 h-48 w-full bg-red-300 px-12"
        ></div>
        <div
          style={{
            background: '#ccc',
            animation: 'fade 2s ease-in-out infinite alternate',
            backgroundSize: '200% 100%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
          className="mx-auto mt-6 h-48 w-full bg-red-300 px-12"
        ></div>
      </div>
    );
  }

  // if (!cart || !cart.cart || !cart.cart.length > 0)
  //   return (
  //     <main className="cart-page-wrapper absolute top-0 left-0 h-screen w-screen bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-bottom bg-no-repeat pt-36">
  //       <div className="mx-auto w-[4/5] max-w-[1200px] rounded-2xl border border-primary-deep-green bg-white/80 p-4">
  //         <h1 className="mb-8 text-center text-3xl">Your Cart</h1>
  //       </div>
  //     </main>
  // <div className="mt-44 text-center">
  //   <h1 className="text-3xl">Your cart is empty...</h1>
  //   <h2 className="my-8 text-xl">
  //     Can we recommend something from our shop?
  //   </h2>
  //   <Link to={'/products'} className="">
  //     <div
  //       onClick={() => dispatch(adjustFilter(''))}
  //       className="border-2, inline-block rounded-lg bg-primary-deep-green px-6 py-3 text-white"
  //     >
  //       <p className="">Shop Now</p>
  //     </div>
  //   </Link>
  // </div>
  // );

  return (
    <main className="cart-page-wrapper font-green-gray absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat pt-20 font-outfit xl:pt-28 5xl:pt-44 6xl:pt-56">
      <h1 className="portrait:xs:text-[5vw] mb-4  text-center text-[3.8vw] lg:text-[2.8vw] font-bold 3xl:text-[3vw] 4xl:text-[2.5vw] 5xl:text-[2vw] 6xl:text-[1.8vw] portrait:md:text-[4vw] portrait:text-center">
        CART
      </h1>
      <div className="mx-auto max-h-[70vh] w-fit max-w-[1200px] overflow-y-auto border border-green-gray bg-white/80 p-4 md:min-w-[700px] 4xl:min-w-[1000px] 5xl:max-h-[65vh] 5xl:min-w-[900px]  portrait:w-[90vw] portrait:xs:min-h-[80vh] portrait:xs:max-w-[90vw] portrait:xs:p-2 portrait:md:min-h-[80vh] portrait:lg:h-[90vh]">
        {cart?.expandedCart.length > 0 ? (
          <>
            <div className="h-full overflow-y-auto">
              {cart.expandedCart &&
                cart.expandedCart.map((item) => {
                  return (
                    <div key={item.product.id}>
                      <CartCard product={item.product} item={item} />
                    </div>
                  );
                })}
            </div>
            <CartSubtotal />
            <div className="mx-auto my-3 mb-6 flex w-full flex-col items-center md:w-1/2">
              <Link
                className="mx-auto block w-full bg-green-gray py-2 text-center text-[1.4vw] text-white duration-500 ease-in hover:bg-primary-button-hover hover:transition-all md:w-3/4 2xl:w-2/4 5xl:w-2/4 portrait:text-[4vw]"
                to="/shipping"
              >
                PROCEED TO PAYMENT
              </Link>
              <button onClick={emptyCart} className="text-[1.3vw] portrait:xs:text-[4vw]">
                empty cart
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart-wrapper mx-auto flex w-fit flex-col  items-center">
            <h2 className="text-xl md:text-2xl">Your cart is empty...</h2>
            <p className="md:text-md text-center text-sm">
              Can we recommend something from our shop?
            </p>
            <Link
              className="mt-8 self-center  bg-green-gray py-2 px-4 text-white "
              to={'/products'}
            >
              SHOP NOW
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
