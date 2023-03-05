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

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.password === ''
    ) {
      setIsInvalid(true);
      return;
    }
  
    dispatch(signUp(formData));
   
  };

  return (
    <div className="w-full max-w-xs">
      <section className="flex gap-20 justify-center mt-16 ">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
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

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
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

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder={isInvalid ? 'Enter your email' : null}
              value={formData.email}
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder={isInvalid ? 'Enter your password' : null}
              value={formData.password}
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}
