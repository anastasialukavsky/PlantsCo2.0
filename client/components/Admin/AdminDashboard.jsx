import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../../slices/users/authSlice';

const AdminDashboard = () => {
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    return () => {
      resetAuthStatus();
    };
  }, [auth]);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-cover bg-center pt-36 pr-4 pb-4">
      <div className="flex flex-row">
        <nav
          id="default-sidebar"
          className=" flex w-1/4 -translate-x-full flex-col gap-5 transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="flex flex-col gap-3 pt-5">
            <Link
              to={'/account/admin'}
              className="mr-5 rounded-r-full bg-green-900 p-3 pl-5 text-left text-primary-bright-white"
            >
              ADMIN DASHBOARD
            </Link>

            <div className="nav-link-container flex flex-col gap-3">
              <Link
                to={'/account/admin/products'}
                className="mr-5 rounded-r-full p-3 pl-5 text-left hover:bg-green-900 hover:text-primary-bright-white"
              >
                PRODUCTS
              </Link>
              <Link
                to={'/account/admin/addproduct'}
                className="mr-5 rounded-r-full p-3 pl-5 text-left hover:bg-green-900 hover:text-primary-bright-white"
              >
                ADD NEW PRODUCT
              </Link>
              <Link
                to={'/account/admin/promos'}
                className="mr-5 rounded-r-full p-3 pl-5 text-left hover:bg-green-900 hover:text-primary-bright-white"
              >
                PROMOS
              </Link>
              <Link
                to={'/account/admin/addpromo'}
                className="mr-5 rounded-r-full p-3 pl-5 text-left hover:bg-green-900 hover:text-primary-bright-white"
              >
                ADD NEW PROMO
              </Link>
              <Link
                to={'/account/admin/users'}
                className="mr-5 rounded-r-full p-3 pl-5 text-left hover:bg-green-900 hover:text-primary-bright-white"
              >
                USER MANAGEMENT
              </Link>
              <Link
                to={'/account'}
                className="mr-5 rounded-r-full p-3 pl-5 text-left text-sm hover:border hover:border-green-900"
              >
                Back
              </Link>
            </div>
          </div>
        </nav>

        <div className="h-full w-4/5 overflow-auto p-4">
          <div className="flex h-screen w-screen flex-col overflow-auto rounded-xl">
            <p>Howdy, {auth.firstName}!</p>
            <p>Do cool admin stuff here :)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
