import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { Mark } from "@/components/Logo";
import { CONTACT, LOCATIONS, PROPERTIES } from "@/data/properties";

const CHIPS = [
  "2 bedroom apartment in Juffair under BD 450",
  "I want to rent a villa",
  "What do you have for sale?",
  "How do I list my property?",
];

const areaList = "Manama, Juffair, Seef, Amwaj Island, Saar, Riffa, Tubli, Mahooz, Zinj, Hidd, Muharraq, Sanad, Isa Town, Barbar and Hamala";

const answer = (raw) => {
  const q = raw.toLowerCase();

  if (/(rera|licen[sc]e|registered|registration|legal)/.test(q))
    return `Amazing Properties is a registered real estate company in Bahrain — Commercial Registration ${CONTACT.cr} and RERA Real Estate Brokers License ${CONTACT.rera}. You are dealing with a licensed brokerage.`;

  if (/(list my|sell my|advertis|rent out my)/.test(q))
    return `We would be glad to market your property. Our team handles presentation, advertising and enquiries, and keeps you updated throughout. Call ${CONTACT.phones[0]} or email ${CONTACT.email} and we will take it from there.`;

  if (/(hour|open|timing|when.*open)/.test(q))
    return `Our office is open ${CONTACT.hours}. Outside those hours, leave a message here or at ${CONTACT.email} and we will call you back.`;

  if (/(contact|phone|call|email|office|address|agent|human|person)/.test(q))
    return `You can reach our team on ${CONTACT.phones.join(", ")}, or email ${CONTACT.email}. The office is at ${CONTACT.address}.`;

  if (/(rent vs buy|buy or rent|should i buy|should i rent)/.test(q))
    return `It depends on how long you plan to stay. Under three years, renting usually keeps you flexible — we have furnished options from BD 160 a month. Staying longer, buying can make sense: for example a 4-bedroom apartment in Juffair is currently listed at BD 99,600. Tell me your budget and I can show you both sides.`;

  if (/(area|where|neighbou?rhood|which part)/.test(q) && !/(juffair|mahooz|zinj|sanad|barbar|hamala|seef|amwaj|saar|riffa|hidd|muharraq|isa town|tubli|manama)/.test(q))
    return `We cover most of Bahrain — ${areaList}. Juffair suits city living, Mahooz and Zinj are central and quieter, and Hamala and Barbar are popular for family villas. Tell me your budget and how many bedrooms you need.`;

  if (/(hi|hello|salam|good morning|good afternoon|hey)\b/.test(q) && q.length < 30)
    return `Good to hear from you. I can help you find a property to rent or buy in Bahrain — tell me the area, bedrooms and budget you have in mind.`;

  const purpose = /rent/.test(q) ? "rent" : /(buy|sale|purchase)/.test(q) ? "sale" : null;
  const bedsM = q.match(/(\d)\s*(?:bed|bhk|br)/);
  const beds = bedsM ? parseInt(bedsM[1], 10) : /studio/.test(q) ? 0 : null;
  const budgetM = q.match(/(?:under|below|max|up ?to|less than|around)\s*(?:bd\s*)?([\d,]+)/);
  const budget = budgetM ? parseInt(budgetM[1].replace(/,/g, ""), 10) : null;
  const loc = LOCATIONS.find((l) => q.includes(l.toLowerCase()));
  const type = /villa/.test(q) ? "Villa" : /studio/.test(q) ? "Studio" : /(apartment|flat)/.test(q) ? "Apartment" : null;

  if (purpose || beds !== null || budget !== null || loc || type) {
    let matches = PROPERTIES.filter((p) => {
      if (purpose && p.purpose !== purpose) return false;
      if (beds !== null && p.beds !== beds) return false;
      if (budget !== null && (p.price === null || p.price > budget)) return false;
      if (loc && p.location.toLowerCase() !== loc.toLowerCase()) return false;
      if (type && p.type !== type) return false;
      return true;
    });
    if (matches.length > 0) {
      const list = matches
        .slice(0, 3)
        .map((p) => `${p.title} — ${p.location}, ${p.priceLabel}`)
        .join("\n");
      const more = matches.length > 3 ? `\n…and ${matches.length - 3} more on the ${purpose === "sale" ? "For Sale" : "For Rent"} page.` : "";
      return `Here is what fits that right now:\n${list}${more}\nTap a listing on the site to view it, or call ${CONTACT.phones[0]} to arrange a viewing.`;
    }
    return `Nothing on our books matches that exactly today. The closest options are on the For Rent and For Sale pages — or call ${CONTACT.phones[0]} and an agent will check upcoming listings for you.`;
  }

  return `I can help you find a property, compare renting and buying, or put you in touch with an agent. Try something like "furnished 2 bedroom in Juffair under BD 450".`;
};

const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "agent",
      text: "Welcome to Amazing Properties. I can help you find a home or investment in Bahrain — tell me what you are looking for.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "agent", text: answer(q) }]);
    }, 750);
  };

  return (
    <>
      <motion.button
        type="button"
        data-testid="concierge-trigger-button"
        aria-label="Open Amazing Assistant"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className={`fixed bottom-5 right-5 z-[60] flex items-center gap-3 border border-gold/40 bg-charcoal py-2.5 pl-3 pr-4 text-ivory shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:bg-gold-dark ${
          open ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <Mark className="h-6 w-6 text-ivory" />
        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] min-[420px]:inline">
          Amazing Assistant
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="concierge-modal"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 z-[70] flex h-[78vh] w-full flex-col border border-sand bg-ivory shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)] sm:bottom-5 sm:right-5 sm:h-[560px] sm:max-h-[80vh] sm:w-[380px]"
            role="dialog"
            aria-label="Amazing Assistant chat"
          >
            <div className="flex items-center gap-3 border-b border-sand bg-charcoal px-4 py-3.5">
              <Mark className="h-8 w-8 text-ivory" />
              <div className="flex-1 leading-tight">
                <p className="font-display text-sm font-semibold text-ivory">Amazing Assistant</p>
                <p className="text-[11px] text-ivory/60">Property concierge — Bahrain</p>
              </div>
              <button
                type="button"
                aria-label="Close assistant"
                data-testid="concierge-close-button"
                onClick={() => setOpen(false)}
                className="p-1.5 text-ivory/70 transition-colors hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-line px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.from === "user"
                        ? "bg-charcoal text-ivory"
                        : "border border-sand bg-cream text-charcoal"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <p className="border border-sand bg-cream px-3.5 py-2.5 text-[13px] text-stone-500">
                    Typing…
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-sand px-4 pb-2 pt-3">
              <div className="mb-2 flex gap-2 overflow-x-auto no-scrollbar">
                {CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => send(c)}
                    className="whitespace-nowrap border border-sand px-3 py-1.5 text-[11px] text-stone-600 transition-colors hover:border-gold hover:text-charcoal"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 pb-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Area, bedrooms, budget…"
                  aria-label="Message the Amazing Assistant"
                  data-testid="concierge-input"
                  className="flex-1 border border-sand bg-transparent px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-400 focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  data-testid="concierge-send-button"
                  className="bg-charcoal p-2.5 text-ivory transition-colors hover:bg-gold-dark"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;
