import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectPromos,
  resetStatus as resetPromoStatus,
  addPromo,
} from '../slices/product/promoSlice';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';

const AddNewPromo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector(selectAuth);
  const { promo } = useSelector(selectPromos);

  const [name, setName] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [status, setStatus] = useState('');

  const [invalidName, setInvalidName] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidStatus, setInvalidStatus] = useState(false);

  const invalidClass =
    'appearance-none block w-full bg-white-200 text-gray-700 border border-red-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500';

  const checkFormValidation = () => {
    if (!name) setInvalidName(true);
    if (discountRate > 1 || discountRate === '') setInvalidRate(true);
    if (status === '') setInvalidStatus(true);
  };
  const submitPromo = (evt) => {
    evt.preventDefault();
    checkFormValidation();
    const newPromo = { name, discountRate, status };
    dispatch(addPromo({ token, newPromo }));
  };

  useEffect(() => {
    if (promo.name === name) navigate('/account/admin/promos');

    return () => {
      dispatch(resetPromoStatus());
    };
  }, [promo]);

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
              <div className="bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
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
          <section className="flex flex-col w-full">
            <form className="pl-10 pr-10" onSubmit={submitPromo}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div
                  className={
                    invalidName || invalidRate || invalidStatus
                      ? 'text-red-500 text-xs'
                      : 'collapse text-xs'
                  }
                >
                  <p>Submission Failed!</p>
                  <p> Please complete all required fields</p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-name"
                  >
                    Name
                  </label>
                  <input
                    className={
                      invalidName
                        ? invalidClass
                        : 'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id="grid-name"
                    type="text"
                    value={name}
                    onChange={(evt) => {
                      setInvalidName(false);
                      setName(evt.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-first-qty"
                  >
                    PROMO RATE
                  </label>
                  <input
                    className={
                      invalidRate
                        ? invalidClass
                        : 'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id="grid-qty"
                    type="number"
                    min={0}
                    max={1}
                    step={0.01}
                    value={discountRate}
                    onChange={(evt) => {
                      setInvalidRate(false);
                      setDiscountRate(evt.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-price"
                  >
                    STATUS
                  </label>
                  <select
                    className={
                      invalidStatus
                        ? invalidClass
                        : 'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id="grid-price"
                    type="text"
                    value={status}
                    onChange={(evt) => {
                      setInvalidStatus(false);
                      setStatus(evt.target.value);
                    }}
                  >
                    <option value="" disabled>
                      <em>select status</em>
                    </option>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between">
                <button
                  type="submit"
                  className="hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-lg mx-auto block text-xl hover:transition-all mt-5"
                >
                  Add
                </button>
              </div>
              <div className="flex justify-center"></div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddNewPromo;
