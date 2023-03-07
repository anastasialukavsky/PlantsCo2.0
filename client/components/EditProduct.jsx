import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const EditProduct = () => {
  const dispatch = useDispatch();

  const updateProduct = () => {};
  const deleteProduct = () => {};

  return (
    <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.jpg')]">
      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className=" w-1/4 h-[calc(100vh_-_5rem)] transition-transform -translate-x-full sm:translate-x-0 flex flex-col gap-10"
          aria-label="Sidebar"
        >
          <div className="pt-5">
            <div className="bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
              <div className="">{'EDIT/DELETE PRODUCT'}</div>
            </div>
            <button className="text-left pl-5 pt-5 font-bold text-sm hover:text-primary-promo-banner py-1">
              <Link to={'/account/admin'}>Back</Link>
            </button>
          </div>
        </aside>

        {/* <div className="p-4 w-3/4  h-[calc(100vh_-_5rem)] overflow-auto">
          <div className="p-4 border-2 border-primary-button-hover border-dashed rounded-lg"> */}
        {/* <div className="flex flex-col h-[calc(100vh_-_10rem)] rounded bg-gray-50 dark:bg-gray-800 overflow-auto"> */}
        <section className="flex w-3/4 justify-center mt-5">
          <form className="w-5/6">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                  htmlFor="grid-first-qty"
                >
                  Quantity
                </label>
                <input
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-qty"
                  type="number"
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
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-price"
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.5"
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
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-description"
                  type="text"
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
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
              <button
                type="submit"
                className="hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-lg mx-auto block text-xl hover:transition-all mt-5"
              >
                Save
              </button>
              <button
                type="submit"
                className="text-red-600 py-2 rounded-lg mx-auto block text-sm hover:text-primary-promo-banner mt-5"
              >
                Delete
              </button>
            </div>
            <div className="flex justify-center"></div>
          </form>
        </section>
      </div>
    </div>
    //   </div>
    // </div>
    // </div>
  );
};

export default EditProduct;
