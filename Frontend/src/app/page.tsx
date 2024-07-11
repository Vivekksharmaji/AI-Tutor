import Image from "next/image";
import HeroSection from './component/HeroSection'
import FuturedCourse from "./component/FuturedCourse";
import WhyChooseUs from "./component/whyChooseUs";
import TestimonialCards from "./component/TestimonialCards";
import UpcomingWebinars from "./component/UpcomingWebinars";
import Instructor from "./component/Instructor";
import { Footer } from "./component/Footer";



export default function Home() {
  return (
  <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
   
  <HeroSection/>
  <FuturedCourse/>
  <WhyChooseUs/>
  <TestimonialCards/>
  <UpcomingWebinars/>
  <Instructor/>
  <Footer/>

  </main>
  );
}
