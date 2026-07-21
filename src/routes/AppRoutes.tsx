import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import PlanWebsite from "../pages/PlanWebsite/PlanWebsite";
import Booking from "../pages/Booking/Booking";
import ThankYou from "../pages/ThankYou/ThankYou";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Admin/Login/Login";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import WebsitePlansPage from "../pages/Admin/WebsitePlans/WebsitePlans";
import BookingsPage from "../pages/Admin/Bookings/Bookings";
import SlotsPage from "../pages/Admin/Slots/Slots";
import ProfilePage from "../pages/Admin/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Customer Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="plan-website" element={<PlanWebsite />} />
        <Route path="booking" element={<Booking />} />
        <Route path="thank-you" element={<ThankYou />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/website-plans" element={<WebsitePlansPage />} />
        <Route path="/admin/bookings" element={<BookingsPage />} />
        <Route path="/admin/slots" element={<SlotsPage />} />
        <Route path="/admin/profile" element={<ProfilePage />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;