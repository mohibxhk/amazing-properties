import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { CONTACT } from "@/data/properties";

const Login = () => (
  <div className="bg-ivory" data-testid="login-page">
    <Seo
      title="Client Login — Amazing Properties Bahrain"
      description="Client portal for Amazing Properties Bahrain. Currently available by invitation — contact the office for access."
    />
    <Navbar />
    <PageHero overline="Client Portal" title="Login" />
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <Reveal className="border border-sand bg-cream p-10 text-center">
          <p className="font-serif text-2xl italic text-charcoal">The portal is being prepared.</p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-stone-600">
            Online client accounts are on the way. For anything about your property, tenancy or
            listing in the meantime, our office is one call away.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 bg-charcoal py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-gold-dark"
              data-testid="login-call-cta"
            >
              <Phone className="h-4 w-4" /> {CONTACT.phones[0]}
            </a>
            <Link
              to="/contact"
              className="border border-charcoal/30 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-gold hover:text-gold-dark"
              data-testid="login-contact-cta"
            >
              Send a Message
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
    <Footer />
  </div>
);

export default Login;
