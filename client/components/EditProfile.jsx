import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';
import { updateSingleUser, selectUsers } from '../slices/users/userSlice';
import toast, { Toaster } from 'react-hot-toast';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector(selectAuth);

  const { user } = useSelector(selectUsers);
  const id = auth.id;
  const token = localStorage.getItem('token');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(attemptTokenLogin());

    return () => {
      dispatch(resetStatus());
    };
  }, [user]);

  useEffect(() => {
    setFirstName(auth.firstName || '');
    setLastName(auth.lastName || '');
    setEmail(auth.email || '');
  }, [auth]);

  const updateUser = (evt) => {
    evt.preventDefault();
    toast.success('Account info successfully changed');
    const updates = { firstName, lastName, email };
    dispatch(updateSingleUser({ id, token, updates }));
  };

  const goBack = () => {
    navigate('/account');
  };

  return (
    <div className="h-[calc(100vh_-_5rem)] bg-[#EBEBEB] bg-cover bg-center md:bg-[url('/assets/bg_img/wishlist_page.webp')]">
      <div className="absolute top-40 left-1/2 right-20 w-full max-w-sm -translate-x-1/2 pt-16 md:left-auto md:translate-x-0">
        <p className="font-extrabold pb-2 text-center text-4xl text-primary-deep-green">
          Welcome Back,
        </p>
        <p className="font-extrabold text-center text-4xl">{auth.firstName}</p>
        <div className="mt-8 flex flex-col gap-3">
          <h2 className="font-bold mt-3 mb-3 text-center">EDIT PROFILE</h2>
          <section className="flex justify-center gap-20 ">
            <form className="w-full max-w-lg" onSubmit={updateUser}>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    value={firstName}
                    onChange={(evt) => setFirstName(evt.target.value)}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    value={lastName}
                    onChange={(evt) => setLastName(evt.target.value)}
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight  text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-email"
                    type="text"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="mx-auto mt-5 block w-full rounded-lg bg-primary-deep-green py-2 text-xl text-white hover:bg-primary-button-hover hover:transition-all"
                >
                  Save
                </button>
              </div>
              <div className="flex justify-center"></div>
            </form>
          </section>
          <button
            className="font-bold inline-block py-1 align-baseline text-sm hover:text-primary-promo-banner"
            onClick={goBack}
          >
            Back
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default EditProfile;
