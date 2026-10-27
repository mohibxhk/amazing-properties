import { Link } from "react-router-dom";
import { ArrowUpRight, Bath, BedDouble, Ruler, Sofa } from "lucide-react";

const PropertyCard = ({ p }) => (
  <Link to={`/property?id=${p.id}`} className="group block" data-testid="property-card">
    <div className="relative overflow-hidden bg-cream">
      <img
        src={p.image}
        alt={`${p.title} — ${p.location}, Bahrain`}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        data-testid="property-card-image"
      />
      <span
        className={`absolute left-0 top-4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
          p.purpose === "sale" ? "bg-charcoal text-ivory" : "bg-gold text-charcoal"
        }`}
      >
        {p.purpose === "sale" ? "For Sale" : "For Rent"}
      </span>
    </div>
    <div className="border border-t-0 border-sand p-5 transition-colors duration-300 group-hover:border-gold/50">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark">
        {p.location}
      </p>
      <h3
        className="mt-1.5 font-display text-lg font-medium leading-snug tracking-tight text-charcoal"
        data-testid="property-card-title"
      >
        {p.title}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
        {p.beds != null && p.beds > 0 && (
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" />
            {p.beds} Bedroom{p.beds !== 1 ? "s" : ""}
          </span>
        )}
        {p.beds === 0 && (
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" />
            Studio
          </span>
        )}
        {p.baths != null && (
          <span className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5" />
            {p.baths} Bathroom{p.baths !== 1 ? "s" : ""}
          </span>
        )}
        {p.area != null && (
          <span className="flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5" />
            {p.area} m²
          </span>
        )}
        {p.furnished && (
          <span className="flex items-center gap-1.5">
            <Sofa className="h-3.5 w-3.5" />
            Furnished
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-sand pt-4">
        <p
          className="font-display text-base font-semibold tracking-tight text-charcoal"
          data-testid="property-card-price"
        >
          {p.priceLabel}
        </p>
        <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/0 transition-colors duration-300 group-hover:text-gold-dark">
          View <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  </Link>
);

export default PropertyCard;
