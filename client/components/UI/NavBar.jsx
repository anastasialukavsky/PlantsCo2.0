import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../../public/assets/search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import decoratedLine from '../../../public/assets/line.svg'

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
    if(expand) {
      setExpand(false)
    }
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    navigate('/products');
  };

  return (
    <header>
      <nav className="flex h-20  w-screen md:flex-col md:pt-2 items-center md:justify-around justify-between px-5 tracking-tighter relative text-green-gray  z-50">
        <div>
          <Link to={'/'}>
            <h1 className="font-tabac text-[8vw] mt-2 5xl:mt-16 6xl:mt-24 md:text-[3vw] 3xl:text-[2.4vw]">plants&co</h1>
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


          <ul className="flex gap-16 2xl:gap-28 6xl:gap-32 font-outfit md:text-[1.5vw] lg:text-[1.2vw] 4xl:text-[1vw]">
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
              <li>CART</li>
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
