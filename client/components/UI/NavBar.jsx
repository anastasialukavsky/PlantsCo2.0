import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../../public/assets/search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import triangle from '../../../public/assets/line.svg';

import { Toaster } from 'react-hot-toast';

import {
  selectSearchedItems,
  adjustSearchBy,
  selectSearchBy,
  adjustFilter,
} from '../../slices/product/productSlice';
import menu from '../../../public/assets/menu.svg';
import MobileNav from './MobileNav.jsx';
import CartLink from './CartLink.jsx';

import { fetchCart, selectCart } from '../../slices/users/cartSlice';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const { auth } = props;

  const searchedItems = useSelector(selectSearchedItems);
  const searchTerm = useSelector(selectSearchBy);
  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    navigate('/products');
  };

  return (
    <header>
      <Toaster
        position="top-right"
        toastOptions={{
          iconTheme: {
            primary: '#365314',
            secondary: '#a7bfb4',
          },
        }}
      />
      <nav className="relative z-50 flex h-20 w-screen flex-col items-center justify-around pt-2 tracking-tighter text-green-gray">
        <div>
          <Link to={'/'}>
            <h1 className="font-tabac text-5xl md:text-[3vw]">plants&co</h1>
          </Link>
        </div>

        <div className="hidden gap-10 md:flex">
          {/**
      <div className="flex gap-1 stroke-green-900">
      <button onClick={handleSearch}>
      <img src={searchIcon} alt="magnifying glass" className="w-6" />
      </button>
      <form onSubmit={handleSearch}>
      <input
      type="text"
      placeholder="succulent..."
      className="rounded-full border-2 border-green-700 pl-3"
      value={searchTerm}
      onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
      />
      </form>
      </div>
    */}

          <ul className="flex gap-10 font-outfit md:text-[1.9vw] lg:text-[1.3vw]">
            <Link to={`/products`}>
              <li onClick={() => dispatch(adjustFilter(''))}>SHOP</li>
            </Link>
            {auth.firstName ? (
              <Link to={'/account'}>
                <li>Hi, {auth.firstName} </li>
              </Link>
            ) : (
              <Link to={'/login'}>
                <li>LOGIN</li>
              </Link>
            )}
            <Link to="/cart">
              <CartLink cartQty={cart?.expandedCart?.length} />
              {/* <li>CART</li> */}
            </Link>
          </ul>
        </div>

        {/**decorated navbar border */}
        <div className="relative flex w-[90vw]">
          <img src={triangle} alt="" className="absolute w-full " />
        </div>

        <button
          className="z-30  md:hidden"
          onClick={() => setExpand((prev) => !prev)}
        >
          <img src={menu} alt="dropdown menu icon" className="w-10" />
        </button>
        <MobileNav expand={expand} setExpand={setExpand} />
      </nav>
    </header>
  );
};

export default NavBar;
