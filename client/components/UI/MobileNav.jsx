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
      className="absolute top-0 left-0 z-50 h-screen  w-screen bg-[#344e41] font-gloock  text-white  transition-all md:hidden"
      style={{
        right: `${expand ? '0' : '-18rem'}`,
      }}
    >
      <ul className="flex  flex-col  pt-[50%] text-[6vw]">
        <div
          className="w-full text-center transition-all"
          onClick={handleClick}
        >
          {localStorage.getItem('token') ? (
            <Link to="/account">
              <li className="mx-auto max-h-16 w-full border-b pb-1 ">
                <span className="self-start pr-2 text-[2vw]">01</span>ACCOUNT
              </li>
            </Link>
          ) : (
            <Link to="/login">
              <li className=" mx-auto max-h-16 w-3/6 border-b  pb-1">
                <span className="self-start pr-2 text-[2vw]">01</span>LOGIN
              </li>
            </Link>
          )}
        </div>
        <div
          className="w-full text-center transition-all "
          onClick={handleClick}
        >
          <Link to="/products">
            <li className="mx-auto max-h-16 w-full border-b pb-1 pt-2">
              <span className="self-start pr-2 text-[2vw]">02</span>SHOP
            </li>
          </Link>
        </div>
        <div
          className="w-full text-center transition-all"
          onClick={handleClick}
        >
          <Link to="/cart">
            <li className="mx-auto max-h-16 w-full border-b pb-1 pt-2">
              <span className="self-start pr-2 text-[2vw]">03</span> CART
            </li>
          </Link>
        </div>
      </ul>

      {/**search section */}
      <div className="mx-auto flex h-16 w-5/6 gap-2 py-10">
        <button onClick={handleSearch}>
          <img src={searchIcon} alt="magnifying glass" className="w-8 pt-1" />
        </button>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="succulent..."
            className="h-8 w-full rounded-full  bg-gray-100 pl-3 text-base placeholder:text-[3.5vw] input:text-black"
            value={searchTerm}
            onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
          />
        </form>
      </div>
    </div>
  );
};

export default MobileNav;
