import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  fetchUserOrders,
  resetStatus,
  selectOrders,
} from '../slices/users/orderSlice';
import { selectAuth } from '../slices/users/authSlice';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState([]);

  const { auth, token } = useSelector(selectAuth);
  const id = auth.id;
  const { order, status } = useSelector(selectOrders);

  useEffect(() => {
    if (auth && auth.id) {
      dispatch(fetchUserOrders({ id, token }));
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [auth]);

  useEffect(() => {
    setUserOrders(order || []);
  }, [order]);

  const orderDetails = (orderId) => {
    navigate(`/account/orderhistory/${orderId}`);
  };

  if (userOrders.length < 1)
    return (
      <div className="h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-center">
        <div className="top-30 absolute left-10 flex w-full max-w-xl flex-col gap-10 pt-16">
          <p className="font-extrabold text-center text-4xl text-primary-deep-green">
            No Orders!
          </p>
          <button className="font-bold inline-block py-1 align-baseline text-sm hover:text-primary-promo-banner">
            <Link to="/account">Back</Link>
          </button>
        </div>
        <div className="pt-50 m-auto"></div>
      </div>
    );

  return (
    <div className="h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-center">
      <div className="top-30 absolute left-10 flex w-full max-w-xl flex-col gap-10 pt-16">
        <p className="font-extrabold text-center text-4xl text-primary-deep-green">
          Previous Orders
        </p>

        <div className="relative overflow-x-auto">
          <table className="w-full rounded-xl bg-white text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of Order
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Item Qty
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {userOrders && userOrders.length
                ? userOrders.map((order) => {
                    return (
                      <tr
                        onClick={() => orderDetails(order.id)}
                        key={order.id}
                        className="cursor-pointer hover:text-primary-promo-banner"
                      >
                        <th scope="col" className="px-6 py-3">
                          {order.id}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {order.createdAt.slice(0, 10)}
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          {order.totalQty}
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                          ${order.finalPrice}
                        </th>
                      </tr>
                    );
                  })
                : 'No past orders!'}
            </tbody>
          </table>
        </div>
        <div className="pt-50 m-auto">
          <button className="font-bold inline-block py-1 align-baseline text-sm hover:text-primary-promo-banner">
            <Link to="/account">Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
