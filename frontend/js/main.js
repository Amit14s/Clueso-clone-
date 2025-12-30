// js/main.js

document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR DROPDOWNS ================= */
  document.querySelectorAll(".nav-item").forEach(item => {
    const dropdown = item.querySelector(".dropdown");

    if (!dropdown) return;

    let timeout;

    item.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
      dropdown.classList.add("open");
    });

    item.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {
        dropdown.classList.remove("open");
      }, 120);
    });
  });

  const navItems = document.querySelectorAll(".nav-item");
let activeDropdown = null;

navItems.forEach(item => {
  const dropdown = item.querySelector(".dropdown");

  item.addEventListener("mouseenter", () => {
    closeAll();
    dropdown.classList.add("open");
    activeDropdown = dropdown;
  });

  item.addEventListener("mouseleave", () => {
    dropdown.classList.remove("open");
    activeDropdown = null;
  });
});

function closeAll() {
  document.querySelectorAll(".dropdown").forEach(d => {
    d.classList.remove("open");
  });
}

/* Close dropdown when clicking outside */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-item")) {
    closeAll();
  }
});


  /* ================= BUILT FOR YOU VIDEO SWITCH ================= */
  const items = document.querySelectorAll(".built-item");
  const iframe = document.getElementById("builtIframe");

  items.forEach(btn => {
    btn.addEventListener("click", () => {
      items.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const id = btn.dataset.video;
      if (iframe && id) {
        iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;
      }
    });
  });

  /* ================= FAQ ACCORDION ================= */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-question");
    const a = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (!q || !a) return;

    q.addEventListener("click", () => {
      const open = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".faq-answer").style.height = 0;
        i.querySelector(".faq-icon").textContent = "+";
      });

      if (!open) {
        item.classList.add("open");
        a.style.height = a.scrollHeight + "px";
        if (icon) icon.textContent = "−";
      }
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".built-item");
  const iframe = document.getElementById("builtIframe");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // remove active from all
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const videoId = btn.dataset.video;
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
    });
  });
});
