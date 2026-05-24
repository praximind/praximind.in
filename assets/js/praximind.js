(function () {
  "use strict";

  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));

    window.addEventListener("load", () => {
      document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("visible"));
    });
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }
})();
