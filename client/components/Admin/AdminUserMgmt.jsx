import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  resetStatus as resetAuthStatus,
  selectAuth,
} from '../../slices/users/authSlice';
import {
  fetchAllUsers,
  resetStatus as resetUserStatus,
  selectUsers,
} from '../../slices/users/userSlice';

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
    <div className="h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.webp')] bg-cover bg-center">
      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className=" flex h-[calc(100vh_-_5rem)] w-1/4 -translate-x-full flex-col gap-5 transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="flex flex-col gap-3 pt-5">
            <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
              <button className="text-left">
                <Link to={'/account/admin'}>ADMIN DASHBOARD</Link>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/products'}>PRODUCTS</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/addproduct'}>ADD NEW PRODUCT</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/promos'}>PROMOS</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/addpromo'}>ADD NEW PROMO</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full bg-green-900 p-3 pl-5 text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/users'}>USER MANAGEMENT</Link>
                </button>
              </div>
            </div>
          </div>
          <button className="font-bold py-1 pl-5 text-left text-sm hover:text-primary-promo-banner">
            <Link to={'/account'}>Back</Link>
          </button>
        </aside>

        <div className="h-[calc(100vh_-_5rem)] w-3/4 overflow-auto p-4">
          <div className="p-4">
            <div className="flex h-[calc(100vh_-_10rem)] flex-col overflow-auto rounded-xl">
              <div id="products">
                <table id="productTable" className="w-full overflow-x-auto">
                  <thead className="sticky top-0 rounded-xl bg-gray-50 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="sticky top-0 px-6 py-3">
                        {'USER ID'}
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 px-6 py-3 text-left"
                      >
                        {'NAME'}
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 px-6 py-3 text-left"
                      >
                        {'EMAIL'}
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 px-6 py-3 text-left"
                      >
                        {'ROLE'}
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3">
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
