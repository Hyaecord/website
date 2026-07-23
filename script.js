// Mobile nav toggle + dismissible announcement banner. No frameworks —
// this is a static site, so a few DOM listeners are all that's needed.

document.querySelectorAll(".nav-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const nav = btn.closest(".nav");
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

// Opening a <details> via its #id anchor (e.g. the "Pronunciation" nav link)
// should reveal the content, not just scroll to a collapsed box.
function openDetailsFromHash() {
  const id = location.hash.slice(1);
  if (!id) return;
  const el = document.getElementById(id);
  if (el?.tagName === "DETAILS") {
    el.open = true;
    el.scrollIntoView({ block: "start" });
  }
}
openDetailsFromHash();
window.addEventListener("hashchange", openDetailsFromHash);

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
