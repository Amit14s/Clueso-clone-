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
// LOAD FEEDBACK
loadFeedback();
async function loadFeedback() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/feedback", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const list = document.getElementById("feedbackList");
  list.innerHTML = "";

  data.forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `⭐ ${f.rating} – ${f.message}`;
    list.appendChild(li);
  });
}

// SUBMIT FEEDBACK
document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const rating = document.getElementById("rating").value;
  const message = document.getElementById("message").value;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ rating, message })
    });

    const data = await res.json();
    console.log("API response:", data);

    if (!res.ok) {
      alert(data.message || "Failed to submit feedback");
      return;
    }

    // ✅ SUCCESS FLOW
    document.getElementById("feedbackForm").reset();
    loadFeedback(); // reload list
    alert("Feedback submitted successfully");

  } catch (err) {
    console.error(err);
    alert("Network/server error");
  }
});
