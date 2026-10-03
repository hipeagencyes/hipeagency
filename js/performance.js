(() => {
  document.documentElement.classList.add("js");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#navigation");
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });
  if (
    "IntersectionObserver" in window &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.25 },
    );
    document
      .querySelectorAll(".capability")
      .forEach((el) => observer.observe(el));
  }
  const filters = document.querySelector(".work-filters");
  if (filters) {
    const cards = [...document.querySelectorAll(".editorial-work .project")];
    const status = document.createElement("p");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    filters.after(status);
    let selectedFilter = "all";
    const updateFilter = () => {
      let visible = 0;
      cards.forEach((card) => {
        const show =
          selectedFilter === "all" ||
          card.dataset.categories.split(" ").includes(selectedFilter);
        card.hidden = !show;
        if (show) visible++;
      });
      filters.querySelectorAll("button").forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.filter === selectedFilter),
        );
      });
      status.textContent =
        document.documentElement.lang === "en"
          ? `${visible} project${visible === 1 ? "" : "s"} shown`
          : `${visible} proyecto${visible === 1 ? "" : "s"} visible${visible === 1 ? "" : "s"}`;
    };
    filters.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        selectedFilter = button.dataset.filter;
        updateFilter();
      });
    });
    new MutationObserver(updateFilter).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }
})();
