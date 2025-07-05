"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    title: "Our Best Supplement",
    description:
      "Health gainer supports heart health by providing essential nutrients, proteins, and healthy fats that help maintain a balanced metabolism. While it primarily aids in weight gain and energy levels, proper use with exercise and a balanced diet may contribute to improved circulation and a stable heart rate for overall well-being. Pharma Science Health gainer is a miraculous Ayurvedic product, curated to fuel your body with the power of exclusive, precious, and rare herbs. It is a Trademark, GMP,  ISO certified Ayurvedic product promoting health and perfect body functioning in a natural way. Fortified with only natural herbs, this product strengthens your body systems and improves your immunity, without using health-hazardous steroids or artificial proteins. ",
    image: "/best/Layer 1.png",
    thumbnails: ["/best/Layer 1.png", "/best/Layer 2.png", "/best/Layer 3.png"],
  },
  {
    title: "Our Best Supplement",
    description:
      "Body gainer boosts muscle strength by delivering high-quality proteins and amino acids. It supports faster recovery after intense workouts and helps with lean mass development. Designed for those seeking bulk and strength, it complements resistance training and calorie-dense meals. Gaining weight can be equally challenging  as weight loss. Though good nutrition and proper exercise are must for weight gain, Nutrition supplements powder like Body Gainer play a key role in achieving the perfect body mass. Curated of miraculous Ayurvedic herbs the mass gainer supplement,  Body gainer increases weight in a  natural and safe manner. it Improves metabolism, increases appetite and strengthen digestive system for better absorption of nutrients, which subsequently leads to proper weight gain. ",
    image: "/best/Layer 2.png",
    thumbnails: ["/best/Layer 2.png", "/best/Layer 1.png", " /best/Layer 3.png"],
  },
  {
    title: "Our Best Supplement",
    description:
      "Body booster enhances overall vitality by providing a rich blend of vitamins, minerals, and antioxidants. It helps fortify the immune system, support cellular repair, and combat fatigue. Ideal for daily use to maintain stamina, focus, and wellness. Sportspersons involved in sports like weightlifting, body building, athletics or mixed martial arts require perfect muscle mass and least fat gain. Body booster is a phenomenal Ayurvedic body booster supplement That helps in Muscle mass gain and weight gain, while shrinking percentage of excessive  body fat. Constituted of pure and exclusive herbs, this supplement increases stamina, improve athletic performance and provides essential vitamins, calcium and haemoglobin. ",
    image: "/best/Layer 3.png",
    thumbnails: ["/best/Layer 3.png", "/best/Layer 2.png", "/best/Layer 1.png"],
  },
];

export default function ProductSlider() {
  const swiperRef = useRef(null);

  return (
    <section className="bg-white pt-4  md:pb-10 px-4 md:px-12 font-sans relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}

        spaceBetween={50}
        slidesPerView={1}
        className="group"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            {/* <div id="radius" className="mb-12">
            <h2  className="text-3xl md:text-4xl font-bold text-lime-600  border-b-2 border-lime-600 inline-block">
      Our <span className="font-extrabold">Best Supplement</span>
    </h2>


            </div> */}

             <div id="radius"  className="mb-12 text-center">
        <h2 className="text-4xl px-4 md:text-5xl font-light  py-2 text-black">
            Our Best{" "}
          <span className="text-lime-500 font-bold"> Supplement</span>
        </h2>
      </div>


            <div className="flex flex-col md:flex-row items-center mt-2 justify-between gap-8">
              <div className="   w-full md:w-1/2 ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-col">
  {/* Text Section (shown below on mobile, above on desktop) */}
  <div>

      <div   className=" mb-5">
        <h2 className="new-radius text-2xl  md:text-5xl font-light  py-2 text-black">
            Our Best{" "}
          <span className="text-lime-500 font-bold"> Supplement</span>
        </h2>
      </div>

    {/* <h2 className="new-radius text-3xl md:text-4xl font-bold text-lime-600 mb-2 border-b-2 border-lime-600 inline-block">
      Our <span className="font-extrabold">Best Supplement</span>
    </h2> */}
    <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-2">
      {product.description}
    </p>
  </div>

  {/* Thumbnails Section (shown above on mobile, below on desktop) */}
  <div className="flex flex-wrap gap-1 md:gap-4 mb-4">
    {product.thumbnails.map((thumb, i) => (
      <button
        key={i}
        onClick={() => swiperRef.current?.slideTo(i)}
        className="w-28 h-28 md:w-32 md:h-32 bg-black rounded-lg hover:scale-105 transition-transform duration-300"
      >
        <img
          src={thumb}
          alt="product thumbnail"
          className="w-full h-full object-contain"
        />
      </button>
    ))}
  </div>
</div>

            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        {/* <button className="swiper-button-prev-custom absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full hover:bg-lime-600 transition-all duration-300">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-custom absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full hover:bg-lime-600 transition-all duration-300">
          <ChevronRight size={24} />
        </button> */}
      </Swiper>
    </section>
  );
}
