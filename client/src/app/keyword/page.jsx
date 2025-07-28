"use client";

import React from "react";

const keywords = [
  "India No.1 Weight Gainer",
  "Ayurvedic Weight Gainer",
  "Best Ayurvedic Weight Gainer Powder",
  "Health Gain Powder for Female",
  "Pharma Science Weight Gainer Review",
  "Best Ayurvedic Weight Gainer in India",
  "Ayurvedic Weight Gainer and Health Booster",
  "Best Weight Gain Powder Online",
  "Pharma Science Ayurvedic Weight Gainer Supplement",
  "Mass & Weight Gainers Powder in India",
  "Buy Best Weight Gainer Powder in India",
  "Buy Best Mass Gainer Online In India",
  "Health Gainer Powder in Hindi",
  "Pharma Science Health Gainer Powder",
  "Weight Gainer for Men",
  "Most Popular Items in Mass & Weight Gainers",
  "Best Weight Gainer Powders for Women and Men",
  "Best Mass and Weight Gainers in India 2025",
  "Mass Gainers Online at Lowest Prices",
  "Buy #1 Mass Gainers Powder Online in India",
  "Buy Weight Gainer for Men Online at Best Prices in India",
  "Best Weight Gainer for Men Without Gym",
];

const KeywordCloud = () => {
  return (
    <section className="bg-gradient-to-br from-[#e0f7fa] to-[#fff3e0] py-8 px-4 mt-12 rounded-xl shadow-inner">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
        🔍 Popular Searches Related to Weight Gainer in India
      </h2>

      <div className="flex flex-wrap justify-center gap-3 text-sm sm:text-base">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#d1c4e9] border border-gray-200 text-gray-700 hover:text-black transition-all duration-300 shadow-sm cursor-pointer"
          >
            {keyword}
          </span>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        All trademarks and brand names are property of their respective owners.
      </p>
    </section>
  );
};

export default KeywordCloud;
