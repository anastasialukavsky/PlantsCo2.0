import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuth,
  logIn,
  attemptTokenLogin,
} from '../slices/users/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(
      logIn({
        email,
        password,
      })
    );

    dispatch(attemptTokenLogin());
    navigate('/');
  };

  return (
    <div className="w-full max-w-xs">
      <section className="flex gap-20 justify-center mt-16 ">
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              name="email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="   ************"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              name="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Log In
            </button>
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
