"use client";

import React from "react";
import Image from "next/image";

export default function HealthGainerBenefits() {
  const benefits = [
    {
      title: "IMPROVE STAMINA",
      image: "/iconss/Layer 5.png",
      description:
        "Health gainer powder helps improve stamina by providing essential nutrients, proteins, and carbohydrates that fuel the body. It supports muscle recovery, boosts energy levels, and enhances endurance for workouts or daily activities. Regular use, combined with exercise and a balanced diet, can help build strength, improve performance, and maintain overall well-being.",
    },
    {
      title: "IMPROVE ENERGY",
      image: "/iconss/Energy (1).png",
      description:
        "Health gainer boosts energy by supplying essential proteins, carbohydrates, and vitamins that fuel the body. It helps replenish energy stores, reducing fatigue and enhancing endurance for workouts and daily activities. Regular use, combined with a balanced diet and exercise, supports sustained energy levels and overall physical performance.",
    },

    {
      title: "IMPROVE Strength",
      image: "/iconss/Layer 3.png",
      description:
        "Health gainer supports heart health by providing essential nutrients, proteins, and healthy fats that help maintain a balanced metabolism. While it primarily aids in weight gain and energy levels, proper use with exercise and a balanced diet may contribute to improved circulation and a stable heart rate for overall well-being.",
    },
    {
      title: "IMPROVE IMMUNITY",
      image: "/iconss/Immunity 2.png",
      description:
        "Health gainer promotes good health by providing essential proteins, vitamins, and carbohydrates that support overall body function. It aids in muscle growth, boosts energy, strengthens immunity, and maintains a healthy weight. Combined with regular exercise and a balanced diet, it helps enhance stamina, metabolism, and overall well-being.",
    },
    {
      title: "IMPROVE MUSCLE",
      image: "/iconss/man-health.png",
      description:
        "Health gainer helps improve muscle growth by providing a rich blend of proteins, carbohydrates, and essential nutrients. It supports muscle recovery, enhances strength, and promotes lean muscle mass development. Regular intake, along with proper exercise and a protein-rich diet, can boost muscle-building efforts and improve overall fitness and endurance.",
    },

    {
      title: "IMPROVE DIET & WEIGHT",
      image: "/iconss/Layer 4.png",
      description:
        "Health gainer helps improve weight by providing a high-calorie blend of proteins, carbohydrates, and essential nutrients. It supports healthy weight gain, muscle development, and energy levels. Regular consumption, along with a nutritious diet and exercise, ensures steady weight gain while maintaining overall strength and fitness for a healthier body.",
    },


  ];

  return (
    <section className="bg-black text-white py-12 px-10 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-gray-200">
          Benefits Of{" "}
          <span className="text-lime-500 font-bold">Health Gainer</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3">
        {benefits.map((benefit, index) => {
          const isTopRow = index < 3;
          const isLeftCol = index % 3 === 0;
          const isRightCol = index % 3 === 2;
          const isBottomRow = index >= 3;

          return (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-4 md:p-5 border border-lime-500
                ${isTopRow ? "md:border-t-0" : ""}
                ${isLeftCol ? "md:border-l-0" : ""}
                ${isRightCol ? "md:border-r-0" : ""}
                ${isBottomRow ? "md:border-b-0" : ""}`}
            >
              <div className="mb-5  ">
                <Image
                  src={benefit.image}
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
    </section>
  );
}
