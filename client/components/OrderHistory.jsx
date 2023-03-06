import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchUserOrders,
  resetStatus,
  selectOrders,
} from '../slices/users/orderSlice';
import { attemptTokenLogin, selectAuth } from '../slices/users/authSlice';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState([]);

  // useEffect(() => {
  //   dispatch(attemptTokenLogin());

  //   return () => {
  //     dispatch(resetStatus());
  //   };
  // }, []);

  const { auth, token } = useSelector(selectAuth);
  const id = auth.id;
  const { order, status } = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchUserOrders({ id, token }));
    return () => {
      dispatch(resetStatus());
    };
  }, [auth]);

  useEffect(() => {
    setUserOrders(order, []);
  }, [order]);

  if (userOrders.length >= 1) {
    console.log('local state', userOrders[0]);
    console.log(Object.keys(userOrders[0]));
  }

  const goBack = () => {
    navigate('/account');
  };

  // if (status === 'pending') return <div>Loading..</div>;
  if (userOrders.length < 1) return <div>No Orders!</div>;

  return (
    <div className="bg-cover bg-center h-screen bg-[url('/assets/bg_img/cart.jpg')]">
      <div className="w-full max-w-lg absolute top-30 left-10 pt-16">
        <p className="text-center text-4xl font-extrabold pb-2 text-primary-deep-green">
          Previous Orders
        </p>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
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
                  1
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  2/24/22
                </th>

                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">$29</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  2
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1/1/23
                </th>

                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4">$150</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  3
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  2/14/23
                </th>

                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">$299</td>
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
