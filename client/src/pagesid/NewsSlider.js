"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const newsLogos = [
  {
    src: "/News/Hindustan times.jpg",
    alt: "Hindustan Times",
    link: "https://www.hindustantimes.com/",
    featuredText: "Featured in Hindustan Times",
  },
  {
    src: "/News/The Readers Time.jpg",
    alt: "The Readers Time",
    link: "https://www.thereaderstime.in/",
  },
  {
    src: "/News/Zee news Mp Cg.jpg",
    alt: "Zee News MP/CG",
    link: "https://zeenews.india.com/",
    featuredText: "Reported in Zee News",
  },
  {
    src: "/News/News 18.jpg",
    alt: "News 18",
    link: "https://www.news18.com/",
    featuredText: "Featured in News 18",
  },
  {
    src: "/News/News 24.jpg",
    alt: "News 24",
    link: "https://newsindia24x7.co.in/pharma-science%ef%b8%8f-granted-patent-for-its-ayurvedic-piles-treatment-anti-piles-complete-resolution/",
    featuredText: "Mentioned in News 24",
  },
  {
    src: "/News/PTI.jpg",
    alt: "PTI",
    link: "https://www.ptinews.com/press-release/pharma-sciencetm-revolutionizes-ayurveda-with-patented-treatments-and-zero-investment-business-model/2534058",
  },
  {
    src: "/News/The Week.jpg",
    alt: "The Week",
    link: "https://www.theweek.in/",
  },
  {
    src: "/News/CEO.jpg",
    alt: "CEO Magazine",
    link: "https://www.theceo.in/press-release/pharma-science-granted-patent-for-its-ayurvedic-piles-treatment-anti-piles-complete-resolution",
  },
  {
    src: "/News/IANS.jpg",
    alt: "IANS",
    link: "https://www.ians.in/vmpl/pharma-sciencetm-revolutionizes-ayurveda-with-patented-treatments-and-zero-investment-business-model",
  },
  {
    src: "/News/Google.jpg",
    alt: "Google News",
    link: "https://news.google.com/search?q=Pharma+Science+Granted+Patent+for+Its+Ayurvedic+Piles+Treatment+Anti+Piles+Complete+Resolution+&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    src: "/News/Sangri.jpg",
    alt: "Sangri Today",
    link: "https://en.sangritimes.com/pharma-science%EF%B8%8F-granted-patent-for-its-ayurvedic-piles-treatment-anti-piles-complete-resolution",
  },
];

const NewsSlider = () => {
  return (
    <section className="py-8 h-full bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
           <h2 className="text-4xl px-4 md:text-5xl font-bold  py-2 text-black">
            NEWS{" "}
          {/* <span className="text-lime-500 font-bold"> Supplement</span> */}
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
            {newsLogos.map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <a
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <div className="relative h-20 w-full mb-4">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </a>
                  {/* <p className="text-sm text-gray-500 text-center mt-auto">
                    {logo.featuredText}
                  </p> */}
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
