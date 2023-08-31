import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../../public/assets/search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import decoratedLine from '../../../public/assets/line.svg'
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
    if(expand) {
      setExpand(false)
    }
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    navigate('/products');
  };

  return (
    <header>
      <nav className="flex h-20 md:h-16 lg:h-[82px] xl:h-[100px] 2xl:h-[105px] 5xl:h-[159px] 6xl:h-[200px] w-screen md:flex-col  items-center md:justify-around justify-between px-5 tracking-tighter relative text-green-gray  z-50 ">

            <Toaster
        position="top-right"
        toastOptions={{
          iconTheme: {
            primary: '#365314',
            secondary: '#a7bfb4',
          },
        }}
      />

      
        <div>
          <Link to={'/'}>
            <h1 className="font-tabac text-[8vw] mt-2 md:mt-3 lg:mt-4 xl:mt-5 2xl:mt-6 4xl:mt-5 5xl:mt-10  md:text-[1.6rem] xl:text-[2.2rem] 5xl:text-[2.5rem] 6xl:text-[3.1rem] leading-none">plants&co</h1>
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


          <ul className="flex gap-16 xl:gap-20 2xl:gap-28 6xl:gap-40 font-outfit md:text-[.7rem] lg:text-[1.2vw] 4xl:text-[1.3rem] 5xl:text-[1.6rem] ">
            <Link to={`/products`}>
              <li onClick={() => dispatch(adjustFilter(''))}>SHOP</li>
            </Link>
            {auth.firstName ? (
              <Link to={'/account'} className='uppercase'>
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
        <div className="relative md:flex w-[90vw] hidden">
          <img src={decoratedLine} alt="" className="absolute w-full " />
        </div>

        {/**hamburger menu */}
        
        <button
        className="z-30  md:hidden"
        onClick={() => {
          setExpand((prev) => !prev)}
        }
        >
        <img src={menu} alt="dropdown menu icon" className=" w-12" />
        </button>
        
        {expand &&
          <MobileNav expand={expand} setExpand={setExpand} />
        }
     
      </nav>
    </header>
  );
};

export default NavBar;
