// AUTH GUARD
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

// SIDEBAR NAV
document.querySelectorAll(".sidebar-nav li").forEach(item => {
  item.addEventListener("click", () => {
    // active sidebar item
    document.querySelectorAll(".sidebar-nav li").forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // switch section
    const sectionId = item.dataset.section;
    document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
  });
});

// MOCK AI
function generateAI() {
  document.getElementById("aiSummary").innerText =
    "Users appreciate the speed and simplicity. Most feedback suggests improving export performance and adding more voice options.";
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
