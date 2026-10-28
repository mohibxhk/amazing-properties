import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { PROPERTIES } from "@/data/properties";

const API = process.env.REACT_APP_BACKEND_URL
  ? `${process.env.REACT_APP_BACKEND_URL}/api`
  : "";

const Listings = ({ purpose }) => {
  const [properties, setProperties] = useState(PROPERTIES || []);
  const [filtered, setFiltered] = useState(PROPERTIES || []);
  const [activeTab, setActiveTab] = useState(purpose || "all");

  useEffect(() => {
    if (API) {
      axios
        .get(`${API}/properties`)
        .then((r) => {
          if (r.data?.properties?.length) {
            setProperties(r.data.properties);
          }
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    let list = properties;
    if (purpose) {
      setActiveTab(purpose);
      list = properties.filter(
        (p) =>
          p?.purpose?.toLowerCase() === purpose.toLowerCase() ||
          p?.type?.toLowerCase() === purpose.toLowerCase()
      );
    } else if (activeTab !== "all") {
      list = properties.filter(
        (p) =>
          p?.purpose?.toLowerCase() === activeTab.toLowerCase() ||
          p?.type?.toLowerCase() === activeTab.toLowerCase()
      );
    }
    setFiltered(list);
  }, [purpose, activeTab, properties]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-ivory min-h-screen" data-testid="listings-page">
      <Seo
        title="All Properties — Amazing Properties Bahrain"
        description="Browse available residential and commercial properties for sale and rent in Bahrain."
      />
      <Navbar />

      <PageHero overline="Our Portfolio" title="Available Listings in Bahrain">
        Explore our complete collection of apartments, villas, and commercial spaces across established neighbourhoods.
      </PageHero>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12">
              <SearchBar />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex border-b border-sand pb-4">
              {[
                { id: "all", label: "All Properties" },
                { id: "sale", label: "For Sale" },
                { id: "rent", label: "For Rent" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`mr-8 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "border-b-2 border-gold-dark pb-4 text-gold-dark"
                      : "text-stone-500 hover:text-charcoal"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {filtered && filtered.length > 0 ? (
            <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p?.id || i} delay={0.04 * (i % 3)}>
                  <PropertyCard p={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={0.1}>
              <div className="py-20 text-center">
                <p className="text-base leading-relaxed text-stone-600">
                  No properties found matching your selection.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Listings;
