import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginMessage,
  resetStatus,
  selectLogoutMessage,
} from '../slices/users/authSlice';
import toast, { Toaster } from 'react-hot-toast';

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
    <div className="bg-[url('/assets/bg_img/homepage13.jpg')] h-[calc(100vh_-_5rem)] w-screen bg-no-repeat bg-right bg-cover ">
      <div className="absolute flex-col text-[3.5rem] top-96 left-48 tracking-wide">
        <p className="leading-none">Your perfect plant,</p>
        <p className="">one click away</p>
      </div>
      <div className="flex absolute top-[35rem] text-2xl left-48">
        <p>Transform your space. No green thumb needed</p>
      </div>
      <Toaster />
    </div>
  );
}
