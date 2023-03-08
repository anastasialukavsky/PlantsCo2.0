import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../slices/users/authSlice';
import { attemptTokenLogin } from '../slices/users/authSlice';
import { selectAuth } from '../slices/users/authSlice';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const [isInvalid, setIsInvalid] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [invalidEmailMessage, setInvalidEmailMessage] =
    useState('Enter your email');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageURL: '',
    password: '',
  });

  const token = window.localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(attemptTokenLogin());
      navigate('/products');
    }
  }, [token]);

  function validateEmail(email) {
    // from https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formData.password.length < 8) {
      setShortPassword(true);
      setFormData({ ...formData, password: '' });
    } else setShortPassword(false);

    if (!validateEmail(formData.email)) {
      setFormData({ ...formData, email: '' });
      setInvalidEmailMessage('Invalid email format');
      setIsInvalid(true);
      return;
    }

    if (formData.firstName === '' || formData.lastName === '') {
      setIsInvalid(true);
      return;
    }

    dispatch(signUp(formData));
  };

  const passwordValidationMessage = () => {
    if (shortPassword) return 'Must be at least 8 characters';
    if (isInvalid && formData.password === '') return 'Please enter a password';
    return null;
  };

  const login = () => {
    navigate('/login');
  };

  return (
    <div className="bg-cover bg-center bg-[url('/assets/bg_img/login_signin_page.jpg')] h-[calc(100vh_-_5rem)]">
      <div className="w-full max-w-sm m-auto pt-16">
        <h2 className="text-center text-4xl font-bold">Sign Up</h2>
        <section className="flex flex-col gap-10 justify-center mt-16 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className=" appearance-none border rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder={isInvalid ? 'Enter your first name' : null}
                value={formData.firstName}
                name="firstName"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className=" appearance-none border rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder={isInvalid ? 'Enter your last name' : null}
                value={formData.lastName}
                name="lastName"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className=" appearance-none border rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                id="email"
                type="text"
                placeholder={isInvalid ? invalidEmailMessage : null}
                value={formData.email}
                name="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" appearance-none border rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                id="password"
                type="password"
                placeholder={passwordValidationMessage()}
                value={formData.password}
                name="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div>
              <button
                className="ease-in duration-500  hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-2xl mx-auto block text-xl hover:transition-all mt-10"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button
              onClick={login}
              className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner"
            >
              Already have an account? Log in!
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
