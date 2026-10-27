import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { LOCATIONS } from "@/data/properties";

const RENT_PRICES = [
  { label: "Any budget", value: "" },
  { label: "Up to BD 300 / mo", value: "300" },
  { label: "Up to BD 500 / mo", value: "500" },
  { label: "Up to BD 800 / mo", value: "800" },
];

const SALE_PRICES = [
  { label: "Any budget", value: "" },
  { label: "Up to BD 100,000", value: "100000" },
  { label: "Up to BD 250,000", value: "250000" },
  { label: "Above BD 250,000", value: "" },
];

const Field = ({ label, testid, value, onChange, options }) => (
  <label className="flex flex-col border-sand sm:border-l sm:px-4 sm:first:border-l-0 sm:first:pl-0">
    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
      {label}
    </span>
    <span className="relative mt-1 flex items-center">
      <select
        data-testid={testid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent pr-6 text-sm font-medium text-charcoal focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-stone-400" />
    </span>
  </label>
);

const SearchBar = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("rent");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [price, setPrice] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (type) q.set("type", type);
    if (location) q.set("location", location);
    if (beds) q.set("beds", beds);
    if (price) q.set("max_price", price);
    navigate(`${mode === "rent" ? "/for-rent" : "/for-sale"}${q.size ? `?${q}` : ""}`);
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-4xl border border-ivory/15 bg-ivory text-left shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]"
      data-testid="hero-search"
    >
      <div className="flex border-b border-sand">
        {[
          { key: "rent", label: "Rent", testid: "search-tab-rent" },
          { key: "sale", label: "Buy", testid: "search-tab-buy" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            data-testid={t.testid}
            onClick={() => {
              setMode(t.key);
              setPrice("");
            }}
            className={`px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
              mode === t.key
                ? "border-b-2 border-gold text-charcoal"
                : "text-stone-400 hover:text-charcoal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-0 sm:py-5 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <Field
          label="Property Type"
          testid="search-select-type"
          value={type}
          onChange={setType}
          options={["Any type", "Apartment", "Villa", "Studio"]}
        />
        <Field
          label="Location"
          testid="search-input-location"
          value={location}
          onChange={setLocation}
          options={["All Bahrain", ...LOCATIONS]}
        />
        <Field
          label="Bedrooms"
          testid="search-select-bedrooms"
          value={beds}
          onChange={setBeds}
          options={[
            { label: "Any", value: "" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4+", value: "4" },
          ]}
        />
        <Field
          label="Price Range"
          testid="search-select-price"
          value={price}
          onChange={setPrice}
          options={mode === "rent" ? RENT_PRICES : SALE_PRICES}
        />
        <div className="flex items-end sm:col-span-2 sm:mt-4 lg:col-span-1 lg:mt-0 lg:pl-4">
          <button
            type="submit"
            data-testid="search-submit-btn"
            className="flex w-full items-center justify-center gap-2 bg-charcoal px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-gold-dark lg:w-auto"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
