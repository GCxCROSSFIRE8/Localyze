// ----------------------------
// GLOBAL ROLE
window.role = null;

let currentSlide = 0;

// Splash → Intro after 2.5s
setTimeout(() => {
  showScreen("intro");
  startCarousel();
}, 2500);

// ----------------------------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

// ----------------------------
function startCarousel() {
  const slides = document.querySelectorAll(".slide");
  if (!slides || slides.length === 0) return;

  slides[currentSlide].classList.add("active");

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 2500);
}

// ----------------------------
function goToRole() {
  showScreen("role");
}

function selectRole(r) {
  window.role = r;
  const title = r === "seeker" ? "Create Seeker Account" : "Create Validator Account";
  const el = document.getElementById("authTitle");
  if (el) el.innerText = title;
  showScreen("auth");
}

// ----------------------------
function submitAuth() {
  // For now, skip trust screen
  showScreen("mapScreen");
}
