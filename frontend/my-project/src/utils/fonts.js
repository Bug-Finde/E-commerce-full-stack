/**
 * Loads Cormorant Garamond (display) + Lato (body) from Google Fonts.
 * Safe to call multiple times — no-ops if already injected.
 */
export function loadFonts() {
  const id = "mj-brand-fonts";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Lato:wght@300;400;700;900&display=swap";
  document.head.appendChild(link);
}
