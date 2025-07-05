"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Aarush Bhola",
     videoUrl: "https://player.vimeo.com/video/1094277637?h=8949da3ad7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
  },
  {
    name: "Mannu Chaudhary",
    videoUrl: "https://player.vimeo.com/video/1094630781?h=323bf1c157&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
  },

 {
    name: "Aarush Bhola",
     videoUrl: "https://player.vimeo.com/video/1094277637?h=8949da3ad7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
  },
  {
    name: "Mannu Chaudhary",
    videoUrl: "https://player.vimeo.com/video/1094630781?h=323bf1c157&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
  },
  {
    name: "Aarush Bhola",
     videoUrl: "https://player.vimeo.com/video/1094277637?h=8949da3ad7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
  },
  {
    name: "Mannu Chaudhary",
    videoUrl: "https://player.vimeo.com/video/1094630781?h=323bf1c157&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
  },
];

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    // Prevent hydration mismatch
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-8 md:py-12 px-4 relative">
      <h2 className="text-4xl md:text-5xl font-light text-black mb-8 text-center">
      Real Transformation <span className="text-lime-500 font-bold">Testimonials</span>
      </h2>

      <div className="relative w-full ">
        {/* Left Arrow */}
        <button
          ref={prevRef}
          className=" md:flex absolute left-[-15px] top-1/2 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          ref={nextRef}
          className=" md:flex absolute right-[-15px] top-1/2 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{
            el: ".custom-swiper-pagination",
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={`${testimonial.videoUrl}?autoplay=1&muted=1&background=1&loop=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full rounded-xl"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`Video of ${testimonial.name}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots */}
        <div className="custom-swiper-pagination mt-6 flex justify-center gap-2" />
      </div>
    </div>
  );
}
