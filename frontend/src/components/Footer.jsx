import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { CONTACT } from "@/data/properties";

const Footer = () => (
  <footer className="bg-charcoal text-ivory" data-testid="site-footer">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
            A registered real estate company in Bahrain, handling property sales, rentals and
            advertising across the Kingdom — with straight advice in your language.
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-ivory/40">
            CR {CONTACT.cr} · RERA License {CONTACT.rera}
          </p>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            <li><Link to="/" className="transition-colors hover:text-ivory" data-testid="footer-link-home">Home</Link></li>
            <li><Link to="/for-sale" className="transition-colors hover:text-ivory" data-testid="footer-link-for-sale">For Sale</Link></li>
            <li><Link to="/for-rent" className="transition-colors hover:text-ivory" data-testid="footer-link-for-rent">For Rent</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-ivory" data-testid="footer-link-about">About Us</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-ivory" data-testid="footer-link-contact">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Properties</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            <li><Link to="/for-rent?type=Apartment" className="transition-colors hover:text-ivory">Apartments</Link></li>
            <li><Link to="/for-rent?type=Villa" className="transition-colors hover:text-ivory">Villas</Link></li>
            <li><Link to="/for-rent?location=Juffair" className="transition-colors hover:text-ivory">Juffair</Link></li>
            <li><Link to="/for-rent?location=Mahooz" className="transition-colors hover:text-ivory">Mahooz</Link></li>
            <li><Link to="/add-property" className="transition-colors hover:text-ivory">List Your Property</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-ivory/70">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="flex flex-col gap-1">
                {CONTACT.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-ivory"
                    data-testid="footer-phone-link"
                  >
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="transition-colors hover:text-ivory"
                data-testid="footer-email-link"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center">
        <p className="text-xs text-ivory/50">© Amazing Properties – Bahrain. All rights reserved.</p>
        <div className="flex gap-6 text-xs uppercase tracking-[0.18em] text-ivory/50">
          <span aria-label="Instagram (coming soon)" className="cursor-pointer transition-colors hover:text-ivory">Instagram</span>
          <span aria-label="LinkedIn (coming soon)" className="cursor-pointer transition-colors hover:text-ivory">LinkedIn</span>
          <span aria-label="Facebook (coming soon)" className="cursor-pointer transition-colors hover:text-ivory">Facebook</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
