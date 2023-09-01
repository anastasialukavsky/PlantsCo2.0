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
    addressArr = details[0].address.split('  ');
    date = details[0].createdAt.slice(0, 10);
  }
console.log(details)
  if (details.length < 1) return <h2>Loading...</h2>;

  return (
    <div className="absolute top-16 left-0 min-h-screen w-screen bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-center p-2 font-outfit text-green-gray md:top-0 md:p-0 portrait:md:p-2">
      <div className="flex w-full flex-col items-center  justify-center gap-5  md:pt-[11%] 2xl:pt-[9%] 4xl:pt-[8%] 6xl:pt-[7%]">
        <p className="pt-4 text-center text-[5.5vw] portrait:md:text-[5vw] md:text-[2vw] 5xl:text-[1.6vw] font-bold md:pt-0">
          ORDER DETAIL
        </p>

        <div className="relative flex flex-col gap-5 overflow-x-auto">
          <div className="text-[3vw] md:text-[1vw]   3xl:text-[.9vw] 4xl:text-[.7vw] 5xl:text-[.6vw] portrait:md:text-[2vw]">
            <p>DATE: {date}</p>
            <p>ORDER ID: {orderId}</p>
            <p>ITEMS: {userOrder.totalQty}</p>
          </div>
          <div className="table-wrapper  border border-green-gray ">
            <table className="w-full overflow-clip  bg-white/90 text-left portrait:md:text-[2.7vw]  text-[3.5vw] md:text-[1vw] text-gray-500 dark:text-gray-400 5xl:text-[.6vw]">
              <thead className=" bg-green-gray text-[3vw] md:text-[1vw] uppercase text-white 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:md:text-[2.8vw]">
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
            </table>
          </div>
          <div className="5xl:text-[.7vw] portrait:md:text-[3vw] flex flex-row border border-green-gray bg-white/90  p-2 text-[3.8vw] md:text-[1vw] text-green-gray">
            <div className=" w-1/2">
              <p>PAYMENT METHOD</p>
              <p>
                {details[0].paymentMethod === 'cc'
                  ? 'Credit / debit card'
                  : details[0].paymentMethod}
              </p>
            </div>
            <div className="5xl:text[.6vw] w-1/2">
              <p>SHIPPING TO</p>
              <p>{details[0].userName}</p>
              <p>{addressArr[0]}</p>
              <p>
                {addressArr[1]} {addressArr[2]} {addressArr[3]}
              </p>
            </div>
          </div>
        </div>
        <div className=" m-auto flex items-center justify-center pb-5 ">
          <button className="align-text-left transition-all border border-green-gray bg-white/80 px-10  align-baseline portrait:md:text-[3.7vw] text-[5.4vw] md:text-[1vw] duration-500 5xl:text-[.8vw] ">
            <Link to="/account/orderhistory">back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDetails;
