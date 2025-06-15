/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { AlertProvider } from "@/context/AlertContext";

// Layout
import UserLayout from "@/pages/user/UserLayout";
import UserDashboardLayout from "@/components/user/UserDashboardLayout";

// Halaman User (Publik)
import Home from "@/pages/user/Home";
import Explore from "@/pages/user/Explore";
import PlaceDetail from "@/pages/user/PlaceDetail";
import Register from "@/pages/user/Register";
import Login from "@/pages/user/Login";

// Halaman User (Dashboard)
import DashboardUser from "@/pages/user/DashboardUser";
import Wishlist from "@/pages/user/Wishlist";
import RatingReview from "@/pages/user/RatingReview";
import RecommendForm from "@/pages/user/RecommendForm";
import Contact from "@/pages/user/Contact";
import Profile from "@/pages/user/Profile";
import EditProfile from "@/pages/user/EditProfile";

// Halaman Admin
import LoginAdmin from "@/pages/admin/LoginAdmin";
import DashboardAdmin from "@/pages/admin/DashboardAdmin";
import ManagePlaces from "@/pages/admin/ManagePlaces";
import ManageUMKM from "@/pages/admin/ManageUMKM";
import ReviewApproval from "@/pages/admin/ReviewApproval";
import ManageReviews from "@/pages/admin/ManageReviews";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManageContent from "@/pages/admin/ManageContent";
import BroadcastPanel from "@/pages/admin/BroadcastPanel";
import Categories from "@/pages/admin/Categories";
import ProfileAdmin from "@/pages/admin/Profile";
import EditProfileAdmin from "@/pages/admin/EditProfile";

export default function AppRoutes() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<LoginAdmin />} />

          {/* USER PUBLIC (NAVBAR + FOOTER) */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/place/:id" element={<PlaceDetail />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* USER DASHBOARD (SIDEBAR LAYOUT) */}
          <Route element={<UserDashboardLayout />}>
            <Route path="/dashboard" element={<DashboardUser />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/review" element={<RatingReview />} />
            <Route path="/recommend" element={<RecommendForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
          </Route>

          {/* ADMIN (NO LAYOUT YET) */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/places" element={<ManagePlaces />} />
          <Route path="/admin/umkm" element={<ManageUMKM />} />
          <Route path="/admin/review-approval" element={<ReviewApproval />} />
          <Route path="/admin/reviews" element={<ManageReviews />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/content" element={<ManageContent />} />
          <Route path="/admin/broadcast" element={<BroadcastPanel />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/profile" element={<ProfileAdmin />} />
          <Route path="/admin/edit-profile" element={<EditProfileAdmin />} />
        </Routes>

        {/* ✅ Toastify Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </Router>
    </AlertProvider>
  );
}
