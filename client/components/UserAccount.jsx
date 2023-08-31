import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  logOut,
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [auth]);

  useEffect(() => {
    dispatch(attemptTokenLogin());

    return () => {
      dispatch(resetStatus());
    };
  }, []);

  if (!auth) return <h1>Page Loading...</h1>;

  return (
    <div className="h-[calc(100vh_-_5rem)] w-screen bg-[#EBEBEB] bg-cover bg-center md:bg-[url('/assets/bg_img/wishlist_page.webp')]">
      <div className="20 absolute top-40 left-1/2 w-full max-w-sm -translate-x-1/2 pt-16 md:left-auto md:right-20 md:translate-x-0">
        <p className="font-extrabold pb-2 text-center text-4xl text-primary-deep-green">
          Welcome Back,
        </p>
        <p className="font-extrabold text-center text-4xl">{auth.firstName}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to={'/account/editprofile'}
            className="text-text-primary-deep-green-900  mb-2 rounded-lg border bg-white py-3 px-5 text-center hover:bg-gray-100"
          >
            Edit Profile
          </Link>
          <Link
            to={'/account/orderhistory'}
            className="text-text-primary-deep-green-900  mb-2 rounded-lg border bg-white py-3 px-5 text-center hover:bg-gray-100"
          >
            Order History
          </Link>
          <Link
            to={'/account/wishlist'}
            className="text-text-primary-deep-green-900  mb-2 rounded-lg border bg-white py-3 px-5 text-center hover:bg-gray-100"
          >
            Wishlist
          </Link>
          {auth.isAdmin && (
            <Link
              to={'/account/admin'}
              className="text-text-primary-deep-green-900  mb-2 rounded-lg border bg-white py-3 px-5 text-center hover:bg-gray-100"
            >
              Admin Settings
            </Link>
          )}

          <button
            onClick={() => dispatch(logOut())}
            className="rounded-lg py-3 px-5 text-sm text-primary-deep-green hover:border hover:border-primary-bright-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
