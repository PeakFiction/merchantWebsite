import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import CatalogFnb from "./pages/CatalogFnb.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Order from "./pages/Order.jsx";

import Tailoring from "./pages/Tailoring.jsx";
import TailoringDetail from "./pages/TailoringDetail.jsx";
import Quote from "./pages/Quote.jsx";

import HowToOrder from "./pages/HowToOrder.jsx";
import Policies from "./pages/Policies.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  const nav = useNavigate();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/catalog" element={<Navigate to="/catalog/fnb" replace />} />
        <Route path="/catalog/fnb" element={<CatalogFnb />} />
        <Route path="/fnb/:slug" element={<ProductDetail />} />
        <Route path="/order/:slug" element={<Order />} />

        <Route path="/tailoring" element={<Tailoring />} />
        <Route path="/tailoring/:slug" element={<TailoringDetail />} />
        <Route path="/quote/:slug" element={<Quote />} />

        <Route path="/how-to-order" element={<HowToOrder />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin onSuccess={() => nav("/admin")} />} />
        <Route path="/admin" element={<Admin onAuthedFail={() => nav("/admin/login")} />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
