const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});
