import DistributorshipForm from "@/components/DistributorshipForm";
import BestSupplementSection from "@/pagesid/BestSupplementSection";
import HeroSection from "@/pagesid/HeroSection";
import InfiniteScrollText from "@/pagesid/InfiniteScrollText";
import NewsSection from "@/pagesid/NewsSection";
import ProductGallery from "@/pagesid/ProductGallery";
// import SupplementFeature from '@/pages/SupplementFeature'
// import SupplementPackages from '@/pages/SupplementPackages'
// import SupplementProcess from '@/pages/SupplementProcess'
// import SupplementsSection from '@/pages/SupplementsSection'
// import TestimonialSlider from '@/pages/TestimonialSlider'
import YoutubeSection from "@/pagesid/YoutubeSection";
import React from "react";
import CallbackForm from "@/components/CallbackForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import DealsOfTheDay from "@/pagesid/DealsOfTheDay";
import ReviewCarousel from "@/pagesid/ReviewCarousel";
import ReviewCarousel2 from "@/pagesid/ReviewCarousel2";
// import BlogSection from '@/pages/BlogSection'
import VideoSlider from "@/pagesid/VideoSlider";
import NewsSlider from "@/pagesid/NewsSlider";
import WhyChooseUs from "@/pagesid/WhyChooseUs";
import CertificationSection from "@/components/CertificationSection";
import FullScreenVideo from "@/pagesid/FullScreenVideo";
import AyurvedicWeightGainer from "@/pagesid/AyurvedicWeightGainer";
import HealthGainerBenefits from "@/pagesid/HealthGainerBenefits";
import NaturalHerbs from "@/pagesid/NaturalHerbs";

const page = () => {
  return (
    <div>
      <HeroSection />
      <AyurvedicWeightGainer />

      <FullScreenVideo />
      <NaturalHerbs />
      <HealthGainerBenefits />

      <BestSupplementSection />

      <ReviewCarousel />
      <CertificationSection />
      <DealsOfTheDay />
      <NewsSlider />

      <WhyChooseUs />
      {/* <BlogSection/> */}
      <CallbackForm />
      <InfiniteScrollText />
      <WhatsAppButton />
    </div>
  );
};

export default page;
