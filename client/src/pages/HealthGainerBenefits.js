"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {  fetchBenefits } from "@/redux/slices/benefit-slice/index"

export default function HealthGainerBenefits() {
  const dispatch = useDispatch();
  const { benefits, loading, error } = useSelector((state) => state.benefits);

  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  return (
    <section className="bg-black text-white py-12 px-10 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-gray-200">
          Benefits Of{" "}
          <span className="text-lime-500 font-bold">Health Gainer</span>
        </h2>
      </div>

      {loading ? (
        <p className="text-white text-center">Loading benefits...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const isTopRow = index < 3;
            const isLeftCol = index % 3 === 0;
            const isRightCol = index % 3 === 2;
            const isBottomRow = index >= 3;

            return (
              <div
                key={benefit._id}
                className={`flex flex-col items-center text-center p-4 md:p-5 border border-lime-500
                  ${isTopRow ? "md:border-t-0" : ""}
                  ${isLeftCol ? "md:border-l-0" : ""}
                  ${isRightCol ? "md:border-r-0" : ""}
                  ${isBottomRow ? "md:border-b-0" : ""}`}
              >
                <div className="mb-5">
                  <Image
                    src={benefit.iconUrl}
                    alt={benefit.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lime-500 font-semibold text-xl mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm text-justify leading-relaxed max-w-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
