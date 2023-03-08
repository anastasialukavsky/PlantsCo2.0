import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';
import {
  fetchAllUsers,
  selectUsers,
  resetStatus as resetUserStatus,
} from '../slices/users/userSlice';

const AdminUserMgmt = () => {
  const dispatch = useDispatch();

  const { users } = useSelector(selectUsers);

  const { auth, token } = useSelector(selectAuth);

  useEffect(() => {
    if (auth && token) {
      dispatch(fetchAllUsers({ token }));
    }

    return () => {
      resetAuthStatus();
      resetUserStatus();
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
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/promos'}>PROMOS</Link>
                </button>
              </div>
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/addpromo'}>ADD NEW PROMO</Link>
                </button>
              </div>
              <div className="bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
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
                        {'USER ID'}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 top-0 sticky text-left"
                      >
                        {'NAME'}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 top-0 sticky text-left"
                      >
                        {'EMAIL'}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 top-0 sticky text-left"
                      >
                        {'ROLE'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'IS ADMIN'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length
                      ? users.map((user) => {
                          return (
                            <tr
                              key={user.id}
                              className="text-sm odd:bg-white even:bg-slate-50"
                            >
                              <td scope="col" className="px-6 py-3 text-center">
                                {user.id}
                              </td>
                              <td scope="col" className="px-6 py-3 text-left">
                                {user.fullName}
                              </td>
                              <td scope="col" className="px-6 py-3 text-left">
                                {user.email}
                              </td>
                              <td scope="col" className="px-6 py-3">
                                {user.role}
                              </td>
                              <td scope="col" className="px-6 py-3 text-center">
                                {user.isAdmin.toString()}
                              </td>
                            </tr>
                          );
                        })
                      : 'Users Loading...'}
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

export default AdminUserMgmt;
