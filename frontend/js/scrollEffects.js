// js/scrollEffects.js

document.addEventListener("DOMContentLoaded", () => {
  const animated = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          // stagger children if present
          const children = entry.target.querySelectorAll("[data-stagger]");
          children.forEach((el, i) => {
            el.style.transitionDelay = `${i * 120}ms`;
            el.classList.add("show");
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  animated.forEach(el => observer.observe(el));

  /* ===== Testimonial text color animation ===== */
  const testimonial = document.querySelector(".testimonial h2");
  if (!testimonial) return;

  window.addEventListener("scroll", () => {
    const rect = testimonial.getBoundingClientRect();
    const winH = window.innerHeight;

    if (rect.top < winH * 0.7) {
      testimonial.classList.add("active");
    }
  });
});
// Smooth scroll-based text color animation
const testimonialHeading = document.querySelector(".testimonial h2");

if (testimonialHeading) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        testimonialHeading.classList.add("in-view");
      } else {
        testimonialHeading.classList.remove("in-view");
      }
    },
    {
      threshold: 0.4, // slow + smooth
    }
  );

  observer.observe(testimonialHeading);
}
