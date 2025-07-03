"use client";

import { useState } from "react";
import NewsSlider from '@/pages/NewsSlider'
import CertificationSection from '@/components/CertificationSection'


const MediaPage = () => {
  const [activeTab, setActiveTab] = useState("healthGainer");
  const newsItems = [
    {
      id: 1,
      title: "Uttarakhand News Wire",
      desc: "Pharma Science™️ The Indian Ayurveda, a leading Ayurvedic medicine manufacturing company, proudly announces that it has been granted a patent by the Government of India’s Intellectual Property Office (IPI) for its groundbreaking Anti Piles Complete Resolution Treatment. ",
      image: "https://www.ipharmascience.com/storage/news_images/5cb4a141372e4d5971d5bd39ead2d2c8.jpeg",
      url: "https://uttarakhandnewswire.in/pharma-science%ef%b8%8f-granted-patent-for-its-ayurvedic-piles-treatment-anti-piles-complete-resolution/"
    },
    {
      id: 2,
      title: "Common Topics",
      desc: "Haemorrhoids (piles) affect millions worldwide, causing pain, discomfort, and lifestyle disruptions. Despite numerous treatment options, many individuals continue to suffer due to a lack of effective, long-term solutions. ",

      image: "https://www.ipharmascience.com/storage/news_images/35012c8dc1811600fc895e88d5f34a9b.jpeg",
      url: "https://commontopics.co/agency-news/pharma-science%ef%b8%8f-granted-patent-for-its-ayurvedic-piles-treatment-anti-piles-complete-resolution/"
    },
    // Add all other news items in the same format
    // ...
    {
      id: 118,
      title: "Google News",
      desc: "Haemorrhoids (piles) affect millions worldwide, causing pain, discomfort, and lifestyle disruptions. Despite numerous treatment options, many individuals continue to suffer due to a lack of effective, long-term solutions. ",

      image: "https://www.ipharmascience.com/storage/news_images/2b83eb66bc5e42e7d66999c370880f8b.jpeg",
      url: "https://news.google.com/search?q=Pharma+Science+Granted+Patent+for+Its+Ayurvedic+Piles+Treatment+Anti+Piles+Complete+Resolution+"
    },
    {
      id: 118,
      title: "Google News",
      desc: "Haemorrhoids (piles) affect millions worldwide, causing pain, discomfort, and lifestyle disruptions. Despite numerous treatment options, many individuals continue to suffer due to a lack of effective, long-term solutions. ",

      image: "https://www.ipharmascience.com/storage/news_images/00cb60ace83e7e3870675677e3aedb57.jpeg",
      url: "https://news.google.com/search?q=Pharma+Science+Granted+Patent+for+Its+Ayurvedic+Piles+Treatment+Anti+Piles+Complete+Resolution+"
    },
    {
      id: 118,
      title: "Google News",
      desc: "Haemorrhoids (piles) affect millions worldwide, causing pain, discomfort, and lifestyle disruptions. Despite numerous treatment options, many individuals continue to suffer due to a lack of effective, long-term solutions. ",

      image: "https://www.ipharmascience.com/storage/news_images/8f1e3ee54294e0ae3a558ced1856bb0d.jpeg",
      url: "https://news.google.com/search?q=Pharma+Science+Granted+Patent+for+Its+Ayurvedic+Piles+Treatment+Anti+Piles+Complete+Resolution+"
    },

    {
      id: 1,
      title: "Uttarakhand News Wire",
      desc: "Haemorrhoids (piles) affect millions worldwide, causing pain, discomfort, and lifestyle disruptions. Despite numerous treatment options, many individuals continue to suffer due to a lack of effective, long-term solutions. ",

      image: "https://www.ipharmascience.com/storage/news_images/5cb4a141372e4d5971d5bd39ead2d2c8.jpeg",
      url: "https://uttarakhandnewswire.in/pharma-science%ef%b8%8f-granted-patent-for-its-ayurvedic-piles-treatment-anti-piles-complete-resolution/"
    },
    {
      id: 2,
      title: "Common Topics",
      desc: "Haemorrhoids (piles) affect millions worldwide, causing pain, discomfort, and lifestyle disruptions. Despite numerous treatment options, many individuals continue to suffer due to a lack of effective, long-term solutions. ",

      image: "https://www.ipharmascience.com/storage/news_images/35012c8dc1811600fc895e88d5f34a9b.jpeg",
      url: "https://commontopics.co/agency-news/pharma-science%ef%b8%8f-granted-patent-for-its-ayurvedic-piles-treatment-anti-piles-complete-resolution/"
    },
    // Add all other news items in the same format
    // ...
    {
      id: 118,
      title: "Google News",
      desc: "Haemorrhoids (piles) affect millions worldwide, causing pain, discomfort, and lifestyle disruptions. Despite numerous treatment options, many individuals continue to suffer due to a lack of effective, long-term solutions. ",

      image: "https://www.ipharmascience.com/storage/news_images/2b83eb66bc5e42e7d66999c370880f8b.jpeg",
      url: "https://news.google.com/search?q=Pharma+Science+Granted+Patent+for+Its+Ayurvedic+Piles+Treatment+Anti+Piles+Complete+Resolution+"
    },



  ];
  return (


    <div className="bg-gray-50 text-gray-800">

<div className="container mx-auto px-4 py-8">
    <div className="text-center mb-12">
      {/* <div className="flex justify-center mb-6">
        <img
          src="storage/head_center_image.png"
          alt="Header"
          className=""
        />
      </div> */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Media and Reports</h1>
      <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {newsItems.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <div className="h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full  object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="px-4 py-1">
              <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h2>
            </div>

            <div className="px-4 py-3">
              <p className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-300">
                {item.desc}
              </p>
            </div>

          </a>
        </div>
      ))}
    </div>
  </div>


{/* <NewsSlider/> */}

{/* <CertificationSection/> */}
    </div>
  );
};

export default  MediaPage;