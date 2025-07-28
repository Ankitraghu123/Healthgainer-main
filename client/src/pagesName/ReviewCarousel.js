// "use client";

// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchVideos } from "@/redux/slices/video-carousel-slice/index";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { Loader2 } from "lucide-react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function Testimonials() {
//   const dispatch = useDispatch();
//   const { videos, loading } = useSelector((state) => state.videos);

//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchVideos());
//   }, [dispatch]);

//   return (
//     <div className="w-full flex flex-col items-center py-8 md:py-12 px-4 relative">
//       <h2 className="text-4xl md:text-5xl font-light text-black mb-8 text-center">
//         Real Transformation <span className="text-lime-500 font-bold">Testimonials</span>
//       </h2>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
//         </div>
//       ) : (
//         <div className="relative w-full">
//           {/* Left Arrow */}
//           <button
//             ref={prevRef}
//             className="md:flex absolute left-[-15px] top-1/2 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
//           >
//             <FaArrowLeft className="w-5 h-5" />
//           </button>

//           {/* Right Arrow */}
//           <button
//             ref={nextRef}
//             className="md:flex absolute right-[-15px] top-1/2 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
//           >
//             <FaArrowRight className="w-5 h-5" />
//           </button>

//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             slidesPerView={1}
//             spaceBetween={20}
//             loop={true}
//             autoplay={{ delay: 5000 }}
//             pagination={{
//               el: ".custom-swiper-pagination",
//               clickable: true,
//             }}
//             navigation={{
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             }}
//             onInit={(swiper) => {
//               swiper.params.navigation.prevEl = prevRef.current;
//               swiper.params.navigation.nextEl = nextRef.current;
//               swiper.navigation.init();
//               swiper.navigation.update();
//             }}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//               1280: { slidesPerView: 5 },
//             }}
//           >
//             {videos.map((video, index) => (
//               <SwiperSlide key={index}>
//                 <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
//                   <iframe
//                     src={`${video.videoUrl}?autoplay=1&muted=1&background=1&loop=1&title=0&byline=0&portrait=0`}
//                     className="w-full h-full rounded-xl"
//                     frameBorder="0"
//                     allow="autoplay; fullscreen; picture-in-picture"
//                     allowFullScreen
//                     title={`Video of ${video.name}`}
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Pagination Dots */}
//           <div className="custom-swiper-pagination mt-6 flex justify-center gap-2" />
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "@/redux/slices/video-carousel-slice/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Loader2 } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Convert YouTube Shorts, watch, share, Vimeo URLs to proper embed format WITHOUT autoplay
function toEmbed(url = "") {
  const YT_SHORTS = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/i;
  const YT_WATCH = /youtube\.com\/watch\?v=([^&]+)/i;
  const YT_SHARE = /youtu\.be\/([a-zA-Z0-9_-]{6,})/i;
  const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/i;

  let id = null;

  if (YT_SHORTS.test(url)) {
    id = url.match(YT_SHORTS)?.[1] ?? null;
    if (id) {
      return {
        provider: "youtube",
        id,
        src: `https://www.youtube.com/embed/${id}?controls=1&modestbranding=1&rel=0&playsinline=1`,
      };
    }
  }

  if (YT_WATCH.test(url)) {
    id = url.match(YT_WATCH)?.[1] ?? null;
    if (id) {
      return {
        provider: "youtube",
        id,
        src: `https://www.youtube.com/embed/${id}?controls=1&modestbranding=1&rel=0&playsinline=1`,
      };
    }
  }

  if (YT_SHARE.test(url)) {
    id = url.match(YT_SHARE)?.[1] ?? null;
    if (id) {
      return {
        provider: "youtube",
        id,
        src: `https://www.youtube.com/embed/${id}?controls=1&modestbranding=1&rel=0&playsinline=1`,
      };
    }
  }

  if (VIMEO.test(url)) {
    id = url.match(VIMEO)?.[1] ?? null;
    if (id) {
      return {
        provider: "vimeo",
        id,
        src: `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`,
      };
    }
  }

  return { provider: "unknown", id: null, src: url };
}

export default function Testimonials() {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col items-center py-8 md:py-20 px-4 relative">
      <h2 className="text-4xl md:text-5xl font-light text-black mb-8 text-center">
        Real Transformation <span className="text-lime-500 font-bold">Testimonials</span>
      </h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="relative w-full">
          {/* Arrows */}
          <button
            aria-label="Previous"
            ref={prevRef}
            className="hidden md:flex absolute left-[-15px] top-1/2 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>

          <button
            aria-label="Next"
            ref={nextRef}
            className="hidden md:flex absolute right-[-15px] top-1/2 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <FaArrowRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
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
            {videos.map((video, index) => {
              const { src } = toEmbed(video.videoUrl);
              return (
                <SwiperSlide key={index}>
                  <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      id={`player-${index}`}
                      src={src}
                      className="w-full h-full rounded-xl"
                      frameBorder="0"
                      allow="fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Video of ${video.name || `video-${index}`}`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="custom-swiper-pagination mt-6 flex justify-center gap-2" />
        </div>
      )}
    </div>
  );
}
