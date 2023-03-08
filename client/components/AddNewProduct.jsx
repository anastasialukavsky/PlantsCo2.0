import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addProduct,
  resetStatusError as resetProductStatus,
  selectSingleProduct,
  selectStatus,
} from '../slices/product/productSlice';
import { selectAuth } from '../slices/users/authSlice';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(selectAuth);
  const singleProduct = useSelector(selectSingleProduct);
  const status = useSelector(selectStatus);

  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState(
    'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=1600'
  );

  const [invalidName, setInvalidName] = useState(false);
  const [invalidQty, setInvalidQty] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [navAway, setNavAway] = useState(false);
  const [attemptSubmission, setAttemptSubmission] = useState(false);

  const invalidClass =
    'appearance-none block w-full bg-white-200 text-gray-700 border border-red-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500';

  const checkFormValidation = () => {
    if (!name) setInvalidName(true);
    if (qty < 1) setInvalidQty(true);
    if (price === '') setInvalidPrice(true);
    if (!description) setInvalidDescription(true);

    if (!invalidName && !invalidQty && !invalidPrice && !invalidDescription) {
      setNavAway(true);
    }
  };

  const submitProduct = (evt) => {
    evt.preventDefault();
    checkFormValidation();
    const newProduct = { name, qty, description, price, imageURL };
    dispatch(addProduct({ token, newProduct }));
  };

  useEffect(() => {
    if (singleProduct.name === name) navigate('/account/admin');

    return () => {
      dispatch(resetProductStatus());
    };
  }, [singleProduct]);

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
                <button className="flex flex-row">
                  <Link to={'/account/admin/products'}>PRODUCTS</Link>
                </button>
              </div>
              <div className="bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="flex flex-row">
                  <Link to={'/account/admin/addproduct'}>ADD NEW PRODUCT</Link>
                </button>
              </div>
              <div className="hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
                <button className="text-left">
                  <Link to={'/account/admin/promos'}>PROMOCODES</Link>
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
            <form className="w-full pl-10 pr-10" onSubmit={submitProduct}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div
                  className={
                    invalidName ||
                    invalidQty ||
                    invalidPrice ||
                    invalidDescription
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
                    Quantity In Stock
                  </label>
                  <input
                    className={
                      invalidQty
                        ? invalidClass
                        : 'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id="grid-qty"
                    type="number"
                    min={1}
                    placeholder="0"
                    value={qty}
                    onChange={(evt) => {
                      setInvalidQty(false);
                      setQty(evt.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-price"
                  >
                    Price
                  </label>
                  <input
                    className={
                      invalidPrice
                        ? invalidClass
                        : 'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id="grid-price"
                    type="number"
                    placeholder={0.0}
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    value={price}
                    onChange={(evt) => {
                      setInvalidPrice(false);
                      setPrice(evt.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-description"
                  >
                    Description
                  </label>
                  <textarea
                    className={
                      invalidDescription
                        ? invalidClass
                        : 'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id="grid-description"
                    type="text"
                    rows="7"
                    value={description}
                    onChange={(evt) => {
                      setInvalidDescription(false);
                      setDescription(evt.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="imageURL"
                  >
                    Upload image
                  </label>
                  <input
                    className="appearance-none block w-full text-md text-gray-700 border border-gray-200 rounded cursor-pointer bg-primary-bright-white"
                    id="imageURL"
                    type="file"
                    onChange={(evt) => setImageURL(evt.target.value)}
                  />
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

export default AddNewProduct;
