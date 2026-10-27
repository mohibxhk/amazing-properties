import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { CONTACT } from "@/data/properties";

const STEPS = [
  {
    name: "Tell us about the property",
    text: "Call or email with the basics — area, size, and whether you want to sell or rent it out.",
  },
  {
    name: "We present and advertise it",
    text: "We handle presentation, photography and advertising, and put it in front of serious buyers and tenants.",
  },
  {
    name: "You approve every step",
    text: "Viewings, offers and paperwork go through you. Nothing moves without your say.",
  },
];

const AddProperty = () => (
  <div className="bg-ivory" data-testid="add-property-page">
    <Seo
      title="List Your Property — Amazing Properties Bahrain"
      description="Sell or rent out your property with Amazing Properties, a registered Bahrain brokerage. Call +973 34110099 to list your property."
    />
    <Navbar />
    <PageHero overline="List Your Property" title="Sell or rent out your property, properly.">
      Online submissions are being prepared. Until then, listing with us starts with one phone
      call — and it works well.
    </PageHero>

    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-sand border-y border-sand">
          {STEPS.map((s) => (
            <Reveal key={s.name}>
              <div className="grid gap-2 py-7 sm:grid-cols-[320px_1fr] sm:gap-10" data-testid="add-property-step">
                <h2 className="font-display text-xl font-semibold tracking-tight text-charcoal">
                  {s.name}
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-stone-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap gap-4">
          <a
            href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
            className="flex items-center gap-2 bg-charcoal px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-gold-dark"
            data-testid="add-property-call-cta"
          >
            <Phone className="h-4 w-4" /> {CONTACT.phones[0]}
          </a>
          <a
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("I would like to list my property")}`}
            className="flex items-center gap-2 border border-charcoal/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors duration-300 hover:border-gold hover:text-gold-dark"
            data-testid="add-property-email-cta"
          >
            Email the Office
          </a>
        </Reveal>
      </div>
    </section>

    <Footer />
  </div>
);

export default AddProperty;
