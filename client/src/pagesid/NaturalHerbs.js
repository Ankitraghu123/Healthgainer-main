'use client';

import React from 'react';
import CountUp from 'react-countup';

export default function NaturalHerbs() {
  return (
    <section className="bg-white mb-1 border-gray-300 shadow-lg w-full overflow-hidden">
      <div className="text-center">
        <h2 className="text-4xl px-4 md:text-5xl font-light bg-[#090A0C] py-2 text-gray-200">
          Ingredients Of{" "}
          <span className="text-lime-500 font-bold">Health Gainer</span>
        </h2>
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block">
        <img className="w-full" src="/best/Ingrediant 1380.700.jpg" alt="Desktop Ingredients" />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden">
        <img className="w-full" src="/best/Ingrediant 1380.700.jpg" alt="Mobile Ingredients" />
      </div>
    </section>
  );
}
