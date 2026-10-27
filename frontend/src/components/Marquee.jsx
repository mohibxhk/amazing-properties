import { LOCATIONS } from "@/data/properties";

const Marquee = () => {
  const row = [...LOCATIONS, ...LOCATIONS];
  return (
    <div className="overflow-hidden border-y border-sand bg-cream py-6" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-12">
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="whitespace-nowrap font-serif text-2xl italic text-charcoal/35">
              {name}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/50" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
