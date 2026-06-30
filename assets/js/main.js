const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const articlePreviews = document.querySelectorAll(".article-preview");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const previewAnimationMs = 320;

articlePreviews.forEach((preview) => {
  const summary = preview.querySelector("summary");
  const panel = preview.querySelector(".abstract-panel");

  if (!summary) {
    return;
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    if (preview.classList.contains("is-animating")) {
      return;
    }

    if (reducedMotion.matches) {
      preview.open = !preview.open;
      preview.classList.remove("is-closing", "is-animating");
      return;
    }

    if (preview.open) {
      preview.classList.add("is-closing", "is-animating");

      window.setTimeout(() => {
        preview.open = false;
        preview.classList.remove("is-closing", "is-animating");
      }, previewAnimationMs);

      return;
    }

    preview.open = true;
    preview.classList.add("is-opening", "is-animating");

    if (panel) {
      panel.getBoundingClientRect();
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        preview.classList.remove("is-opening");
      });
    });

    window.setTimeout(() => {
      preview.classList.remove("is-animating");
    }, previewAnimationMs);
  });
});
