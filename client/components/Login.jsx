import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn,
  attemptTokenLogin,
  selectAuth,
  selectAuthLoading,
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
  const authLoading = useSelector(selectAuthLoading);
  const [isInvalid, setIsInvalid] = useState(false);

  const { auth, status } = useSelector(selectAuth);

  console.log('auth loading:', authLoading);

  const validClass =
    'appearance-none border rounded w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const invalidClass =
    'appearance-none border border-red-500 rounded w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const validateEmail = (email) => {
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  };

  const checkFormValidation = () => {
    if (email === '') {
      setIsInvalidEmail(true);
    }
    if (!validateEmail(email)) {
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
    <div className="h-[calc(100vh_-_5rem)] bg-[#E4e4e4] bg-cover bg-center">
      <div className="m-auto w-full max-w-sm pt-16">
        <h2 className="font-bold text-center text-4xl">Login</h2>
        <section className="mt-4 flex flex-col justify-center gap-5 ">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <p
                className={
                  logInFail ? 'text-xs text-red-500' : 'collapse text-xs'
                }
              >
                Invalid login credentials!
              </p>
              <label
                className="font-bold mb-2 block text-sm text-primary-deep-green"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={
                  isInvalidEmail || logInFail ? invalidClass : validClass
                }
                id="email"
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
                  isInvalidEmail ? 'text-xs text-red-500' : 'collapse text-xs'
                }
              >
                Enter email!
              </p>
            </div>

            <div className="mb-6">
              <label
                className="font-bold mb-2 block text-sm text-primary-deep-green"
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
                    ? 'text-xs text-red-500'
                    : 'collapse text-xs'
                }
              >
                Invalid password!
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="mx-auto block w-full rounded-xl bg-primary-deep-green py-2 text-xl text-white hover:bg-primary-button-hover hover:transition-all"
              >
                {authLoading ? 'Loading..' : 'Login'}
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button
              onClick={forgotPassword}
              className="font-bold inline-block py-3 align-baseline text-sm hover:text-primary-promo-banner"
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex justify-center">
            <button className="font-bold inline-block align-baseline text-sm hover:text-primary-promo-banner">
              <Link to={'/signup'}>Don't have an account? Sign up!</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
