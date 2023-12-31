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
    <div className="relative xl:pt-28 5xl:pt-44 6xl:pt-56">
      <main className="cart-page-wrapper font-green-gray absolute top-0 left-0 h-screen w-screen overflow-hidden bg-opacity-90 bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat font-outfit  md:h-[calc(100vh_-_4rem)] md:pt-3 lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)]  6xl:h-[calc(100dvh_-_200px)] portrait:absolute portrait:top-0 portrait:mt-20 portrait:h-[calc(100dvh_-_5rem)] portrait:w-full portrait:lg:mt-20">
        <h1 className="mb-4 text-center text-[2.7vw] font-bold text-green-gray mix-blend-multiply lg:text-[2.6vw] xl:text-[2.3vw] 3xl:text-[2.3vw] 4xl:text-[2.1vw] 5xl:text-[1.8vw] 6xl:text-[1.5vw] portrait:text-center portrait:xs:text-[5vw] portrait:md:text-[4vw]">
          CART
        </h1>
        <div className="mx-auto max-h-[70vh] w-fit max-w-[1200px] overflow-y-auto border border-green-gray bg-white/80 p-4 md:min-w-[700px] 4xl:min-w-[1000px] 5xl:max-h-[65vh] 5xl:min-w-[900px] portrait:w-[90vw] portrait:border-green-gray portrait:xs:min-h-[80vh] portrait:xs:max-w-[90vw] portrait:xs:p-2 portrait:md:min-h-[80vh] portrait:lg:max-h-[70vh]">
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
              <div className="mx-auto my-3 mb-6 flex w-full  flex-col items-center md:w-2/5 lg:w-3/5 2xl:w-full portrait:md:w-4/5 portrait:lg:w-3/4">
                <Link
                  className="mx-auto block w-full bg-green-gray py-2 text-center text-[1.4vw] text-white duration-500 ease-in hover:bg-primary-button-hover hover:transition-all md:w-3/4 2xl:w-2/4 5xl:w-2/4 5xl:text-[.8vw] 6xl:text-[.7vw] portrait:xs:text-[4vw] portrait:md:text-[3vw]"
                  to="/shipping"
                >
                  PROCEED TO PAYMENT
                </Link>
                <button
                  onClick={emptyCart}
                  className="text-[1.3vw] 5xl:text-[.8vw] 6xl:text-[.7vw] portrait:xs:text-[4vw] portrait:md:text-[2.7vw]"
                >
                  empty cart
                </button>
              </div>
            </>
          ) : (
            <div className="mx-auto flex h-full w-fit flex-col items-center justify-center pt-10 text-center text-green-gray">
              <h2 className="text-[2.2vw]  xl:text-[2vw] 2xl:text-[1.6vw] 4xl:text-[1.3vw] 5xl:text-[1.1vw] portrait:xs:text-[5vw] portrait:md:text-[3vw]">
                Your cart is empty...
              </h2>
              <p className="text-[1.7vw] xl:text-[1.5vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.9vw] portrait:xs:text-[3.7vw] portrait:md:text-[2.5vw]">
                Can we recommend something from our shop?
              </p>
              <Link
                className="mt-8 self-center bg-green-gray py-1 px-4 text-[1.3vw] text-white hover:bg-primary-button-hover 2xl:text-[1vw] 4xl:text-[.8vw] portrait:px-6 portrait:xs:text-[4vw] portrait:md:text-[2.8vw] "
                to={'/products'}
              >
                shop now
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
                }
                