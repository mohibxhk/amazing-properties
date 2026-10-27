import Reveal from "@/components/Reveal";

const PageHero = ({ overline, title, children }) => (
  <header className="bg-charcoal pb-16 pt-32 text-ivory lg:pb-20 lg:pt-40">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{overline}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {children && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">{children}</p>}
      </Reveal>
    </div>
  </header>
);

export default PageHero;
