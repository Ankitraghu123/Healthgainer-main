"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchAllImages } from "@/redux/slices/header-slice/imageSlice";
import { useSelector } from "react-redux";

// Desktop slider images
// const desktopSlides = [
//   { image: "Slider/ready.jpg" },
//   { image: "Slider/ingredient1.jpg" },
//   { image: "Slider/How to use 2 (2).jpg" },
// ];

// // Mobile slider images
// const mobileSlides = [
//   { image: "Slider/mobile0.jpg" },
//   { image: "Slider/mobile1.jpg" },
//   { image: "Slider/mobile2.jpg" },
//   { image: "Slider/mobile3.jpg" },
// ];

function Slider({ slides }) {
  const scrollContainerRef = useRef(null);
  const scrollIndex = useRef(0);
  const totalSlides = slides.length;

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollIndex.current = (scrollIndex.current + 1) % totalSlides;

      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.clientWidth * scrollIndex.current,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollIndex.current =
        (scrollIndex.current - 1 + totalSlides) % totalSlides;

      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.clientWidth * scrollIndex.current,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (totalSlides === 0) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [totalSlides]); // 👈 Dependency added here

  return (
    <div className='relative w-full overflow-hidden'>
      <div
        ref={scrollContainerRef}
        className='flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory'
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
      >
        {slides.map((slide, index) => (
          <section
            key={index}
            className='flex-shrink-0 w-[100vw] flex items-center justify-center bg-black'
          >
            <div
              className='flex-1 flex justify-center items-center'
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
            >
              <motion.img
                key={slide.image}
                style={{ width: "100vw" }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className='w-auto object-contain rounded-xl shadow-xl'
              />
            </div>
          </section>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 p-2 rounded-full z-20 hover:bg-white transition'
      >
        <ChevronLeft className='w-6 h-6 text-black' />
      </button>
      <button
        onClick={scrollNext}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 p-2 rounded-full z-20 hover:bg-white transition'
      >
        <ChevronRight className='w-6 h-6 text-black' />
      </button>
    </div>
  );
}

export default function HeroSection() {
  const { images } = useSelector((state) => state?.headerSlider || {});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllImages());
  }, []);
  // Separate desktop and mobile images
  const desktopSlides =
    images
      ?.filter((img) => img.type === "desktop")
      ?.sort((a, b) => a.sno - b.sno)
      ?.map((img) => ({
        image: img.url,
      })) || [];

  const mobileSlides =
    images
      ?.filter((img) => img.type === "mobile")
      ?.sort((a, b) => a.sno - b.sno)
      ?.map((img) => ({
        image: img.url,
      })) || [];

  return (
    <>
      {/* Desktop Slider - shown on md and larger screens */}
      {desktopSlides.length > 0 && (
        <div className='hidden md:block'>
          <Slider slides={desktopSlides} />
        </div>
      )}

      {mobileSlides.length > 0 && (
        <div className='block md:hidden'>
          <Slider slides={mobileSlides} />
        </div>
      )}
    </>
  );
}
