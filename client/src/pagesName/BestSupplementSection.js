// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSupplements } from "@/redux/slices/supplement-slice/index";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, A11y } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Loader2 } from "lucide-react";

// export default function ProductSlider() {
//   const dispatch = useDispatch();
//   const { supplements, loading } = useSelector((state) => state.supplements);
//   const [activeIndex,setActiveIndex]= useState(0)

//   const swiperRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchSupplements());
//   }, [dispatch]);

//   const getSlideIndexByImage = (img) =>
//     supplements.findIndex((p) => p.image.trim() === img.trim());

//   if (loading) {
//     return (
//       <div className="flex justify-center py-10">
//         <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
//       </div>
//     );
//   }

//   return (
//     <section className="bg-white pt-4 md:pb-10 px-4 md:px-12 font-sans relative">
//       <Swiper
//         modules={[Navigation, Pagination, A11y]}
//         navigation={{
//           nextEl: ".swiper-button-next-custom",
//           prevEl: ".swiper-button-prev-custom",
//         }}
//         spaceBetween={50}
//         slidesPerView={1}
//         className="group"
//         onSwiper={(swiper) => {
//           swiperRef.current = swiper;
//         }}
//       >
//         {supplements
//         .map((product, index) => (
//           <SwiperSlide key={index}>
//             <div id="radius" className="mb-12 text-center">
//               <h2 className="text-4xl px-4 md:text-5xl font-light py-2 text-black">
//                 Our Best <span className="text-lime-500 font-bold">Supplement</span>
//               </h2>
//             </div>

//             <div className="flex flex-col md:flex-row items-center mt-2 justify-between gap-8">
//               <div className="w-full md:w-1/2">
//                 <img
//                   src={product.iconUrl}
//                   alt={product.title}
//                   className="w-full h-auto object-contain rounded-xl"
//                 />
//               </div>

//               <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-col">
//                 <div>
//                   <div className="mb-5">
//                     <h2 className="new-radius text-2xl md:text-5xl font-light py-2 text-black">
//                       {/* {product.title || "Our Best"}{" "} */}
//                       {"Our Best"}{" "}
//                       <span className="text-lime-500 font-bold">Supplement</span>
//                     </h2>
//                   </div>
//                   <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-2">
//                     {product.description}
//                   </p>
//                 </div>

//                 {/* Thumbnails */}
//                 <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
//   {supplements.map((thumbProduct, i) => (
//     <button
//       key={i}
//       onClick={() => {
//         swiperRef.current?.slideTo(i);
//         setActiveIndex(i); // manual update when clicking
//       }}
//       className={`w-28 h-28 md:w-32 md:h-32 rounded-lg transition-transform duration-300 overflow-hidden
//         ${i === activeIndex ? "scale-105" : "hover:scale-105 border-rose-600 bg-black"}`}
//     >
//       <img
//         src={thumbProduct.iconUrl}
//         alt={`thumb-${i}`}
//         className="w-full h-full "
//       />
//     </button>
//   ))}
// </div>


//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupplements } from "@/redux/slices/supplement-slice/index";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Loader2 } from "lucide-react";

export default function ProductSlider() {
  const dispatch = useDispatch();
  const { supplements, loading } = useSelector((state) => state.supplements);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSupplements());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <section className="bg-white pt-4 md:pb-10 px-4 md:px-12 font-sans relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        spaceBetween={50}
        slidesPerView={1}
        autoHeight={true} // 🔥 KEY: makes swiper adjust height to slide
        className="group"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {supplements.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="mb-12 text-center block lg:hidden">
  <h2 className="text-4xl px-4 md:text-5xl font-light py-2 text-black">
    Our Best <span className="text-lime-500 font-bold">Supplement</span>
  </h2>
</div>


            <div className="flex flex-col md:flex-row items-center mt-2 justify-between gap-8">
              {/* Product Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={product.iconUrl}
                  alt={product.title}
                  className="w-full object-contain rounded-xl"
                />
              </div>

              {/* Product Details + Thumbnails */}
              <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-col">
                {/* Product Description */}
                <div>
                 <div className="mb-5">
  <h2 className="text-2xl hidden lg:block md:text-5xl font-light py-2 text-black">
    Our Best{" "}
    <span className="text-lime-500 font-bold">Supplement</span>
  </h2>
</div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-2">
                    {product.description}
                  </p>
                </div>

                {/* Thumbnails */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
                  {supplements.map((thumbProduct, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        swiperRef.current?.slideTo(i);
                        setActiveIndex(i);
                      }}
                      className={`w-28 h-28 md:w-32 md:h-32 rounded-lg transition-transform duration-300 overflow-hidden
                        ${
                          i === activeIndex
                            ? "scale-105"
                            : "hover:scale-105 border-rose-600 bg-black"
                        }`}
                    >
                      <img
                        src={thumbProduct.iconUrl}
                        alt={`thumb-${i}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
