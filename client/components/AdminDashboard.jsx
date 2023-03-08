import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { auth, token } = useSelector(selectAuth);

  useEffect(() => {
    return () => {
      resetAuthStatus();
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
            <div className="bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
              <button className="text-left">
                <Link to={'/account/admin'}>ADMIN DASHBOARD</Link>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="flex flex-row">
                  <Link to={'/account/admin/products'}>PRODUCTS</Link>
                </button>
              </div>
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="flex flex-row">
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
                <p>Howdy, {auth.firstName}!</p>
                <p>Do cool admin stuff here :)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
