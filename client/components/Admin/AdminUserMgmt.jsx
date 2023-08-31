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

  if (!users?.length) return <h2>Loading...</h2>;

  return (
    <div className="overflow-auto">
      <table id="productTable" className="w-full overflow-x-auto">
        <thead className="sticky top-0 rounded-xl bg-green-900 text-sm uppercase text-primary-bright-white">
          <tr>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'USER ID'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 text-left">
              {'NAME'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 text-left">
              {'EMAIL'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3 text-left">
              {'ROLE'}
            </th>
            <th scope="col" className="sticky top-0 px-6 py-3">
              {'IS ADMIN'}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserMgmt;
