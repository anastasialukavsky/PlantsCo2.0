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

  const validClass =
    'appearance-none border portrait:w-72 w-96 3xl:py-2 py-3 px-4 text-gray-700 text-[3vw] md:text-[1.3vw] 5xl:text-[1vw] 6xl:text-[.8vw] leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const invalidClass =
    'appearance-none border portrait:w-72 border-red-700 text-[3vw] md:text-[1.3vw] 5xl:text-[1vw] 6xl:text-[.8vw] w-96 py-3 3xl:py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

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


  return (
    <div className="right-0 h-[calc(100dvh_-_5rem)] bg-[url('/assets/bg_img/home2.jpg')] bg-cover bg-center bg-no-repeat font-outfit text-white md:h-[calc(100vh_-_4rem)] md:bg-[url('/assets/misc_bg/login.webp')] lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)]  5xl:h-[calc(100dvh_-_159px)]  6xl:h-[calc(100dvh_-_200px)] portrait:absolute portrait:top-0 portrait:mt-20 portrait:h-[calc(100dvh_-_5rem)] portrait:w-full portrait:lg:mt-20">
      <div className="m-auto w-full max-w-sm  pt-14">
        <h2 className="text-center font-outfit text-[7vw] font-semibold tracking-wide md:text-[4vw] 3xl:text-[3vw] 5xl:text-[2vw]">
          LOGIN
        </h2>
        <section className="mt-2 flex flex-col items-center justify-center  gap-5 ">
          <form onSubmit={onSubmit} className="">
            <div className="mb-2 ">
              <p
                className={
                  logInFail ? 'text-xs text-red-700' : 'collapse text-xs'
                }
              >
                Invalid login credentials!
              </p>
              <label className="mb-1 block text-sm " htmlFor="email">
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
                  isInvalidEmail ? 'text-xs text-red-700' : 'collapse text-xs'
                }
              >
                Enter email!
              </p>
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-sm  " htmlFor="password">
                Password
              </label>
              <input
                className={
                  isInvalidPassword || logInFail ? invalidClass : validClass
                }
                id="password"
                type="password"
                placeholder="password"
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
                    ? 'text-xs text-red-700'
                    : 'collapse text-xs'
                }
              >
                Invalid password!
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="mx-auto block w-full bg-green-gray py-2 text-[4vw] text-white hover:bg-primary-button-hover hover:transition-all md:text-[2.6vw] lg:py-1 lg:text-[2.1vw]  3xl:py-1 3xl:text-[2.2vw] 4xl:text-[1.6vw] 5xl:text-[1.2vw] 6xl:text-[1vw]"
              >
                {authLoading ? 'loading..' : 'login'}
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button className="inline-block align-baseline text-[3vw] md:text-[1.6vw] xl:text-[1.2vw] 3xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] ">
              don't have an account? sign up{' '}
              <Link to={'/signup'} className="underline ">
                {' '}
                here
              </Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
