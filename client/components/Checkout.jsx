import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkout } from '../slices/checkout/checkoutSlice';
import { selectCheckout } from '../slices/checkout/checkoutSlice';
import { selectUsers } from '../slices/users/userSlice';
import { fetchSingleUser } from '../slices/users/userSlice';
import { selectAuth } from '../slices/users/authSlice';

export default function Checkout() {
  const dispatch = useDispatch();

  const checkoutState = useSelector(selectCheckout);
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUsers);
  const [isInvalid, setIsInvalid] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    promoCode: '',
  });

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token && auth.auth && auth.auth.id) {
      dispatch(fetchSingleUser({ id: auth.auth.id, token }));
    }
  }, [dispatch, token, auth]);

  useEffect(() => {
    if (user && user.user && user.user.id) {
      const tempFormData = {};

      tempFormData.firstName = user.user.firstName || '';
      tempFormData.lastName = user.user.lastName || '';
      tempFormData.email = user.user.email || '';

      if (user.user.shippings.length > 0) {
        tempFormData.street1 = user.user.shippings[0].street1 || '';
        tempFormData.street2 = user.user.shippings[0].street2 || '';
        tempFormData.city = user.user.shippings[0].city || '';
        tempFormData.state = user.user.shippings[0].state || '';
        tempFormData.zip = user.user.shippings[0].zip || '';
      } else {
        tempFormData.street1 = '';
        tempFormData.street2 = '';
        tempFormData.city = '';
        tempFormData.state = '';
        tempFormData.zip = '';
      }

      tempFormData.promoCode = '';

      setFormData(tempFormData);
    }
  }, [user]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.street1 === '' ||
      formData.city === '' ||
      formData.state === '' ||
      formData.zip === ''
    ) {
      setIsInvalid(true);
      return;
    }
    dispatch(
      checkout({
        name: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        userEmail: formData.email,
        address: {
          street1: formData.street1,
          street2: formData.street2,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        promoCode: formData.promoCode,
      })
    );
  };

  useEffect(() => {
    if (checkoutState && checkoutState.checkout) {
      window.location = checkoutState.checkout;
    }

    if (checkoutState && checkoutState.error === 'Invalid promo code') {
      const promo = document.querySelector('#promoCode');
      promo.value = '';
    }
  }, [checkoutState]);

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-[url('/assets/misc_bg/shipping.jpg')]  h-[calc(100vh_-_5rem)]">
    <h2 className="text-center text-4xl font-bold py-6">Shipping Information</h2>
      <div className="flex justify-center ">
      <div className="max-w-lg p-6  bg-opacity-50 rounded-md bg-lime-900">
        <section className="flex flex-col mt-3">
          <form onSubmit={handleSubmit} >
            <div className="mb-3">
              <label
                className="block text-slate-50 text-sm font-bold mb-1"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                id="firstName"
                type="text"
                name="firstName"
                placeholder={isInvalid ? 'Enter your first name' : null}
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block  text-slate-50 text-sm font-bold mb-1"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="lastName"
                placeholder={isInvalid ? 'Enter your last name' : null}
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block  text-slate-50 text-sm font-bold mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="email"
                placeholder={isInvalid ? 'Enter your email' : null}
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block  text-slate-50 text-sm font-bold mb-1"
                htmlFor="street1"
              >
                Street1
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="street1"
                placeholder={isInvalid ? 'Enter your address' : null}
                id="street1"
                value={formData.street1}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block  text-slate-50 text-sm font-bold mb-1"
                htmlFor="street1"
              >
                Street2
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="street2"
                id="street2"
                value={formData.street2}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block  text-slate-50 text-sm font-bold mb-1"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="city"
                placeholder={isInvalid ? 'Enter your city' : null}
                id="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block  text-slate-50 text-sm font-bold mb-1"
                htmlFor="state"
              >
                State
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="state"
                placeholder={isInvalid ? 'Enter your state' : null}
                id="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block text-slate-50 text-sm font-bold mb-1"
                htmlFor="state"
              >
                Zip
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="zip"
                placeholder={isInvalid ? 'Enter your zip' : null}
                id="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                className="block text-slate-50 text-sm font-bold mb-1"
                htmlFor="state"
              >
                Promo Code
              </label>
              <input
                className="shadow appearance-none border rounded w-96 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline text-md"
                type="text"
                name="promoCode"
                id="promoCode"
                value={formData.promoCode}
                placeholder={
                  checkoutState.error === 'Invalid promo code'
                    ? 'Invalid promo code'
                    : null
                }
                onChange={handleChange}
              />
            </div>
          </form>

          <div>
            <button
              className="ease-in duration-500  hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-2xl mx-auto block text-xl hover:transition-all mt-5"
              type="submit"
              onClick={handleSubmit}
            >
              Proceed To Payment
            </button>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
