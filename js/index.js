// let theme = 0; // 0 - dark, 1 - light
const app = document.getElementById("app");

let currentEl = document.getElementById("home");

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      currentEl = entries[0].target;
    }
  },
  {
    threshold: [0.1],
  }
);

app.addEventListener("scrollend", (event) => {
  app.scroll({ top: currentEl.offsetTop, left: 0, behavior: "smooth" });
});

document.querySelectorAll(".section").forEach((element) => {
  observer.observe(element);
});
