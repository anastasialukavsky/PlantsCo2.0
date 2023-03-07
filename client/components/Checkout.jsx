import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../slices/checkout/checkoutSlice';
import { selectCheckout } from '../slices/checkout/checkoutSlice';
import { selectUsers } from '../slices/users/userSlice';
import { fetchSingleUser } from '../slices/users/userSlice';
import { selectAuth } from '../slices/users/authSlice';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //select users
  const checkoutState = useSelector(selectCheckout);

  const auth = useSelector(selectAuth);
  const user = useSelector(selectUsers);

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

  // console.log('userInfo:', user);

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
      // console.log('tempFormData', tempFormData);
    }
  }, [user]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
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
    <div>
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="street1">Street1</label>
          <input
            type="text"
            name="street1"
            id="street1"
            value={formData.street1}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="state">Zip</label>
          <input
            type="text"
            name="zip"
            id="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="state">Promo Code</label>
          <input
            type="text"
            name="promoCode"
            id="promoCode"
            value={formData.promoCode}
            onChange={handleChange}
          />
        </div>
      </form>

      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
