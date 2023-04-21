import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-[calc(100vh_-_5rem)]  w-screen  bg-[url('/assets/bg_img/not_found_page1.jpg')] bg-cover bg-no-repeat">
      <div className="font-extrabold absolute flex w-screen flex-col content-center items-center justify-center pt-48 text-[3.5rem] tracking-wide  text-primary-bright-white">
        <p className="font-semibold">404</p>
        <p>Page not found</p>
      </div>
      <div className="w-screen flex-col content-center items-center justify-center pt-96 text-center text-xl tracking-wide  text-primary-bright-white">
        <p className="font-light">
          Take me back{' '}
          <Link to={'/'} className="font-semibold">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
