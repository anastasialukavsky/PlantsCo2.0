import React from 'react';

export default function Homepage() {
  return (
    <div class="bg-[url('/assets/bg_img/homepage13.jpg')] h-[calc(100vh_-_5rem)] w-screen bg-no-repeat bg-right bg-cover ">
      <div class="absolute flex-col text-[3.5rem] top-96 left-48 tracking-wide">
        <p class="leading-none">Your perfect plant,</p>
        <p class="">one click away</p>
      </div>
      <div class="flex absolute top-[35rem] text-2xl left-48">
        <p>Transform and beautify your space. No green thumb needed</p>
      </div>
    </div>
  );
}
