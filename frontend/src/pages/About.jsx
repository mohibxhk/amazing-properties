import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { ABOUT_IMAGE, CONTACT, LOCATIONS } from "@/data/properties";

const About = () => (
  <div className="bg-ivory" data-testid="about-page">
    <Seo
      title="About Us — Amazing Properties Bahrain"
      description="Amazing Properties is a registered real estate company in Bahrain — CR 146568-02, RERA Brokers License 2024 10/1315. Agents in English, Arabic, Urdu and Hindi."
    />
    <Navbar />
    <PageHero overline="About Us" title="A Bahrain property company, properly registered.">
      Amazing Properties is a registered real estate company based in Tubli, working across the
      Kingdom of Bahrain.
    </PageHero>

    <section className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-charcoal sm:text-3xl">
            We sell, rent and advertise property — and we do it properly.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone-600">
            Our work covers residential and commercial property: apartments in Juffair, flats in
            Mahooz and Zinj, family villas in Hamala and Barbar, and commercial space in Manama and
            Seef. Some clients come to us to find a home; others come to sell or let one. Both get
            the same straight answer.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            The team is multilingual — English, Arabic, Urdu and Hindi — so you can discuss price,
            contracts and process in the language you think in.
          </p>
          <div className="mt-10 divide-y divide-sand border-y border-sand">
            <div className="flex items-baseline justify-between gap-6 py-5">
              <p className="text-sm font-medium text-charcoal">Commercial Registration</p>
              <p className="font-display text-sm font-semibold text-gold-dark">{CONTACT.cr}</p>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-5">
              <p className="text-sm font-medium text-charcoal">
                Bahrain RERA Real Estate Brokers License
              </p>
              <p className="font-display text-sm font-semibold text-gold-dark">{CONTACT.rera}</p>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-5">
              <p className="text-sm font-medium text-charcoal">Languages</p>
              <p className="text-sm text-stone-600">English · Arabic · Urdu · Hindi</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <img
            src={ABOUT_IMAGE}
            alt="Contemporary architecture in Bahrain"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            We cover {LOCATIONS.slice(0, 8).join(", ")} and the rest of the island. If it is in
            Bahrain, we can help you buy it, rent it, or sell it.
          </p>
        </Reveal>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
