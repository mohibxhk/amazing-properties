import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import {
  ABOUT_IMAGE,
  CATEGORY_TILES,
  CONTACT,
  HERO_POSTER,
  HERO_VIDEO,
  LOCATIONS,
  PROPERTIES,
} from "@/data/properties";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICES = [
  { name: "Property Sales", text: "Homes and investment property sold with straight advice on price and process." },
  { name: "Property Rentals", text: "Apartments, villas and commercial space — furnished or unfurnished, short or long term." },
  { name: "Property Advertising", text: "Your property presented properly and put in front of serious buyers and tenants." },
  { name: "Residential", text: "Family homes, apartments and villas across Bahrain's established neighbourhoods." },
  { name: "Commercial", text: "Offices, retail and workspace in Manama, Seef and the island's business districts." },
  { name: "Consultation", text: "Clear guidance on areas, pricing and paperwork — in English, Arabic, Urdu or Hindi." },
];

const Home = () => {
  const [featured, setFeatured] = useState(PROPERTIES.filter((p) => p.featured));
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const firstVisit = !sessionStorage.getItem("ap_loaded");
  const base = firstVisit ? 2.0 : 0.1;

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    axios
      .get(`${API}/properties`)
      .then((r) => {
        const f = r.data.properties.filter((p) => p.featured);
        if (f.length) setFeatured(f);
      })
      .catch(() => {});
  }, []);

  const line = {
    hidden: { y: "112%" },
    show: (i) => ({
      y: "0%",
      transition: { duration: 1, delay: base + i * 0.14, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="bg-ivory" data-testid="home-page">
      <Seo
        title="Amazing Properties — Real Estate in Bahrain"
        description="Property sales, rentals and real estate services across Bahrain. Registered brokers, local knowledge, serious advice."
      />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal">
        <motion.div style={{ y: videoY }} className="absolute inset-0 scale-[1.12]">
          <video
            ref={videoRef}
            data-testid="hero-video-container"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/45 to-charcoal/85" />

        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: base - 0.2, duration: 0.8 }}
            className="hero-shadow text-xs font-semibold uppercase tracking-[0.34em] text-gold-light"
          >
            Amazing Properties — Bahrain
          </motion.p>
          <h1
            data-testid="hero-title-reveal"
            className="hero-shadow mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" variants={line} custom={0} initial="hidden" animate="show">
                Find Your Place
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" variants={line} custom={1} initial="hidden" animate="show">
                in <em className="font-serif font-medium italic text-gold-light">Bahrain</em>.
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.5, duration: 0.8 }}
            className="hero-shadow mt-5 max-w-xl text-base leading-relaxed text-ivory/85"
          >
            Homes, apartments and commercial property across the Kingdom — sold and rented by
            people who know these streets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.65, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/for-sale"
              data-testid="hero-cta-explore"
              className="flex items-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors duration-300 hover:bg-gold-light"
            >
              Explore Properties <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/add-property"
              data-testid="hero-cta-list"
              className="flex items-center gap-2 border border-ivory/50 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-charcoal"
            >
              List Your Property
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.85, duration: 0.9 }}
            className="mt-12"
          >
            <SearchBar />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: base + 1.3, duration: 1 }}
          className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="h-8 w-px bg-ivory/40"
          />
        </motion.div>
      </section>

      <Marquee />

      {/* Featured properties */}
      <section className="py-20 lg:py-28" data-testid="featured-properties-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
                Featured Listings
              </p>
              <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
                On the market this week
              </h2>
            </div>
            <Link
              to="/for-rent"
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-gold-dark"
              data-testid="featured-view-all-link"
            >
              View all properties
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={0.08 * (i % 3)}>
                <PropertyCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery categories */}
      <section className="bg-cream py-20 lg:py-28" data-testid="discovery-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Find Your Way In
            </p>
            <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
              Start with the kind of place you need
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CATEGORY_TILES.map((t, i) => (
              <Reveal key={t.name} delay={0.06 * i} className={t.large ? "md:col-span-2" : ""}>
                <Link
                  to={t.href}
                  data-testid="category-tile"
                  className="group relative block overflow-hidden bg-charcoal"
                >
                  <img
                    src={t.image}
                    alt={`${t.name} in Bahrain`}
                    loading="lazy"
                    className={`w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100 ${
                      t.large ? "aspect-[16/8]" : "aspect-[16/9]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold-light">
                        {t.tag}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-ivory">
                        {t.name}
                      </h3>
                    </div>
                    <span className="border border-ivory/40 p-2.5 text-ivory transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Amazing Properties */}
      <section className="py-20 lg:py-28" data-testid="why-us-trust-section">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Why Amazing Properties
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
              Local knowledge.{" "}
              <em className="font-serif font-medium italic text-gold-dark">
                Serious property advice.
              </em>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-600">
              We are a registered Bahrain brokerage — not a portal, not a call centre. When you ask
              about a street in Juffair or a villa in Hamala, you get an answer from someone who has
              stood in it.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-600">
              Sales, rentals, residential and commercial — handled properly, advertised honestly,
              and explained in the language you are most comfortable with.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="divide-y divide-sand border-y border-sand">
              <div className="flex items-baseline justify-between gap-6 py-5" data-testid="cr-license-badge">
                <p className="text-sm font-medium text-charcoal">Commercial Registration</p>
                <p className="font-display text-sm font-semibold tracking-wide text-gold-dark">
                  {CONTACT.cr}
                </p>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5" data-testid="rera-license-badge">
                <p className="text-sm font-medium text-charcoal">
                  Bahrain RERA Real Estate Brokers License
                </p>
                <p className="font-display text-sm font-semibold tracking-wide text-gold-dark">
                  {CONTACT.rera}
                </p>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <p className="text-sm font-medium text-charcoal">Our agents speak</p>
                <p className="text-sm text-stone-600">English · Arabic · Urdu · Hindi</p>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <p className="text-sm font-medium text-charcoal">We handle</p>
                <p className="text-right text-sm text-stone-600">
                  Sales · Rentals · Residential · Commercial · Advertising
                </p>
              </div>
            </div>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-gold-dark"
              data-testid="why-us-about-link"
            >
              About the company
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-charcoal py-20 text-ivory lg:py-28" data-testid="about-teaser-section">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="relative overflow-hidden">
            <img
              src={ABOUT_IMAGE}
              alt="Modern architecture in Bahrain"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 border-t border-r border-gold/40 bg-charcoal/90 px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-gold-light">Tubli, Bahrain</p>
              <p className="mt-1 text-sm text-ivory/80">Our office, in the middle of the island</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              About Amazing Properties
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              A registered brokerage, based in Tubli, working across the Kingdom.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/70">
              Amazing Properties handles property sales, rentals and advertising across Bahrain —
              from furnished apartments in Juffair to family villas in Hamala and commercial space
              in Manama and Seef.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory/70">
              You deal directly with experienced agents who speak English, Arabic, Urdu and Hindi —
              and who tell you what a property is actually worth.
            </p>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 border border-ivory/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
              data-testid="about-teaser-link"
            >
              More about us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 lg:py-28" data-testid="locations-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Where We Work
            </p>
            <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
              Across Bahrain, neighbourhood by neighbourhood
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600">
              From the towers of Manama and Seef to the family streets of Hamala and Barbar — we
              list, sell and rent property in every part of the island.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((name, i) => (
              <Reveal key={name} delay={0.03 * (i % 3)}>
                <Link
                  to={`/for-rent?location=${encodeURIComponent(name)}`}
                  data-testid="location-chip"
                  className="group flex items-center justify-between border-t border-sand py-4 pr-2 transition-colors duration-300 hover:border-gold"
                >
                  <span className="font-serif text-xl italic text-charcoal transition-colors duration-300 group-hover:text-gold-dark">
                    {name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-stone-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-dark" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream py-20 lg:py-28" data-testid="services-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              What We Do
            </p>
            <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
              One office for everything property
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-sand border-y border-sand">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={0.04 * i}>
                <div
                  className="group grid items-baseline gap-2 py-6 sm:grid-cols-[280px_1fr_auto] sm:gap-8"
                  data-testid="service-item"
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-charcoal transition-colors duration-300 group-hover:text-gold-dark">
                    {s.name}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-stone-600">{s.text}</p>
                  <Link
                    to="/contact"
                    aria-label={`Enquire about ${s.name}`}
                    className="hidden text-stone-300 transition-colors duration-300 hover:text-gold-dark sm:block"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-28" data-testid="contact-cta-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Talk To Us
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
              Looking for the right property in Bahrain?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-600">
              Call the office, send an email, or drop in. Tell us your budget and the area you have
              in mind — we will tell you honestly what it gets you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                data-testid="cta-talk-to-agent"
                className="flex items-center gap-2 bg-charcoal px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-gold-dark"
              >
                <Phone className="h-4 w-4" /> Talk to an Agent
              </a>
              <Link
                to="/for-rent"
                data-testid="cta-explore-properties"
                className="flex items-center gap-2 border border-charcoal/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors duration-300 hover:border-gold hover:text-gold-dark"
              >
                Explore Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="divide-y divide-sand border-y border-sand">
              <div className="py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Phone</p>
                <div className="mt-2 flex flex-col gap-1">
                  {CONTACT.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="font-display text-lg font-medium text-charcoal transition-colors hover:text-gold-dark"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Email</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-2 block font-display text-lg font-medium text-charcoal transition-colors hover:text-gold-dark"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div className="py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Office</p>
                <p className="mt-2 text-base text-stone-700">{CONTACT.address}</p>
              </div>
              <div className="py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Working Hours
                </p>
                <p className="mt-2 text-base text-stone-700">{CONTACT.hours}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
