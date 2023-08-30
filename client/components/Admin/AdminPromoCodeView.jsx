import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../../slices/users/authSlice';
import {
  fetchAllPromos,
  selectPromos,
  resetStatus as resetPromoStatus,
} from '../../slices/product/promoSlice';

const AdminPromoCodeView = () => {
  const dispatch = useDispatch();

  const { auth, token } = useSelector(selectAuth);
  const { promos } = useSelector(selectPromos);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllPromos({ token }));
    }

    return () => {
      resetAuthStatus();
      resetPromoStatus();
    };
  }, [auth]);

  if (!promos?.length) return <h2>Loading...</h2>;

  return (
    <div className="overflow-auto">
      <table id="productTable" className="w-full overflow-x-auto">
        <thead className="sticky top-0 rounded-xl bg-green-900 text-sm uppercase text-primary-bright-white">
          <tr>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'PROMO ID'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 text-left">
              {'NAME'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'DISCOUNT RATE'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'STATUS'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'ACTIONS'}
            </th>
          </tr>
        </thead>

        <tbody>
          {promos.map((promo) => {
            return (
              <tr
                key={promo.id}
                className="text-sm odd:bg-white even:bg-slate-50"
              >
                <td scope="col" className="px-6 py-3 text-center">
                  {promo.id}
                </td>
                <td scope="col" className="px-6 py-3 text-left">
                  {promo.name}
                </td>
                <td scope="col" className="px-6 py-3 text-center">
                  {(promo.discountRate * 100).toFixed()}
                  {'%'}
                </td>
                <td scope="col" className="px-6 py-3 text-center">
                  {promo.status.toString()}
                </td>
                <td scope="col" className="px-6 py-3 text-center">
                  <Link
                    className="hover:text-primary-promo-banner"
                    to={`/account/admin/editpromos/${promo.id}`}
                  >
                    {'Edit / Delete'}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPromoCodeView;
