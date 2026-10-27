import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mark } from "@/components/Logo";

const Preloader = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      data-testid="preloader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Mark className="h-14 w-14 text-charcoal" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="mt-5 font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-charcoal"
      >
        Amazing Properties
      </motion.p>
      <div className="mt-7 h-px w-44 overflow-hidden bg-sand">
        <motion.div
          className="h-full bg-gold"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.25 }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
