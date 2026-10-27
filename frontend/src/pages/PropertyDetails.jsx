import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Bath, BedDouble, Mail, Phone, Ruler, Sofa } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { CONTACT, PROPERTIES } from "@/data/properties";

const PropertyDetails = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const p = PROPERTIES.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="bg-ivory" data-testid="property-page-empty">
        <Seo
          title="Property Details — Amazing Properties Bahrain"
          description="Individual property details from Amazing Properties, a registered Bahrain real estate brokerage."
        />
        <Navbar />
        <PageHero overline="Amazing Properties" title="Property Details">
          Full individual property pages are being prepared. In the meantime, our team can send you
          details, photos and floor plans for any listing directly.
        </PageHero>
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
                  <Link
                    to="/for-rent"
                    className="group border border-sand p-8 transition-colors hover:border-gold"
                    data-testid="property-browse-rent"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                      Browse
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-charcoal">
                      Properties for Rent
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      Furnished and unfurnished apartments, studios and villas across Bahrain.
                    </p>
                  </Link>
                  <Link
                    to="/for-sale"
                    className="group border border-sand p-8 transition-colors hover:border-gold"
                    data-testid="property-browse-sale"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                      Browse
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-charcoal">
                      Properties for Sale
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      Homes and investment property currently on the market.
                    </p>
                  </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-ivory" data-testid="property-details-page">
      <Seo
        title={`${p.title} — ${p.location} | Amazing Properties Bahrain`}
        description={`${p.title} in ${p.location}, Bahrain. ${p.priceLabel}. Listed by Amazing Properties, registered Bahrain brokerage.`}
      />
      <Navbar />
      <section className="pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to={p.purpose === "sale" ? "/for-sale" : "/for-rent"}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-charcoal"
            data-testid="property-back-link"
          >
            <ArrowLeft className="h-4 w-4" /> Back to listings
          </Link>

          <Reveal className="mt-6">
            <div className="relative overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} — ${p.location}, Bahrain`}
                className="aspect-[16/9] w-full object-cover lg:aspect-[21/9]"
                data-testid="property-detail-image"
              />
              <span
                className={`absolute left-0 top-5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  p.purpose === "sale" ? "bg-charcoal text-ivory" : "bg-gold text-charcoal"
                }`}
              >
                {p.purpose === "sale" ? "For Sale" : "For Rent"}
              </span>
            </div>
          </Reveal>

          <div className="grid gap-12 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark">
                {p.location}, Bahrain
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
                {p.title}
              </h1>
              <p
                className="mt-4 font-display text-2xl font-semibold tracking-tight text-charcoal"
                data-testid="property-detail-price"
              >
                {p.priceLabel}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-sand py-5 text-sm text-stone-600">
                {p.beds != null && p.beds > 0 && (
                  <span className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-gold-dark" />
                    {p.beds} Bedroom{p.beds !== 1 ? "s" : ""}
                  </span>
                )}
                {p.beds === 0 && (
                  <span className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-gold-dark" /> Studio
                  </span>
                )}
                {p.baths != null && (
                  <span className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-gold-dark" />
                    {p.baths} Bathroom{p.baths !== 1 ? "s" : ""}
                  </span>
                )}
                {p.area != null && (
                  <span className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gold-dark" /> {p.area} m²
                  </span>
                )}
                {p.furnished && (
                  <span className="flex items-center gap-2">
                    <Sofa className="h-4 w-4 text-gold-dark" /> Fully Furnished
                  </span>
                )}
              </div>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-stone-600">{p.blurb}</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
                For floor plans, exact location and viewing times, contact the office — our agents
                speak English, Arabic, Urdu and Hindi.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <aside className="border border-sand bg-cream p-7" data-testid="property-agent-card">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                  Enquire About This Property
                </p>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  Speak directly with an agent about this listing.
                </p>
                <div className="mt-6 space-y-3">
                  {CONTACT.phones.map((ph) => (
                    <a
                      key={ph}
                      href={`tel:${ph.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-sm font-medium text-charcoal transition-colors hover:text-gold-dark"
                      data-testid="property-phone-link"
                    >
                      <Phone className="h-4 w-4 text-gold-dark" /> {ph}
                    </a>
                  ))}
                  <a
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${p.title} — ${p.location}`)}`}
                    className="flex items-center gap-3 text-sm font-medium text-charcoal transition-colors hover:text-gold-dark"
                    data-testid="property-email-link"
                  >
                    <Mail className="h-4 w-4 text-gold-dark" /> {CONTACT.email}
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="mt-7 block bg-charcoal py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-gold-dark"
                  data-testid="property-enquire-btn"
                >
                  Send an Enquiry
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
