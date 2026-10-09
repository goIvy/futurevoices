/* Shared by every Future Voices page: theme switch, color palettes and toast messages. */
(() => {
  const root = document.documentElement;
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const read = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  /* ---------- Light / dark ---------- */
  const applyTheme = () => {
    const saved = read("fv-theme");
    if (saved) root.dataset.theme = saved; else delete root.dataset.theme;
    const isDark = saved ? saved === "dark" : dark.matches;
    root.classList.toggle("is-dark", isDark);
    document.querySelectorAll("[data-theme-toggle]").forEach(b => {
      b.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      b.title = b.getAttribute("aria-label");
    });
  };
  dark.addEventListener("change", applyTheme);
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-theme-toggle]")) return;
    write("fv-theme", root.classList.contains("is-dark") ? "light" : "dark");
    applyTheme();
  });
  applyTheme();

  /* ---------- Color palettes ---------- */
  // The swatches show each palette's main colors. Their full light and dark values live in css/style.css.
  const PALETTES = [
    { id: "mint", name: "Mint", colors: ["#0f2e29", "#ff5e2e", "#ffd447", "#eaf3ef"] },
    { id: "ocean", name: "Ocean", colors: ["#0d2140", "#2563eb", "#ffcf3f", "#eaf1fb"] },
    { id: "grape", name: "Grape", colors: ["#2b1650", "#d93a72", "#ffc94a", "#f2eef9"] },
    { id: "classic", name: "Classic", colors: ["#141b33", "#c8102e", "#f2b705", "#f1f2f6"] }
  ];
  const applyPalette = id => {
    if (!PALETTES.some(p => p.id === id) || id === "mint") delete root.dataset.palette;
    else root.dataset.palette = id;
    document.querySelectorAll(".palette-menu [data-palette]").forEach(b =>
      b.setAttribute("aria-checked", String(b.dataset.palette === (root.dataset.palette || "mint"))));
  };
  applyPalette(read("fv-palette"));

  const end = document.querySelector(".nav-end");
  if (end) {
    const wrap = document.createElement("div");
    wrap.className = "palette-wrap";
    wrap.innerHTML = `
      <button class="icon-btn" type="button" id="palette-btn" aria-label="Change colors" title="Change colors" aria-expanded="false" aria-controls="palette-menu">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7.2" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/></svg>
      </button>
      <div class="palette-menu" id="palette-menu" role="menu" aria-label="Color palette" hidden>
        <p>Color palette</p>
        ${PALETTES.map(p => `<button type="button" role="menuitemradio" data-palette="${p.id}">
          <span class="swatch" aria-hidden="true">${p.colors.map(c => `<i style="background:${c}"></i>`).join("")}</span>${p.name}</button>`).join("")}
      </div>`;
    end.prepend(wrap);
    const btn = wrap.querySelector("#palette-btn"), menu = wrap.querySelector("#palette-menu");
    const setOpen = open => { menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); };
    btn.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", e => {
      const b = e.target.closest("[data-palette]");
      if (!b) return;
      write("fv-palette", b.dataset.palette);
      applyPalette(b.dataset.palette);
      setOpen(false);
      window.toast?.(`Colors changed to ${b.textContent.trim()}.`);
    });
    document.addEventListener("click", e => { if (!wrap.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) { setOpen(false); btn.focus(); } });
    applyPalette(root.dataset.palette || "mint");
  }

  /* ---------- Toasts ---------- */
  let box;
  window.toast = (msg, kind = "") => {
    if (!box) { box = document.createElement("div"); box.className = "toasts"; box.setAttribute("aria-live", "polite"); document.body.appendChild(box); }
    const t = document.createElement("div");
    t.className = "toast " + kind;
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 300); }, 3600);
  };
})();
