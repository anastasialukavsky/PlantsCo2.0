import React from 'react';
// import samplePlant from '../../public/assets/samplePlant.png';

const SingleProduct = () => {
  return (
    <main className="font-serif flex h-screen">
      <section className="flex gap-20 justify-center items-center">
        <div className="grid grid-cols-[1fr 1fr] grid-rows-[1fr 1fr 1fr] w-112 h-96 justify-center gap-3 items-center">
          <img
            className="h-28"
            src="assets/samplePlant.png"
            alt="error showing photo"
          />
          <img
            className="h-28"
            src="assets/samplePlant.png"
            alt="error showing photo"
          />
          <img
            className="h-28"
            src="assets/samplePlant.png"
            alt="error showing photo"
          />
          <img
            className="h-96  row-start-1 row-end-4 col-start-2"
            src="assets/samplePlant.png"
            alt="error showing photo"
          />
        </div>
        <div className="w-1/3">
          <h1 className="text-center text-green-900 text-5xl mb-20">
            ECHINEVERIA CHROMA
          </h1>
          <div className="flex justify-between">
            <p>Easy care, low water, outdoor</p>
            <p>❤️</p>
          </div>
          <p>$39</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            nesciunt dolores qui velit voluptatibus! Illo sed quidem similique
            aspernatur nemo pariatur ipsum, dolore veniam provident, eos
            adipisci error cumque cupiditate deserunt necessitatibus excepturi
            porro mollitia dicta autem officiis modi, nulla vero dignissimos.
            Neque error doloremque ipsum officiis officia, dolor et.
          </p>
          <button className="w-4/5 bg-green-900 text-white py-3 rounded mx-auto block">
            ADD TO CART
          </button>
        </div>
      </section>
    </main>
  );
};

export default SingleProduct;
