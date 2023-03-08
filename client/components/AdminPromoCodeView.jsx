import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';
import {
  fetchAllPromos,
  selectPromos,
  resetStatus as resetPromoStatus,
} from '../slices/product/promoSlice';

const AdminPromoCodeView = () => {
  const dispatch = useDispatch();

  const { auth, token } = useSelector(selectAuth);
  const { promos } = useSelector(selectPromos);

  useEffect(() => {
    dispatch(fetchAllPromos({ token }));

    return () => {
      resetAuthStatus();
      resetPromoStatus();
    };
  }, [auth]);

  return (
    <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.jpg')]">
      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className=" w-1/4 h-[calc(100vh_-_5rem)] transition-transform -translate-x-full sm:translate-x-0 flex flex-col gap-5"
          aria-label="Sidebar"
        >
          <div className="flex flex-col pt-5 gap-3">
            <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
              <button className="text-left">
                <Link to={'/account/admin'}>ADMIN DASHBOARD</Link>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/products'}>PRODUCTS</Link>
                </button>
              </div>
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/addproduct'}>ADD NEW PRODUCT</Link>
                </button>
              </div>
              <div className="bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/promos'}>PROMOS</Link>
                </button>
              </div>
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/addpromo'}>ADD NEW PROMO</Link>
                </button>
              </div>
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/users'}>USER MANAGEMENT</Link>
                </button>
              </div>
            </div>
          </div>
          <button className="text-left pl-5 font-bold text-sm hover:text-primary-promo-banner py-1">
            <Link to={'/account'}>Back</Link>
          </button>
        </aside>

        <div className="p-4 w-3/4 h-[calc(100vh_-_5rem)] overflow-auto">
          <div className="p-4">
            <div className="flex flex-col h-[calc(100vh_-_10rem)] rounded-xl overflow-auto">
              <div id="products">
                <table id="productTable" className="overflow-x-auto w-full">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-xl sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 sticky top-0">
                        {'PROMO ID'}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 top-0 sticky text-left"
                      >
                        {'NAME'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'DISCOUNT RATE'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'STATUS'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'ACTIONS'}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {promos && promos.length
                      ? promos.map((promo) => {
                          return (
                            <tr
                              key={promo.id}
                              className="text-sm odd:bg-white even:bg-slate-50"
                            >
                              <th scope="col" className="px-6 py-3">
                                {promo.id}
                              </th>
                              <th scope="col" className="px-6 py-3 text-left">
                                {promo.name}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {(promo.discountRate * 100).toFixed()}
                                {'%'}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {promo.status.toString()}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                <Link
                                  className="hover:text-primary-promo-banner"
                                  to={`/account/admin/editpromos/${promo.id}`}
                                >
                                  {'Edit / Delete'}
                                </Link>
                              </th>
                            </tr>
                          );
                        })
                      : 'Promos Loading...'}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPromoCodeView;
