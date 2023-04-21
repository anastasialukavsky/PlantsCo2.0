import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkout } from '../slices/checkout/checkoutSlice';
import { selectCheckout } from '../slices/checkout/checkoutSlice';
import { selectUsers } from '../slices/users/userSlice';
import { fetchSingleUser } from '../slices/users/userSlice';
import { selectAuth } from '../slices/users/authSlice';
import axios from 'axios';

export default function Checkout() {
  const dispatch = useDispatch();

  const checkoutState = useSelector(selectCheckout);
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUsers);
  const [invalidEmailMessage, setInvalidEmailMessage] =
    useState('Enter your email');
  const [invalidZipMessage, setInvalidZipMessage] = useState(
    'Enter your zip code'
  );

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

  const validateEmail = (email) => {
    // from https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  };

  const validateZip = (zip) => {
    let res = /^\d+$/;
    return res.test(zip);
  };

  const states = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Minor Outlying Islands',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'U.S. Virgin Islands',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsInvalid(false);

    let invalid = false;

    if (formData.promoCode !== '') {
      let promoCheck = await axios.get(
        '/api/promos/byName/' + formData.promoCode
      );
      if (promoCheck.id === undefined) {
        setIsInvalid(true);
        setFormData({ ...formData, promoCode: '' });
      }
    }

    if (!validateEmail(formData.email)) {
      setFormData({ ...formData, email: '' });
      setInvalidEmailMessage('Invalid email format');
      setIsInvalid(true);
      invalid = true;
    }

    if (!validateZip(formData.zip)) {
      setFormData({ ...formData, zip: '' });
      setInvalidZipMessage('Invalid zip code format');
      setIsInvalid(true);
      invalid = true;
    }

    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.street1 === '' ||
      formData.city === '' ||
      formData.state === '' ||
      formData.zip === '' ||
      formData.zip.length > 9
    ) {
      setIsInvalid(true);
      invalid = true;
    }
    if (invalid) return;

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
  }, [checkoutState]);

  return (
    <div className="relative h-[calc(100vh_-_5rem)] bg-[url('/assets/misc_bg/shipping.jpg')] bg-cover bg-center bg-no-repeat">
      <h2 className="font-bold py-6 text-center text-4xl">
        Shipping Information
      </h2>
      <div className="flex justify-center ">
        <div className="max-w-lg rounded-md  bg-lime-900 bg-opacity-50 p-6">
          <section className="mt-3 flex flex-col">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  className="font-bold mb-1 block text-sm text-slate-50"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
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
                  className="font-bold  mb-1 block text-sm text-slate-50"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
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
                  className="font-bold  mb-1 block text-sm text-slate-50"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
                  type="email"
                  name="email"
                  placeholder={isInvalid ? invalidEmailMessage : null}
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  className="font-bold  mb-1 block text-sm text-slate-50"
                  htmlFor="street1"
                >
                  Street1
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
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
                  className="font-bold  mb-1 block text-sm text-slate-50"
                  htmlFor="street1"
                >
                  Street2
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
                  type="text"
                  name="street2"
                  id="street2"
                  value={formData.street2}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  className="font-bold  mb-1 block text-sm text-slate-50"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
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
                  className="font-bold  mb-1 block text-sm text-slate-50"
                  htmlFor="state"
                >
                  State
                </label>
                <select
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select your state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label
                  className="font-bold mb-1 block text-sm text-slate-50"
                  htmlFor="state"
                >
                  Zip
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
                  type="text"
                  name="zip"
                  minLength="5"
                  maxLength="9"
                  placeholder={isInvalid ? invalidZipMessage : null}
                  id="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  className="font-bold mb-1 block text-sm text-slate-50"
                  htmlFor="state"
                >
                  Promo Code
                </label>
                <input
                  className="focus:shadow-outline text-md w-96 appearance-none rounded border py-1 px-4 leading-tight text-gray-700 shadow focus:bg-white focus:outline-none"
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
                className="mx-auto mt-5  block w-full rounded-2xl bg-primary-deep-green py-2 text-xl text-white duration-500 ease-in hover:bg-primary-button-hover hover:transition-all"
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
