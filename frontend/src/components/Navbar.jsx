import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const LINKS = [
  { to: "/", label: "Home", testid: "nav-link-home" },
  { to: "/properties", label: "Listings", testid: "nav-link-listings" },
  { to: "/for-sale", label: "For Sale", testid: "nav-link-for-sale" },
  { to: "/for-rent", label: "For Rent", testid: "nav-link-for-rent" },
  { to: "/about", label: "About", testid: "nav-link-about" },
  { to: "/contact", label: "Contact", testid: "nav-link-contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || pathname !== "/";

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-sand bg-ivory/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link to="/" aria-label="Amazing Properties — Home">
            <Logo light={!solid} compact />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={l.testid}
                className={({ isActive }) =>
                  `text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                    isActive
                      ? "border-b border-gold pb-1 text-gold-dark"
                      : solid
                        ? "text-charcoal/75 hover:text-charcoal"
                        : "text-ivory/80 hover:text-ivory"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              to="/login"
              data-testid="nav-login-link"
              className={`text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                solid ? "text-charcoal/75 hover:text-charcoal" : "text-ivory/80 hover:text-ivory"
              }`}
            >
              Login
            </Link>
            <Link
              to="/add-property"
              data-testid="nav-cta-list-property"
              className={`border px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                solid
                  ? "border-charcoal bg-charcoal text-ivory hover:bg-gold-dark hover:border-gold-dark"
                  : "border-ivory/70 text-ivory hover:bg-ivory hover:text-charcoal"
              }`}
            >
              Add Property
            </Link>
          </div>

          <button
            type="button"
            data-testid="mobile-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className={`p-2 lg:hidden ${solid ? "text-charcoal" : "text-ivory"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col bg-charcoal px-6 pb-10 pt-28 lg:hidden"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -14
