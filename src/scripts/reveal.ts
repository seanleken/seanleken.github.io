/**
 * Scroll-triggered reveals — replaces Framer Motion's useInView/whileInView.
 *
 * Elements opt in with `data-reveal` (and optionally `--d` for a stagger
 * delay); this adds `.in-view` once, then stops observing. All the actual
 * motion lives in styles/components/reveal.css, so `prefers-reduced-motion`
 * is handled entirely in CSS — unlike the Framer version, which had to gate
 * every animation prop behind useReducedMotion() in JS.
 */
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("in-view"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -50px 0px" },
  );
  targets.forEach((el) => io.observe(el));
}
