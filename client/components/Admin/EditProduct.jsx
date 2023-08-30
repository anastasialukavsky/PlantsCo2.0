import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError as resetProductStatus,
  editSingleProduct,
  deleteSingleProduct,
} from '../../slices/product/productSlice';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../../slices/users/authSlice';
import toast, { Toaster } from 'react-hot-toast';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const singleProduct = useSelector(selectSingleProduct);
  const { auth, token } = useSelector(selectAuth);

  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));

    return () => {
      resetProductStatus();
      resetAuthStatus();
    };
  }, [productId]);

  useEffect(() => {
    setName(singleProduct.name || '');
    setDescription(singleProduct.description || '');
    setQty(singleProduct.qty || 0);
    setPrice(singleProduct.price || 0);
    setImageURL(singleProduct.imageURL || '');
  }, [singleProduct]);

  const updateProduct = (evt) => {
    evt.preventDefault();
    const updates = { name, qty, description, price, imageURL };
    dispatch(editSingleProduct({ productId, token, updates }));
    toast.success('Account info successfully changed');
    dispatch(fetchSingleProduct(productId));
  };

  const deleteProduct = async () => {
    await dispatch(deleteSingleProduct({ productId, token }));
    navigate('/account/admin/products');
  };

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
              <div className="mr-5 rounded-r-full bg-green-900 p-3 pl-5 text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/products'}>PRODUCTS/EDIT</Link>
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
            <div className="w-full justify-center pb-10">
              <p className="font-extrabold m-auto pb-5 text-center text-4xl text-primary-deep-green">
                {singleProduct.name}
              </p>
              <img
                src={imageURL}
                className="m-auto h-48 w-96 object-scale-down"
              />
            </div>
            <form className="pl-10 pr-10" onSubmit={updateProduct}>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    className="font-bold mb-2 block text-xs uppercase tracking-wide text-primary-deep-green"
                    htmlFor="grid-name"
                  >
                    Name
                  </label>
                  <input
                    className="bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight  text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-name"
                    type="text"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
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
                    className="bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-qty"
                    type="number"
                    min={0}
                    value={qty}
                    onChange={(evt) => setQty(evt.target.value)}
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
                    className="bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-price"
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    value={price}
                    onChange={(evt) => setPrice(evt.target.value)}
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
                    className="bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight  text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-description"
                    type="text"
                    rows="7"
                    value={description}
                    onChange={(evt) => setDescription(evt.target.value)}
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
                  Save
                </button>
              </div>
              <div className="flex justify-center"></div>
            </form>
            <button
              className="mt-5 block w-full rounded-lg py-2 text-sm text-red-600 hover:text-primary-promo-banner"
              onClick={deleteProduct}
            >
              Delete
            </button>
          </section>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EditProduct;
