import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  adjustSearchBy,
  selectSearchBy,
} from '../../slices/product/productSlice';
import searchIcon from '../../../public/assets/search-icon.svg';

const MobileNav = ({ expand, setExpand }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector(selectSearchBy);

  const handleClick = () => {
    setExpand(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    handleClick();
    navigate('/products');
  };

  return (
    <div
      className="w-72 bg-gray-100 h-[calc(100vh-80px)] mt-20 absolute z-10 top-0 transition-all lg:hidden"
      style={{
        right: `${expand ? '0' : '-18rem'}`,
      }}
    >
      <ul className="text-2xl text-center flex flex-col basis-16 justify-center items-center">
        <div className="flex gap-1 stroke-green-900 border-b-2 w-5/6 mx-auto h-16 py-4">
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="magnifying glass" className="w-8 pt-1" />
          </button>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="succulent..."
              className="border-2 border-green-700 bg-gray-100 text-base h-8 rounded-full pl-3 w-full"
              value={searchTerm}
              onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
            />
          </form>
        </div>
        <div
          className="w-full hover:bg-slate-200 transition-all"
          onClick={handleClick}
        >
          <Link to="/account">
            <li className="border-b-2 w-5/6 mx-auto h-16 py-4">Account</li>
          </Link>
        </div>
        <div
          className="w-full hover:bg-slate-200 transition-all"
          onClick={handleClick}
        >
          <Link to="/products">
            <li className="border-b-2 w-5/6 mx-auto h-16 py-4">Shop</li>
          </Link>
        </div>
        <div
          className="w-full hover:bg-slate-200 transition-all"
          onClick={handleClick}
        >
          <Link to="/cart">
            <li className="border-b-2 w-5/6 mx-auto h-16 py-4">Cart</li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default MobileNav;
