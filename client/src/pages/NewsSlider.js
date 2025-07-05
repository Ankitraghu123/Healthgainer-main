"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { fetchNews } from "@/redux/slices/news-slice/index";
import "swiper/css";
import "swiper/css/pagination";

const NewsSlider = () => {
  const dispatch = useDispatch();
  const { news, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <section className="py-8 h-full bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl px-4 md:text-5xl font-bold py-2 text-black">
            NEWS
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={40}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 5 },
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            centeredSlides={true}
            grabCursor={true}
          >
            {news.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <div className="relative h-20 w-full mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.label || "news-logo"}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewsSlider;
