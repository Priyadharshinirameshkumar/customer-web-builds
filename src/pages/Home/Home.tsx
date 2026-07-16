import Hero from "../../components/Hero/Hero";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import WebsiteFeatures from "../../components/WebsiteFeatures/WebsiteFeatures";
import PricingPreview from "../../components/PricingPreview/PricingPreview";
import PortfolioPreview from "../../components/PortfolioPreview/PortfolioPreview";
function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <WebsiteFeatures />
      <PricingPreview />
     <PortfolioPreview />
    </>
  );
}

export default Home;