export const Mark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <rect x="5.5" y="5.5" width="37" height="37" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M15 34 L24 13.5 L33 34"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
    />
    <path d="M18.6 26.5 L29.4 26.5" stroke="#C5A059" strokeWidth="2.4" strokeLinecap="square" />
  </svg>
);

const Logo = ({ light = false, compact = false }) => (
  <span className="flex items-center gap-3" data-testid="navbar-logo">
    <Mark className={compact ? "h-8 w-8" : "h-9 w-9"} />
    <span className="flex flex-col leading-none">
      <span
        className={`font-display text-sm font-semibold uppercase tracking-[0.22em] ${
          light ? "text-ivory" : "text-charcoal"
        }`}
      >
        Amazing
      </span>
      <span
        className={`mt-1 text-[10px] font-medium uppercase tracking-[0.34em] ${
          light ? "text-ivory/70" : "text-stone-500"
        }`}
      >
        Properties · Bahrain
      </span>
    </span>
  </span>
);

export default Logo;
