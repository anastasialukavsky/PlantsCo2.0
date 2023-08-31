import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../slices/users/authSlice';
import { attemptTokenLogin } from '../slices/users/authSlice';
import { selectAuth } from '../slices/users/authSlice';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
  const [isInvalidLastName, setIsInvalidLastName] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageURL: '',
    password: '',
  });

  const validClass =
    'appearance-none border portrait:w-80 w-96 3xl:py-2 py-3 px-4 text-gray-700 text-[3vw] md:text-[1.3vw] 5xl:text-[1vw] 6xl:text-[.8vw] leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const invalidClass =
    'appearance-none border portrait:w-72 border-red-700 text-[3vw] md:text-[1.3vw] 5xl:text-[1vw] 6xl:text-[.8vw] w-96 py-3 3xl:py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const token = window.localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(attemptTokenLogin());
      navigate('/products');
    }
  }, [token, isInvalid]);

  const validateEmail = (email) => {
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  };

  const checkFormValidation = () => {
    if (formData.firstName === '') {
      setIsInvalidFirstName(true);
      setIsInvalid(true);
    }
    if (formData.lastName === '') {
      setIsInvalidLastName(true);
      setIsInvalid(true);
    }

    if (formData.email === '') {
      setIsInvalidEmail(true);
      setIsInvalid(true);
    }

    if (!validateEmail(formData.email)) {
      setIsInvalidEmail(true);
      setIsInvalid(true);
    }

    if (formData.password === '' || formData.password.length < 8) {
      setIsInvalidPassword(true);
      setIsInvalid(true);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    checkFormValidation();
    if (!isInvalid) dispatch(signUp(formData));
  };

  return (
    <div className="right-0 bg-[url('/assets/bg_img/home2.jpg')] bg-cover bg-center bg-no-repeat font-outfit text-white md:h-[calc(100vh_-_4rem)] md:bg-[url('/assets/misc_bg/login.webp')] lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)]  6xl:h-[calc(100dvh_-_200px)] portrait:absolute portrait:top-0 portrait:mt-20 portrait:h-[calc(100dvh_-_5rem)] portrait:w-full portrait:lg:mt-20 ">
      <div className="m-auto w-full max-w-sm pt-20 md:pt-5 xl:pt-16 ">
        <h2 className="text-center font-outfit font-semibold text-[8vw] md:text-[3.1vw]  tracking-wide 3xl:text-[3vw] 5xl:text-[2vw]">
          SIGN UP
        </h2>
        <section className="mt-2 flex flex-col items-center justify-center  gap-1">
          <form onSubmit={handleSubmit} className="">
            <div className="lg:mb-1">
              <label className="mb-1 block text-sm " htmlFor="firstName">
                First Name
              </label>
              <input
                className={isInvalidFirstName ? invalidClass : validClass}
                id="firstName"
                type="text"
                placeholder="first name"
                value={formData.firstName}
                name="firstName"
                onChange={(e) => {
                  setIsInvalidFirstName(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, firstName: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidFirstName ? 'mt-1 text-xs text-red-700' : 'collapse '
                }
              >
                Please enter your first name!
              </p>
            </div>

            <div className="lg:mb-1">
              <label className="mb-1 block text-sm " htmlFor="lastName">
                Last Name
              </label>
              <input
                className={isInvalidLastName ? invalidClass : validClass}
                id="lastName"
                type="text"
                placeholder="last name"
                value={formData.lastName}
                name="lastName"
                onChange={(e) => {
                  setIsInvalidLastName(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, lastName: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidLastName ? 'mt-1 text-xs text-red-700' : 'collapse '
                }
              >
                Please enter your last name!
              </p>
            </div>

            <div className="lg:mb-1">
              <label className="mb-1 block text-sm " htmlFor="email">
                Email
              </label>
              <input
                className={isInvalidEmail ? invalidClass : validClass}
                id="email"
                placeholder="email"
                value={formData.email}
                name="email"
                onChange={(e) => {
                  setIsInvalidEmail(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidEmail ? 'mt-1 text-xs text-red-700' : 'collapse '
                }
              >
                Please enter a valid email!
              </p>
            </div>

            <div className="lg:mb-1">
              <label className="mb-1 block text-sm " htmlFor="password">
                Password
              </label>
              <input
                className={isInvalidPassword ? invalidClass : validClass}
                id="password"
                type="password"
                placeholder="password"
                value={formData.password}
                name="password"
                onChange={(e) => {
                  setIsInvalidPassword(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidPassword ? 'mt-1 text-xs text-red-700' : 'collapse '
                }
              >
                Please enter a valid password (at least 8 chars)!
              </p>
            </div>

            <div>
              <button
                className="mx-auto block w-full bg-green-gray py-2 text-[4vw] text-white hover:bg-primary-button-hover hover:transition-all md:text-[2.6vw] lg:py-1 lg:text-[2.1vw]  3xl:py-1 3xl:text-[2.2vw] 4xl:text-[1.6vw] 5xl:text-[1.2vw] 6xl:text-[1vw]"
                type="submit"
              >
                sign up
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button className="inline-block align-baseline text-[3vw] md:text-[1.6vw] xl:text-[1.2vw] 3xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] ">
              already have an account? log in{' '}
              <Link to={'/login'} className="underline">
                here
              </Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
