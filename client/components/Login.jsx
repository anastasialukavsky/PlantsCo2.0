import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn,
  attemptTokenLogin,
  selectAuth,
} from '../slices/users/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logInFail, setLogInFail] = useState(false);
  const [logInAttempt, setLogInAttempt] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const { auth, status } = useSelector(selectAuth);

  const validClass =
    'appearance-none border rounded w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const invalidClass =
    'appearance-none border border-red-500 rounded w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const checkFormValidation = () => {
    if (email === '') {
      setIsInvalidEmail(true);
    }
    if (password === '' || password.length < 8) {
      setIsInvalidPassword(true);
    }
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    checkFormValidation();
    setLogInAttempt(true);
    if (!isInvalidEmail && !isInvalidPassword) {
      await dispatch(
        logIn({
          email,
          password,
        })
      );

      await dispatch(attemptTokenLogin());
    }
  };

  useEffect(() => {
    if (auth.firstName) navigate('/');
    else if (logInAttempt) {
      setLogInFail(true);
    }
  }, [auth]);

  const forgotPassword = () => {};

  return (
    <div className="bg-cover bg-center bg-[url('/assets/bg_img/login_signin_page.jpg')] h-[calc(100vh_-_5rem)]">
      <div className="w-full max-w-sm m-auto pt-16">
        <h2 className="text-center text-4xl font-bold">Login</h2>
        <section className="flex flex-col gap-5 justify-center mt-16 ">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <p
                className={
                  logInFail ? 'text-red-500 text-xs' : 'collapse text-xs'
                }
              >
                Invalid email or password!
              </p>
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={
                  isInvalidEmail || logInFail ? invalidClass : validClass
                }
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(evt) => {
                  setIsInvalidEmail(false);
                  setLogInFail(false);
                  setEmail(evt.target.value);
                }}
                name="email"
              />
              <p
                className={
                  isInvalidEmail ? 'text-red-500 text-xs' : 'collapse text-xs'
                }
              >
                Enter email!
              </p>
            </div>

            <div className="mb-6">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={
                  isInvalidPassword || logInFail ? invalidClass : validClass
                }
                id="password"
                type="password"
                placeholder="************"
                value={password}
                onChange={(evt) => {
                  setIsInvalidPassword(false);
                  setLogInFail(false);
                  setPassword(evt.target.value);
                }}
                name="password"
              />
              <p
                className={
                  isInvalidPassword
                    ? 'text-red-500 text-xs'
                    : 'collapse text-xs'
                }
              >
                Invalid password!
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-xl mx-auto block text-xl hover:transition-all"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button
              onClick={forgotPassword}
              className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner py-3"
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex justify-center">
            <button className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner">
              <Link to={'/signup'}>Don't have an account? Sign up!</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
