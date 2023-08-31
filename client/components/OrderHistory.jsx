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

  // <div className="absolute top-0 right-0 bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-center pt-36">
  //   <div className="top-30 absolute left-10 flex w-full max-w-xl flex-col gap-10 pt-16">
  //     <p className="font-extrabold text-center text-4xl text-primary-deep-green">
  //       No orders found...
  //     </p>
  //     <button className="font-bold inline-block py-1 align-baseline text-sm hover:text-primary-promo-banner">
  //       <Link to="/account">Back</Link>
  //     </button>
  //   </div>
  //   <div className="pt-50 m-auto"></div>
  // </div>

  return (
    <div className=" h-[calc(100vh_-_5rem)] w-screen bg-[url('/assets/misc_bg/acc5.webp')] bg-cover bg-center pt-36 font-outfit">
      <div className="min-w-xxs w-sm absolute  top-16  mx-auto w-full  pt-16 2xl:top-28 5xl:top-44 5xl:max-w-xl 6xl:top-64  ">
        <p className="font-extrabold text-center text-4xl font-bold text-white pb-3">
          PREVIOUS ORDERS
        </p>

        {userOrders?.length > 0 ? (
          <div className=" flex  flex-col items-center justify-center  overflow-x-auto font-outfit font-thin">
            <table className="w-5/6 bg-white text-center text-xs text-gray-500 dark:text-gray-400">
              <thead className="bg-primary-deep-green text-[1vw] uppercase text-white ">
                <tr className="">
                  <th scope="col" className="px-6 py-3 ">
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
                {userOrders.map((order) => {
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
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mx-auto text-center text-lg text-white">
            No previous orders
          </p>
        )}

        <div className=" m-auto flex justify-center pt-4">
          <button className="inline-block w-1/4 border border-white py-1 align-baseline text-sm text-white transition-all duration-500 hover:bg-primary-bright-white/20 portrait:w-full portrait:xxs:w-[80%]">
            <Link to="/account">back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
