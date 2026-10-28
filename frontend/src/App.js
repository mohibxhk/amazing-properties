import Listings from "@/pages/Listings";
import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Preloader from "@/components/Preloader";
import Assistant from "@/components/Assistant";
import Home from "@/pages/Home";
import Listings from "@/pages/Listings";
import PropertyDetails from "@/pages/PropertyDetails";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import AddProperty from "@/pages/AddProperty";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("ap_loaded"));

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const finishLoading = () => {
    sessionStorage.setItem("ap_loaded", "1");
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence>
        {loading && <Preloader onDone={finishLoading} />}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-sale" element={<Listings purpose="sale" />} />
        <Route path="/for-rent" element={<Listings purpose="rent" />} />
        <Route path="/property" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
      <Assistant />
      <Toaster position="bottom-left" />
    </BrowserRouter>
  );
}

export default App;
