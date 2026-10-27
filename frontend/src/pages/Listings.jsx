import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import PropertyCard from "@/components/PropertyCard";
import { filterLocal, LOCATIONS } from "@/data/properties";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FilterSelect = ({ label, testid, value, onChange, options }) => (
  <label className="flex min-w-[160px] flex-1 flex-col">
    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
      {label}
    </span>
    <span className="relative mt-1.5">
      <select
        data-testid={testid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-sand bg-transparent px-3 py-2.5 pr-8 text-sm text-charcoal focus:border-gold focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
    </span>
  </label>
);

const Listings = ({ purpose }) => {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSale = purpose === "sale";
  const title = isSale ? "Properties for Sale" : "Properties for Rent";

  useEffect(() => {
    const q = new URLSearchParams({ purpose });
    ["location", "type", "beds", "max_price"].forEach((k) => {
      if (params.get(k)) q.set(k, params.get(k));
    });
    setLoading(true);
    axios
      .get(`${API}/properties?${q}`)
      .then((r) => setItems(r.data.properties))
      .catch(() => setItems(filterLocal(purpose, params)))
      .finally(() => setLoading(false));
  }, [purpose, params]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <div className="bg-ivory" data-testid={`listings-${purpose}-page`}>
      <Seo
        title={`${title} in Bahrain — Amazing Properties`}
        description={`${title} across Bahrain — Juffair, Mahooz, Zinj, Sanad and beyond. Browse current listings from Amazing Properties, a registered Bahrain brokerage.`}
      />
      <Navbar />
      <PageHero overline="Amazing Properties" title={title}>
        {isSale
          ? "Homes and investment property currently available to buy across the Kingdom."
          : "Apartments, villas and studios currently available to rent — furnished and unfurnished."}
      </PageHero>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end gap-5 border-b border-sand pb-8">
            <FilterSelect
              label="Location"
              testid="filter-location"
              value={params.get("location") || ""}
              onChange={(v) => update("location", v)}
              options={[{ label: "All Bahrain", value: "" }, ...LOCATIONS]}
            />
            <FilterSelect
              label="Type"
              testid="filter-type"
              value={params.get("type") || ""}
              onChange={(v) => update("type", v)}
              options={[
                { label: "Any type", value: "" },
                "Apartment",
                "Villa",
                "Studio",
              ]}
            />
            <FilterSelect
              label="Bedrooms"
              testid="filter-bedrooms"
              value={params.get("beds") || ""}
              onChange={(v) => update("beds", v)}
              options={[
                { label: "Any", value: "" },
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4+", value: "4" },
              ]}
            />
            <FilterSelect
              label="Max budget"
              testid="filter-max-price"
              value={params.get("max_price") || ""}
              onChange={(v) => update("max_price", v)}
              options={
                isSale
                  ? [
                      { label: "Any budget", value: "" },
                      { label: "BD 100,000", value: "100000" },
                      { label: "BD 250,000", value: "250000" },
                    ]
                  : [
                      { label: "Any budget", value: "" },
                      { label: "BD 300 / mo", value: "300" },
                      { label: "BD 500 / mo", value: "500" },
                      { label: "BD 800 / mo", value: "800" },
                    ]
              }
            />
          </Reveal>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500" data-testid="listings-count">
            {loading ? "Loading…" : `${items.length} ${items.length === 1 ? "property" : "properties"}`}
          </p>

          {!loading && items.length === 0 && (
            <div className="mt-10 border border-sand bg-cream px-8 py-16 text-center" data-testid="listings-empty">
              <p className="font-serif text-2xl italic text-charcoal">Nothing matches that exactly.</p>
              <p className="mx-auto mt-3 max-w-md text-sm text-stone-600">
                Try widening your filters — or call us on +973 34110099 and we will check what is
                coming onto the market.
              </p>
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams())}
                className="mt-6 border border-charcoal px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
                data-testid="listings-clear-filters"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <Reveal key={p.id} delay={0.06 * (i % 3)}>
                <PropertyCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Listings;
