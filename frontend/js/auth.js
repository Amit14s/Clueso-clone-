console.log("auth.js loaded");

const API_BASE = "http://localhost:5000/api";

/* ================= UTIL ================= */
function showError(msg) {
  alert(msg); // later you can replace with toast
}

function saveToken(token) {
  localStorage.setItem("clueso_token", token);
}

/* ================= PASSWORD TOGGLE ================= */
function togglePassword(el) {
  const input = el.previousElementSibling;
  input.type = input.type === "password" ? "text" : "password";
}

/* ================= LOGIN ================= */

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ SAVE TOKEN
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ REDIRECT
    window.location.href = "dashboard.html";

  } catch (err) {
    alert("Server error. Try again.");
  }
});



/* ================= SIGNUP ================= */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName.value} ${lastName.value}`,
          email: signupEmail.value,
          password: signupPassword.value
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      saveToken(data.token);
      window.location.href = "index.html";

    } catch (err) {
      showError(err.message || "Signup failed");
    }
  });
}

/* ================= FORGOT PASSWORD ================= */
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail.value
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Password reset link sent to your email.");

    } catch (err) {
      showError(err.message || "Failed to send reset link");
    }
  });
}

/* ================= RESET PASSWORD ================= */
const resetForm = document.getElementById("resetForm");
if (resetForm) {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!token) return showError("Invalid or missing token");

    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: newPassword.value
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Password updated successfully");
      window.location.href = "login.html";

    } catch (err) {
      showError(err.message || "Reset failed");
    }
  });
}

/* ================= GOOGLE LOGIN ================= */
const googleBtn = document.querySelector(".google-auth");
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    window.location.href = `${API_BASE}/auth/google`;
  });
}
