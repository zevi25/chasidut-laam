// כלי נגישות לכל עמודי האתר: קישור "דילוג לתוכן", תפריט נגישות (גודל טקסט, ניגודיות, הדגשת קישורים, עצירת אנימציות),
// וקישורים להצהרת הנגישות, לתקנון ולמדיניות הפרטיות בתחתית כל עמוד. ההגדרות נשמרות בדפדפן של המבקר.
(function(){
  // העמודים המשפטיים שמופיעים בתחתית. התקנון ומדיניות הפרטיות יתווספו כשיהיו פרטי המוכר
  const LEGAL = [["accessibility.html", "הצהרת נגישות"]];
  const KEY = "a11y";
  let st = {};
  try { st = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  const root = document.documentElement;
  const apply = () => {
    root.style.fontSize = st.size ? (100 + st.size * 25) + "%" : "";
    root.classList.toggle("a11y-big", !!st.size);
    root.classList.toggle("a11y-contrast", !!st.contrast);
    root.classList.toggle("a11y-links", !!st.links);
    root.classList.toggle("a11y-still", !!st.still);
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {}
    window.dispatchEvent(new Event("resize")); // גובה הפס העליון משתנה עם הטקסט
  };
  apply();

  const css = document.createElement("style");
  css.textContent = `
.skip{position:absolute;inset-inline-start:12px;top:0;transform:translateY(-120%);z-index:100;background:#fff;color:#1666a8;font-weight:800;padding:10px 18px;border-radius:10px;text-decoration:none}
.skip:focus{top:12px;transform:none;box-shadow:0 6px 20px rgba(0,0,0,.25)}
:focus-visible{outline:3px solid #f3b552!important;outline-offset:2px}
.a11y-btn{position:fixed;bottom:16px;inset-inline-end:16px;z-index:90;width:50px;height:50px;border-radius:50%;border:0;background:#1666a8;color:#fff;font-size:1.625rem;cursor:pointer;box-shadow:0 8px 20px rgba(10,40,90,.3);display:flex;align-items:center;justify-content:center}
.a11y-panel{position:fixed;bottom:76px;inset-inline-end:16px;z-index:90;width:260px;max-width:calc(100vw - 32px);background:#fff;color:#1d2433;border-radius:18px;box-shadow:0 18px 40px rgba(10,30,70,.28);padding:14px;font-family:Heebo,system-ui,sans-serif;font-size:0.9375rem}
.a11y-panel h2{font-size:1.125rem;margin:2px 4px 10px;color:#1c4f9c}
.a11y-panel button,.a11y-panel a{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;border:2px solid #e3e8ee;background:#fff;color:#1d2433;border-radius:12px;padding:9px 12px;margin-bottom:6px;font:inherit;font-weight:700;cursor:pointer;text-decoration:none}
.a11y-panel button[aria-pressed=true]{border-color:#127a93;background:#e8f4f8;color:#1666a8}
.a11y-panel .size{display:flex;gap:6px}
.a11y-panel .size button{justify-content:center}
.a11y-panel a{color:#1666a8}
/* במסך עם תפריט המבורגר הכפתור נמצא בפס העליון, כדי שלא יסתיר תוכן. במחשב רחב הוא צף בפינה */
@media (max-width:1340px){
  .a11y-btn{position:static;width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,.16);box-shadow:none;flex:0 0 auto}
  .a11y-btn:hover{background:rgba(255,255,255,.26)}
  .a11y-panel{bottom:auto;top:calc(var(--top-h,76px) + 8px);inset-inline-end:12px;max-height:calc(100vh - var(--top-h,76px) - 24px);overflow:auto}
}
html.a11y-big .a11y-panel{width:min(400px,calc(100vw - 24px));max-height:calc(100vh - 100px);overflow:auto}
html.a11y-big .desc{display:block;overflow:visible}
html.a11y-big .ribbon,html.a11y-big h1,html.a11y-big h2{overflow-wrap:anywhere}
html.a11y-big .btn,html.a11y-big .cat-title,html.a11y-big .nav a{white-space:normal}
html.a11y-big .btn-lg{min-width:0}
html.a11y-big .book .body{padding-bottom:4.5rem}
html.a11y-big .top-in{flex-wrap:nowrap}
@media (max-width:600px){
  html.a11y-big .grid:not(.feat-grid),html.a11y-big .related .grid{grid-template-columns:minmax(0,1fr)}
  html.a11y-big .grid.feat-grid .book{flex-basis:84%}
  html.a11y-big .top-in .phone{display:none}
  html.a11y-big .a11y-btn{margin-inline-start:auto}
  html.a11y-big .cat-title{padding-inline:16px;max-width:100%}
}
html.a11y-contrast{filter:contrast(1.35)} /* על html ולא על body: כך הכפתורים הצפים נשארים במקום */
html.a11y-contrast .desc,html.a11y-contrast .cat-intro,html.a11y-contrast p{color:#000!important}
html.a11y-contrast .a11y-panel button,html.a11y-contrast .a11y-panel a,html.a11y-contrast .vol,html.a11y-contrast .qty{border-color:#5b6475}
html.a11y-links a{text-decoration:underline!important;text-underline-offset:3px}
html.a11y-still *,html.a11y-still *::before,html.a11y-still *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
.legal-links{margin-top:14px;font-size:0.875rem;display:flex;gap:6px 14px;justify-content:center;flex-wrap:wrap}
.legal-links a{color:#5b6475}
`;
  document.head.appendChild(css);

  document.addEventListener("DOMContentLoaded", () => {
    // דילוג לתוכן: לאזור התוכן הראשי של העמוד
    const main = document.querySelector("#catalog, main, #page");
    if (main) {
      if (!main.id) main.id = "content";
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      const skip = document.createElement("a");
      skip.className = "skip"; skip.href = "#" + main.id; skip.textContent = "דילוג לתוכן";
      document.body.prepend(skip);
    }
    // קישורים משפטיים בתחתית
    const foot = document.querySelector("footer.foot");
    if (foot) foot.insertAdjacentHTML("beforeend",
      '<nav class="legal-links" aria-label="מידע משפטי">' + LEGAL.map(([href, label]) => '<a href="' + href + '">' + label + '</a>').join("") + '</nav>');

    // תפריט נגישות
    const btn = document.createElement("button");
    btn.className = "a11y-btn"; btn.type = "button"; btn.setAttribute("aria-label", "תפריט נגישות"); btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><circle cx="12" cy="4" r="2"/><path d="M19 8.5c0 .6-.4 1-1 1.1l-4 .5v3.4l2 6.3c.2.6-.1 1.1-.7 1.3-.5.2-1.1-.1-1.3-.6L12 15h0l-2 5.5c-.2.5-.8.8-1.3.6-.6-.2-.9-.7-.7-1.3l2-6.3v-3.4l-4-.5c-.6-.1-1-.5-1-1.1 0-.6.5-1.1 1.1-1l5.9.6 5.9-.6c.6-.1 1.1.4 1.1 1z"/></svg>';
    const panel = document.createElement("div");
    panel.className = "a11y-panel"; panel.hidden = true; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "הגדרות נגישות");
    const toggle = (k, label) => '<button type="button" data-k="' + k + '" aria-pressed="' + !!st[k] + '">' + label + '</button>';
    panel.innerHTML = '<h2>נגישות</h2>'
      + '<div class="size"><button type="button" data-size="1" aria-label="הגדלת טקסט">א+</button><button type="button" data-size="-1" aria-label="הקטנת טקסט">א-</button></div>'
      + toggle("contrast", "ניגודיות גבוהה") + toggle("links", "הדגשת קישורים") + toggle("still", "עצירת אנימציות")
      + '<button type="button" data-reset="1">איפוס הגדרות</button>'
      + '<a href="accessibility.html">הצהרת נגישות ←</a>';
    (document.querySelector(".top-in") || document.body).append(btn); // לפני כפתור ההמבורגר, שנוסף ב-menu.js
    document.body.append(panel);
    const setTop = () => { const t = document.querySelector(".top"); if (t) root.style.setProperty("--top-h", t.offsetHeight + "px"); };
    setTop(); window.addEventListener("resize", setTop);
    const open = v => { panel.hidden = !v; btn.setAttribute("aria-expanded", v); if (v) panel.querySelector("button").focus(); };
    btn.onclick = () => open(panel.hidden);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) { open(false); btn.focus(); } });
    panel.onclick = e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.size) st.size = Math.max(0, Math.min(4, (st.size || 0) + +b.dataset.size));
      else if (b.dataset.k) { st[b.dataset.k] = !st[b.dataset.k]; b.setAttribute("aria-pressed", !!st[b.dataset.k]); }
      else if (b.dataset.reset) { st = {}; panel.querySelectorAll("[data-k]").forEach(x => x.setAttribute("aria-pressed", "false")); }
      apply();
    };
  });
})();
