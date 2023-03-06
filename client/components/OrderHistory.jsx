import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchUserOrders,
  resetStatus,
  selectOrders,
} from '../slices/users/orderSlice';
// import { selectUsers } from '../slices/users/userSlice';
import { attemptTokenLogin, selectAuth } from '../slices/users/authSlice';

// <form onSubmit={onSubmit}>
//   <div className="mb-4">
//     <label
//       className="block text-primary-deep-green text-sm font-bold mb-2"
//       htmlFor="firstName"
//     >
//       First Name
//     </label>
//     <input
//       className="shadow appearance-none border rounded-lg w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
//       id="firstName"
//       type="text"
//       placeholder="first name"
//       // value={email}
//       // onChange={(evt) => setEmail(evt.target.value)}
//       name="email"
//     />
//   </div>

//   <div className="mb-6">
//     <label
//       className="block text-primary-deep-green text-sm font-bold mb-2"
//       htmlFor="password"
//     >
//       Password
//     </label>
//     <input
//       className="shadow appearance-none border border rounded-lg w-96 py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//       id="password"
//       type="password"
//       placeholder="   ************"
//       // value={password}
//       // onChange={(evt) => setPassword(evt.target.value)}
//       name="password"
//     />
//   </div>
//   <div className="flex items-center justify-between">
//     <button
//       type="submit"
//       className="hover:bg-primary-button-green w-full bg-primary-deep-green text-white py-2 rounded-2xl mx-auto block text-xl hover:transition-all"
//     >
//       Save
//     </button>
//   </div>
//   <div className="flex justify-center">
//     <a
//       className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner py-3"
//       href="#"
//     >
//       Go Back
//     </a>
//   </div>
// </form>;

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(attemptTokenLogin());

  //   return () => {
  //     dispatch(resetStatus());
  //   };
  // }, []);

  const { auth, token } = useSelector(selectAuth);
  const id = auth.id;

  useEffect(() => {
    dispatch(fetchUserOrders({ id, token }));
    return () => {
      dispatch(resetStatus());
    };
  }, [auth]);

  const { order, status } = useSelector(selectOrders);

  console.log(order);

  const goBack = () => {
    navigate('/account');
  };

  return (
    <div className="bg-cover bg-center h-screen bg-[url('/assets/bg_img/cart.jpg')]">
      <div className="w-full max-w-sm absolute top-30 left-10 pt-16">
        <p className="text-center text-4xl font-extrabold pb-2 text-primary-deep-green">
          Previous Orders
        </p>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date of Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>

                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">$2999</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>

                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4">$1999</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>

                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">$99</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col mt-8 gap-3 text-center">
          <div>ORDER 1</div>
          <div>ORDER 2</div>
          <div>ORDER 3</div>
          <div>ORDER 4</div>
          <button className="py-3 px-5 mr-2 mb-2 text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100">
            Edit Profile
          </button>
          <button className="py-3 px-5 mr-2 mb-2 text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100">
            Update Password
          </button>
          <button className="py-3 px-5 mr-2 mb-2 text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100">
            Order History
          </button>
          <button
            className="text-primary-deep-green hover:text-primary-promo-banner text-sm"
            onClick={goBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
