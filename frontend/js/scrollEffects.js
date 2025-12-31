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


const textEl = document.getElementById("empowerText");

// 1. Split text into words
const words = textEl.innerText.split(" ");
textEl.innerHTML = words
  .map(word => `<span>${word}&nbsp;</span>`)
  .join("");

const spans = Array.from(textEl.querySelectorAll("span"));

function updateWordColors() {
  const rect = textEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Progress from 0 → 1 as text moves through viewport
  const progress = 1 - Math.min(
    Math.max((rect.top - viewportHeight * 0.3) / (viewportHeight * 0.4), 0),
    1
  );

  const activeWords = Math.floor(progress * spans.length);

  spans.forEach((span, index) => {
    if (index < activeWords) {
      span.classList.add("active");
    } else {
      span.classList.remove("active");
    }
  });
}

// Listen to scroll
window.addEventListener("scroll", updateWordColors);
window.addEventListener("load", updateWordColors);
