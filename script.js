// Mobile nav toggle + dismissible announcement banner. No frameworks —
// this is a static site, so a few DOM listeners are all that's needed.

document.querySelectorAll(".nav-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const nav = btn.closest(".nav");
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

const BANNER_KEY = "hyaecord-banner-dismissed-v1";
const banner = document.querySelector(".banner");
if (banner) {
  if (localStorage.getItem(BANNER_KEY) === "1") {
    banner.hidden = true;
  }
  banner.querySelector(".banner-close")?.addEventListener("click", () => {
    banner.hidden = true;
    localStorage.setItem(BANNER_KEY, "1");
  });
}
