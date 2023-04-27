import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addProduct,
  resetStatusError as resetProductStatus,
  selectSingleProduct,
} from '../slices/product/productSlice';
import { selectAuth } from '../slices/users/authSlice';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(selectAuth);
  const singleProduct = useSelector(selectSingleProduct);

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

  const invalidClass =
    'appearance-none block w-full bg-white-200 text-gray-700 border border-red-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500';

  const checkFormValidation = () => {
    if (!name) setInvalidName(true);
    if (qty < 1) setInvalidQty(true);
    if (price === '') setInvalidPrice(true);
    if (!description) setInvalidDescription(true);
  };

  const submitProduct = (evt) => {
    evt.preventDefault();
    checkFormValidation();
    const newProduct = { name, qty, description, price, imageURL };
    dispatch(addProduct({ token, newProduct }));
  };

  useEffect(() => {
    if (singleProduct.name === name) navigate('/account/admin/products');

    return () => {
      dispatch(resetProductStatus());
    };
  }, [singleProduct]);

  return (
    <div className="h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.jpg')] bg-cover bg-center">
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
              <div className="mr-5 rounded-r-full bg-green-900 p-3 pl-5 text-primary-bright-white">
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
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
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
          <section className="flex w-full flex-col">
            <form className="w-full pl-10 pr-10" onSubmit={submitProduct}>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div
                  className={
                    invalidName ||
                    invalidQty ||
                    invalidPrice ||
                    invalidDescription
                      ? 'text-xs text-red-500'
                      : 'collapse text-xs'
                  }
                >
                  <p>Submission Failed!</p>
                  <p> Please complete all required fields</p>
                </div>
                <div className="w-full px-3">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-name"
                  >
                    Name
                  </label>
                  <input
                    className={
                      invalidName
                        ? invalidClass
                        : 'bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight  text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
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
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-first-qty"
                  >
                    Quantity In Stock
                  </label>
                  <input
                    className={
                      invalidQty
                        ? invalidClass
                        : 'bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
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
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-price"
                  >
                    Price
                  </label>
                  <input
                    className={
                      invalidPrice
                        ? invalidClass
                        : 'bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
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
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-description"
                  >
                    Description
                  </label>
                  <textarea
                    className={
                      invalidDescription
                        ? invalidClass
                        : 'bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
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
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="imageURL"
                  >
                    Upload image
                  </label>
                  <input
                    className="text-md block w-full cursor-pointer appearance-none rounded border border-gray-200 bg-primary-bright-white text-gray-700"
                    id="imageURL"
                    type="file"
                    onChange={(evt) => setImageURL(evt.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-between">
                <button
                  type="submit"
                  className="mx-auto mt-5 block w-full rounded-lg bg-primary-deep-green py-2 text-xl text-white hover:bg-primary-button-hover hover:transition-all"
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
