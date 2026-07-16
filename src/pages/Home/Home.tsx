import Hero from "../../components/Hero/Hero";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import WebsiteFeatures from "../../components/WebsiteFeatures/WebsiteFeatures";
import PricingPreview from "../../components/PricingPreview/PricingPreview";
import PortfolioPreview from "../../components/PortfolioPreview/PortfolioPreview";
import TemplatesGallery from "../../components/TemplatesGallery/TemplatesGallery";
function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <WebsiteFeatures />
      <PricingPreview />
     <PortfolioPreview />
     <TemplatesGallery />
    </>
  );
}

export default Home;