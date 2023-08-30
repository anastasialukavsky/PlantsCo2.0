import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../../slices/users/authSlice';
import {
  fetchAllProducts,
  selectAllProducts,
  resetStatusError as resetProductStatus,
} from '../../slices/product/productSlice';

const AdminProductView = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      resetAuthStatus();
      resetProductStatus();
    };
  }, [auth]);

  if (!products?.length) return <h2>Loading...</h2>;

  return (
    <div id="products" className="overflow-auto">
      <table id="productTable" className="w-full">
        <thead className="sticky top-0 rounded-xl bg-green-900 text-sm uppercase text-primary-bright-white">
          <tr>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'PRODUCT ID'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 text-left">
              {'NAME'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'PRICE'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'QTY'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'ACTIONS'}
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            return (
              <tr
                key={product.id}
                className="text-sm odd:bg-white even:bg-slate-50"
              >
                <td scope="col" className="px-6 py-3 text-center">
                  {product.id}
                </td>
                <td scope="col" className="px-6 py-3 text-left">
                  {product.name}
                </td>
                <td scope="col" className="px-6 py-3 text-center">
                  {'$'}
                  {product.price}
                </td>
                <td scope="col" className="px-6 py-3 text-center">
                  {product.qty}
                </td>
                <td scope="col" className="px-6 py-3 text-center">
                  <Link
                    className="hover:text-primary-promo-banner"
                    to={`/account/admin/editproduct/${product.id}`}
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

export default AdminProductView;
