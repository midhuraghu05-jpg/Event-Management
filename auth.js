// js/auth.js

document.addEventListener("DOMContentLoaded", () => {

  const USER_KEY = "user";        
  const LOGGED_KEY = "loggedUser";  

  // ---- LOGIN ----
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const email = document.getElementById("loginEmail").value.trim();
          const pass = document.getElementById("loginPass").value.trim();

          const stored = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

          if (stored.email === email && stored.password === pass) {
              localStorage.setItem(LOGGED_KEY, email);

              alert("Login successful!");
              location.href = "dashboard.html";
          } else {
              alert("Incorrect email or password");
          }
      });
  }

  // ---- SIGNUP ----
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
      signupBtn.addEventListener("click", () => {
          const name = document.getElementById("signupName").value.trim();
          const email = document.getElementById("signupEmail").value.trim();
          const pass = document.getElementById("signupPass").value.trim();

          if (!name || !email || !pass) {
              alert("All fields required");
              return;
          }

          const userObj = { name, email, password: pass };
          localStorage.setItem(USER_KEY, JSON.stringify(userObj));

          alert("Signup successful! Please login.");
          location.href = "login.html";
      });
  }

});
