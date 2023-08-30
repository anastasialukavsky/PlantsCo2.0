import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import {
  Homepage,
  AllProducts,
  SingleProduct,
  NavBar,
  Login,
  UserAccount,
  Cart,
  Signup,
  EditProfile,
  OrderHistory,
  CartView,
  NotFound,
  OrderHistoryDetails,
  Checkout,
  OrderConfirmation,
  Wishlist,
} from './index';

import AdminDashboard from './Admin/AdminDashboard.jsx';
import AddNewProduct from './Admin/AddNewProduct.jsx';
import AddNewPromo from './Admin/AddNewPromo.jsx';
import AdminProductView from './Admin/AdminProductView.jsx';
import AdminPromoCodeView from './Admin/AdminPromoCodeView.jsx';
import AdminUserMgmt from './Admin/AdminUserMgmt.jsx';
import EditProduct from './Admin/EditProduct.jsx';
import EditPromos from './Admin/EditPromos.jsx';
// const AddNewProduct = lazy(() => import('./Admin/AddNewProduct.jsx'));
// const AddNewPromo = lazy(() => import('./Admin/AddNewPromo.jsx'));
// const AdminProductView = lazy(() => import('./Admin/AdminProductView.jsx'));
// const AdminPromoCodeView = lazy(() => import('./Admin/AdminPromoCodeView.jsx'));
// const AdminUserMgmt = lazy(() => import('./Admin/AdminUserMgmt.jsx'));
// const EditProduct = lazy(() => import('./Admin/EditProduct.jsx'));
// const EditPromos = lazy(() => import('./Admin/EditPromos.jsx'));

import { selectAuth, attemptTokenLogin } from '../slices/users/authSlice';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptTokenLogin());
  }, []);

  const { auth } = useSelector(selectAuth);

  return (
    <React.Fragment>
      <div className="font-fraunces text-primary-deep-green">
        <NavBar auth={auth} />
        <Cart />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account/editprofile" element={<EditProfile />} />
          <Route path="/account/orderhistory" element={<OrderHistory />} />
          <Route path="/account/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/shipping" element={<Checkout />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route
            path="/account/orderhistory/:orderId"
            element={<OrderHistoryDetails />}
          />
          <Route path="/*" element={<NotFound />} />
          <Route path="/account/admin" element={<AdminDashboard />} />
          <Route
            path="/account/admin/products"
            element={<AdminProductView />}
          />
          <Route
            path="/account/admin/promos"
            element={<AdminPromoCodeView />}
          />
          <Route
            path="/account/admin/editpromos/:promoId"
            element={<EditPromos />}
          />
          <Route path="/account/admin/users" element={<AdminUserMgmt />} />
          <Route
            path="/account/admin/editproduct/:productId"
            element={<EditProduct />}
          />
          <Route path="/account/admin/addproduct" element={<AddNewProduct />} />
          <Route path="/account/admin/addpromo" element={<AddNewPromo />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}
