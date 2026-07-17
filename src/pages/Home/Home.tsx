import Hero from "../../components/Hero/Hero";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import WebsiteFeatures from "../../components/WebsiteFeatures/WebsiteFeatures";
import PricingPreview from "../../components/PricingPreview/PricingPreview";
import PortfolioPreview from "../../components/PortfolioPreview/PortfolioPreview";
import TemplatesGallery from "../../components/TemplatesGallery/TemplatesGallery";
import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <WebsiteFeatures />
      <PricingPreview />
     <PortfolioPreview />
     <TemplatesGallery />
      <TestimonialsSection />
       <CTA />
        <Footer />
    </>
  );
}

export default Home;