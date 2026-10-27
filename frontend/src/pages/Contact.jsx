import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { CONTACT } from "@/data/properties";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full border border-sand bg-transparent px-4 py-3 text-sm text-charcoal placeholder:text-stone-400 focus:border-gold focus:outline-none";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Enquiry sent. Our team will get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please call us directly instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-ivory" data-testid="contact-page">
      <Seo
        title="Contact Us — Amazing Properties Bahrain"
        description="Call +973 34110099 or email info@amazingpropertiesbh.com. Office 3566A, Road 187, Block 701, Tubli, Bahrain. Open Sunday to Thursday, 8 AM to 6 PM."
      />
      <Navbar />
      <PageHero overline="Contact" title="Talk to an agent.">
        Call, email or send the form — you will reach a person, not a queue.
      </PageHero>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:gap-20 lg:px-8">
          <Reveal>
            <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  aria-label="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  data-testid="contact-name-input"
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                  data-testid="contact-email-input"
                />
              </div>
              <input
                placeholder="Phone (optional)"
                aria-label="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputCls}
                data-testid="contact-phone-input"
              />
              <textarea
                required
                rows={6}
                placeholder="Tell us what you are looking for — area, bedrooms, budget."
                aria-label="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputCls}
                data-testid="contact-message-input"
              />
              <button
                type="submit"
                disabled={sending}
                data-testid="contact-form-submit"
                className="bg-charcoal px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-gold-dark disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="divide-y divide-sand border-y border-sand">
              <div className="py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Phone</p>
                <div className="mt-2 flex flex-col gap-1">
                  {CONTACT.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="font-display text-lg font-medium text-charcoal transition-colors hover:text-gold-dark"
                      data-testid="contact-phone-link"
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
                  data-testid="contact-email-link"
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
              <div className="py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Registration
                </p>
                <p className="mt-2 text-sm text-stone-700">
                  CR {CONTACT.cr} · RERA License {CONTACT.rera}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
