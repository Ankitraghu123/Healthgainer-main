import DistributorshipForm from '@/components/DistributorshipForm'
import BestSupplementSection from '@/pagesName/BestSupplementSection'
import HeroSection from '@/pagesName/HeroSection'
import InfiniteScrollText from '@/pagesName/InfiniteScrollText'
import NewsSection from '@/pagesName/NewsSection'
import ProductGallery from '@/pagesName/ProductGallery'
// import SupplementFeature from '@/pagesName/SupplementFeature'
// import SupplementPackages from '@/pagesName/SupplementPackages'
// import SupplementProcess from '@/pagesName/SupplementProcess'
// import SupplementsSection from '@/pagesName/SupplementsSection'
// import TestimonialSlider from '@/pagesName/TestimonialSlider'
import YoutubeSection from '@/pagesName/YoutubeSection'
import React from 'react'
import CallbackForm from "@/components/CallbackForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import DealsOfTheDay from '@/pagesName/DealsOfTheDay'
import ReviewCarousel from '@/pagesName/ReviewCarousel'
import ReviewCarousel2 from '@/pagesName/ReviewCarousel2'
// import BlogSection from '@/pagesName/BlogSection'
import VideoSlider from '@/pagesName/VideoSlider'
import NewsSlider from '@/pagesName/NewsSlider'
import WhyChooseUs from '@/pagesName/WhyChooseUs'
import CertificationSection from '@/components/CertificationSection'
import FullScreenVideo from '@/pagesName/FullScreenVideo'
import AyurvedicWeightGainer from '@/pagesName/AyurvedicWeightGainer'
import HealthGainerBenefits from '@/pagesName/HealthGainerBenefits'
import NaturalHerbs from '@/pagesName/NaturalHerbs'
import KeywordCloud from './keyword/page'




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
      <KeywordCloud/>

      {/* <BlogSection/> */}
      <CallbackForm/>
      <InfiniteScrollText/>
      <WhatsAppButton />
    </div>
  )
}

export default page