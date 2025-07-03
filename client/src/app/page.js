import DistributorshipForm from '@/components/DistributorshipForm'
import BestSupplementSection from '@/pages/BestSupplementSection'
import HeroSection from '@/pages/HeroSection'
import InfiniteScrollText from '@/pages/InfiniteScrollText'
import NewsSection from '@/pages/NewsSection'
import ProductGallery from '@/pages/ProductGallery'
// import SupplementFeature from '@/pages/SupplementFeature'
// import SupplementPackages from '@/pages/SupplementPackages'
// import SupplementProcess from '@/pages/SupplementProcess'
// import SupplementsSection from '@/pages/SupplementsSection'
// import TestimonialSlider from '@/pages/TestimonialSlider'
import YoutubeSection from '@/pages/YoutubeSection'
import React from 'react'
import CallbackForm from "@/components/CallbackForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import DealsOfTheDay from '@/pages/DealsOfTheDay'
import ReviewCarousel from '@/pages/ReviewCarousel'
import ReviewCarousel2 from '@/pages/ReviewCarousel2'
// import BlogSection from '@/pages/BlogSection'
import VideoSlider from '@/pages/VideoSlider'
import NewsSlider from '@/pages/NewsSlider'
import WhyChooseUs from '@/pages/WhyChooseUs'
import CertificationSection from '@/components/CertificationSection'
import FullScreenVideo from '@/pages/FullScreenVideo'
import AyurvedicWeightGainer from '@/pages/AyurvedicWeightGainer'
import HealthGainerBenefits from '@/pages/HealthGainerBenefits'
import NaturalHerbs from '@/pages/NaturalHerbs'




const page = () => {
  return (
    <div>
      <HeroSection />
      <AyurvedicWeightGainer />


      <FullScreenVideo/>
       <NaturalHerbs/>
      <HealthGainerBenefits />

      <BestSupplementSection/>


      <ReviewCarousel/>
      <CertificationSection/>
      <DealsOfTheDay/>
      <NewsSlider/>

      <WhyChooseUs/>
      {/* <BlogSection/> */}
      <CallbackForm/>
      <InfiniteScrollText/>
      <WhatsAppButton />
    </div>
  )
}

export default page