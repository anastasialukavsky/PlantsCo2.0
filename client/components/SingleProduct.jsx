import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './UI/NavBar.jsx';
import PromoBanner from './UI/PromoBanner.jsx';
import box from '../../public/assets/box.svg';
// import samplePlant from '../public/assets/samplePlant.png';

const SingleProduct = () => {
  return (
    <>
      <NavBar />
      <PromoBanner />
      <main className="font-serif flex h-[80vh] ">
        <section className="flex gap-20 justify-center mt-16 ">
          <div className="">
            <img
              className="h-5/6"
              src="/assets/product_img/plant1.png"
              alt="error showing photo"
            />
          </div>
          <div className="w-1/3">
            <header className="text-center text-green-900 text-3xl mb-16">
              ECHINEVERIA CHROMA
            </header>
            <div className="flex justify-between border-b-4 pb-2 mb-4">
              <p>Easy care, low water, outdoor</p>
              <p className="text-2xl">❤️</p>
            </div>
            <p className="text-primary-deep-green text-3xl font-bold mb-4">
              $39
            </p>
            <p className="mb-8 leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              nesciunt dolores qui velit voluptatibus! Illo sed quidem similique
              aspernatur nemo pariatur ipsum, dolore veniam provident, eos
              adipisci error cumque cupiditate deserunt necessitatibus
              excepturi.
            </p>
            <div className="border-b-4 pb-4 mb-3">
              <button className="w-full bg-primary-deep-green text-white py-3 rounded-2xl mx-auto block text-xl">
                ADD TO CART
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <img src={box} alt="shipping box icon" className="w-6" />
              <p className="text-sm">Free shipping in the USA</p>
            </div>
          </div>
        </section>
      </main>
      <section className="w-4/5 mx-auto mb-12">
        <h2 className="text-2xl">You might also like</h2>
      </section>
    </>
  );
};

export default SingleProduct;
