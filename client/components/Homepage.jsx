import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginMessage,
  resetStatus,
  selectLogoutMessage,
} from '../slices/users/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PromoBanner from './UI/PromoBanner.jsx';

export default function Homepage() {
  const dispatch = useDispatch();
  const showLoginMessage = useSelector(selectLoginMessage);
  const showLogoutMessage = useSelector(selectLogoutMessage);
  useEffect(() => {
    if (showLoginMessage === true) {
      const loginToast = toast.success('Logged in!');
    } else {
      if (showLogoutMessage === true) toast.success('Logged out!');
    }
    setTimeout(() => {
      dispatch(resetStatus());
      toast.dismiss();
    }, 2000);
    return () => dispatch(resetStatus());
  }, []);

  return (
    <>
      <div className="absolute  top-0 mx-auto h-screen w-[100vw]   bg-[url('/assets/bg_img/home1.jpg')]  bg-cover text-white md:bg-[url('/assets/bg_img/homepage13.jpg')] md:bg-right md:text-green-gray">
        {/**homepage txt section */}
        <div className="absolute top-48 left-1/2 w-[80vw] -translate-x-1/2 flex-col gap-5 text-center md:bottom-auto   md:min-w-[500px] lg:top-72 lg:left-32 lg:translate-x-0 lg:text-left">
          <div className="mb-4 w-full font-quicksand">
            <p className="mb-2 font-quicksand text-[7vw] font-light uppercase leading-none lg:text-[4.8vw]">
              Your perfect plant,
            </p>
            <p className="text-[4vw] font-semibold leading-none md:text-[1.5vw]">
              one click away
            </p>
          </div>
          <div className="mb-[90%] flex flex-col font-quicksand text-[5vw] font-semibold sm:text-2xl md:mb-16 md:text-[2vw]">
            <p>Transform your space.</p>
            <p>No green thumb needed</p>
          </div>

          <Link to="/products">
            <button className="w-full max-w-xs bg-[#6f9283] py-2 font-tabac text-xl font-semibold tracking-widest text-white shadow-xl">
              SHOP NOW
            </button>
          </Link>
        </div>

        <Toaster />
      </div>
    </>
  );
}
