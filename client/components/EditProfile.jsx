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
    <div className=" bg-[url('/assets/misc_bg/acc5.webp')] bg-cover bg-center font-outfit md:h-[calc(100dvh_-_4rem)] lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)]  2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)] 6xl:h-[calc(100dvh_-_200px)] portrait:h-[calc(100dvh_-_5rem)] portrait:lg:h-[calc(100dvh_-_5.9rem)] ">
      <div className="absolute top-10 left-1/2 mx-auto w-full max-w-sm -translate-x-1/2 pt-16 2xl:top-28 5xl:top-44 5xl:max-w-xl 6xl:top-64 ">
        <div className="mt-8 flex flex-col gap-3">
          <h2 className="mt-3 mb-3 text-center text-3xl font-bold text-white">
            EDIT PROFILE
          </h2>
          <section className="flex justify-center gap-20  ">
            <form
              className="w-[80%] max-w-lg  md:w-full "
              onSubmit={updateUser}
            >
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs  tracking-wide text-white"
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
                    className="mb-2 block text-xs   tracking-wide text-white"
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
                    className="mb-2 block text-xs  tracking-wide text-white"
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
                  className="mx-auto mt-5 block w-full  bg-green-gray py-2 text-xl text-white hover:bg-primary-button-hover hover:transition-all"
                >
                  save
                </button>
              </div>
            </form>
          </section>
          <div className="flex justify-center">
            <button
              className="inline-block w-full border border-white py-1 align-baseline text-sm text-white transition-all duration-500 hover:bg-primary-bright-white/20 portrait:w-[80%] portrait:md:w-full portrait:lg:w-full portrait:xxs:w-[80%]"
              onClick={goBack}
            >
              back
            </button>
          </div>
        </div>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default EditProfile;
