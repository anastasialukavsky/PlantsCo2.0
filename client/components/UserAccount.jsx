import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../slices/users/authSlice';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const attemptLogOut = async () => {
    await dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      <h1>ACCOUNT</h1>
      <button onClick={attemptLogOut}>Log Out</button>
    </>
  );
};

export default UserAccount;
