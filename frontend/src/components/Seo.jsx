import { useEffect } from "react";

const Seo = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
};

export default Seo;
