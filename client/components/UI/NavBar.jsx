import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../../public/assets/search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchedItems,
  adjustSearchBy,
  selectSearchBy,
  adjustFilter,
} from '../../slices/product/productSlice';
import menu from '../../../public/assets/menu.svg';
import MobileNav from './MobileNav.jsx';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const { auth } = props;

  const searchedItems = useSelector(selectSearchedItems);
  const searchTerm = useSelector(selectSearchBy);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    navigate('/products');
  };

  return (
    <header>
      <nav className="border-b-2 border-green-900 flex justify-between font-serif h-20 items-center tracking-tighter text-green-900 px-5">
        <div>
          <Link to={'/'}>
            <h1 className="text-green-900 text-3xl xs:text-5xl font-bold">
              Plants&Co
            </h1>
          </Link>
        </div>
        <div className="hidden lg:flex gap-10">
          <div className="flex gap-1 stroke-green-900">
            <button onClick={handleSearch}>
              <img src={searchIcon} alt="magnifying glass" className="w-6" />
            </button>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="succulent..."
                className="border-2 border-green-700 rounded-full pl-3"
                value={searchTerm}
                onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
              />
            </form>
          </div>
          <ul className="flex text-2xl gap-10">
            <Link to={`/products`}>
              <li onClick={() => dispatch(adjustFilter(''))}>Shop</li>
            </Link>
            {auth.firstName ? (
              <Link to={'/account'}>
                <li>Hi, {auth.firstName} </li>
              </Link>
            ) : (
              <Link to={'/login'}>
                <li>Login</li>
              </Link>
            )}
            <Link to="/cart">
              <li>Cart</li>
            </Link>
          </ul>
        </div>
        <button
          className="lg:hidden  z-30"
          onClick={() => setExpand((prev) => !prev)}
        >
          <img src={menu} alt="dropdown menu icon" className=" w-10" />
        </button>
        <MobileNav expand={expand} setExpand={setExpand} />
      </nav>
    </header>
  );
};

export default NavBar;
