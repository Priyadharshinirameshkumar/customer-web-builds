import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";

import Home from "../pages/Home/Home";
import Templates from "../pages/Templates/Templates";
import Pricing from "../pages/Pricing/Pricing";
import Portfolio from "../pages/Portfolio/Portfolio";
import Reviews from "../pages/Reviews/Reviews";
import PlanWebsite from "../pages/PlanWebsite/PlanWebsite";
import Booking from "../pages/Booking/Booking";
import ThankYou from "../pages/ThankYou/ThankYou";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="templates" element={<Templates />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="plan-website" element={<PlanWebsite />} />
        <Route path="booking" element={<Booking />} />
        <Route path="thank-you" element={<ThankYou />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;