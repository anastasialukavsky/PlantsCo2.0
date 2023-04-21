import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginMessage,
  resetStatus,
  selectLogoutMessage,
} from '../slices/users/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

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
    <div className="bg-[url('/assets/bg_img/testing.jpg')] lg:bg-[url('/assets/bg_img/homepage13.jpg')] h-[calc(100vh_-_5rem)] w-full mx-auto bg-no-repeat bg-center lg:bg-right bg-cover">
      <div className="absolute flex-col gap-5 text-4xl sm:text-[3.5rem] text-center top-36 md:bottom-auto lg:top-96 lg:left-36 left-1/2 -translate-x-1/2 lg:text-left lg:translate-x-0 min-w-[500px] tracking-wide">
        <div className="mb-4 w-full">
          <p className="leading-none mb-2">Your perfect plant,</p>
          <p className="">one click away</p>
        </div>
        <div className="text-xl sm:text-2xl flex flex-col mb-16">
          <p>Transform your space.</p>
          <p>No green thumb needed</p>
        </div>
        <Link to="/products">
          <button className="text-xl bg-primary-deep-green text-white w-full max-w-xs py-2 rounded-xl">
            Shop Now
          </button>
        </Link>
      </div>
      {/* <div className="flex absolute top-[35rem] text-2xl left-48"> */}
      {/* </div> */}
      <Toaster />
    </div>
  );
}
