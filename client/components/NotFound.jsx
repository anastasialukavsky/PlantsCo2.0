import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {


  return (
    <div className="bg-[url('/assets/bg_img/not_found_page1.jpg')]  w-screen  h-[calc(100vh_-_5rem)] bg-no-repeat bg-cover">
      <div className="absolute flex flex-col w-screen pt-48 items-center content-center justify-center font-extrabold text-primary-bright-white text-[3.5rem]  tracking-wide">
        <p className="font-semibold">404</p>
        <p>Page not found</p>
      </div>
      <div className="flex-col text-center w-screen pt-96 items-center content-center justify-center text-primary-bright-white text-xl  tracking-wide">
        <p className="font-light">Take me back <Link to={'/'} className="font-semibold">
        Home
      </Link></p>

      </div>
    </div>
  );
}
