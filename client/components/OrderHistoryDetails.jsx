import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectAuth } from '../slices/users/authSlice';
import {
  selectOrders,
  resetStatus,
  fetchOrderDetails,
  fetchUserOrders,
} from '../slices/users/orderSlice';

const OrderHistoryDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [details, setDetails] = useState([]);
  const [userOrder, setUserOrder] = useState({});
  let addressArr;
  let date;

  const { auth, token } = useSelector(selectAuth);
  const { orderDetails, order } = useSelector(selectOrders);

  const userId = auth.id;
  const id = auth.id;
  const orderId = +params.orderId;

  useEffect(() => {
    if (auth && auth.id) {
      dispatch(fetchUserOrders({ id, token }));
      dispatch(fetchOrderDetails({ userId, orderId, token }));
    }

    return () => {
      dispatch(resetStatus());
    };
  }, [auth]);

  useEffect(() => {
    setDetails(orderDetails || []);
    const specificOrder = order.filter((order) => order.id === orderId)[0];
    setUserOrder(specificOrder || {});
  }, [orderDetails, auth]);

  if (details.length >= 1) {
    addressArr = details[0].address.split('\n');
    date = details[0].createdAt.slice(0, 10);
  }

  if (details.length < 1) return <h2>Loading...</h2>;

  return (
    <div className="absolute top-0 left-0 min-h-screen w-screen bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-center pt-36">
      <div className="top-30 absolute left-10 flex w-full max-w-xl flex-col gap-10 pt-16">
        <p className="font-extrabold text-center text-4xl text-primary-deep-green">
          Previous Orders
        </p>

        <div className="relative flex flex-col gap-5 overflow-x-auto text-primary-deep-green">
          <div>
            <p>DATE: {date}</p>
            <p>ORDER ID: {orderId}</p>
            <p>ITEMS: {userOrder.totalQty}</p>
          </div>
          <div className="table-wrapper rounded-xl border border-primary-deep-green bg-primary-deep-green">
            <table className="w-full overflow-clip rounded-xl bg-white text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="rounded-xl bg-primary-deep-green text-xs uppercase text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {details && details.length
                  ? details.map((item) => {
                      return (
                        <tr key={item.id}>
                          <th scope="col" className="px-6 py-3">
                            {item.productName}
                          </th>

                          <th scope="col" className="px-6 py-3 text-center">
                            {item.qty}
                          </th>
                          <th scope="col" className="px-6 py-3 text-right">
                            ${item.totalPrice.toFixed(2)}
                          </th>
                        </tr>
                      );
                    })
                  : 'No past orders!'}
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-md px-6 pt-3">Shipping</th>
                  <th></th>
                  <th className="text-md px-6 pt-3 text-right ">Free</th>
                </tr>
                <tr>
                  <th className="text-md px-6 pt-3">Discount</th>
                  <th></th>
                  <th className="text-md px-6 pt-3 text-right ">
                    -${(details[0].totalPrice * userOrder.promoRate).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th className="text-md px-6 py-3">Total</th>
                  <th></th>
                  <th className="text-md px-6 py-3 text-right">
                    ${userOrder.finalPrice}
                  </th>
                </tr>
              </tfoot>
            </table>{' '}
          </div>
          <div className="flex flex-row text-primary-deep-green">
            <div className="w-1/2">
              <p>PAYMENT METHOD</p>
              <p>
                {details[0].paymentMethod === 'cc'
                  ? 'Credit / debit card'
                  : details[0].paymentMethod}
              </p>
            </div>
            <div className="w-1/2">
              <p>SHIPPING TO</p>
              {addressArr.length === 4 ? (
                <>
                  <p>{details[0].userName}</p>
                  <p>{addressArr[0]}</p>
                  <p>
                    {addressArr[1]}, {addressArr[2]} {addressArr[3]}
                  </p>
                </>
              ) : (
                <>
                  <p>{details[0].userName}</p>
                  <p>{addressArr[0]}</p>
                  <p>{addressArr[2]}</p>
                  <p>
                    {addressArr[3]}, {addressArr[4]} {addressArr[5]}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="pt-50 m-auto">
          <button className="align-text-left font-bold py-1 align-baseline text-sm hover:text-primary-promo-banner">
            <Link to="/account/orderhistory">Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDetails;
