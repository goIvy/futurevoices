/* Shared by every Future Voices page: theme switch and toast messages. */
(() => {
  const root = document.documentElement;
  const KEY = "fv-theme";
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const write = v => { try { localStorage.setItem(KEY, v); } catch {} };

  const apply = () => {
    const saved = read();
    if (saved) root.dataset.theme = saved; else delete root.dataset.theme;
    const isDark = saved ? saved === "dark" : dark.matches;
    root.classList.toggle("is-dark", isDark);
    document.querySelectorAll("[data-theme-toggle]").forEach(b => {
      b.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      b.title = b.getAttribute("aria-label");
    });
  };
  dark.addEventListener("change", apply);
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-theme-toggle]")) return;
    write(root.classList.contains("is-dark") ? "light" : "dark");
    apply();
  });
  apply();

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
