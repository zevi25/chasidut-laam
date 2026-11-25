// תפריט המבורגר למסכים צרים (טלפון, טאבלט, מחשב נייד קטן): כפתור בצד שמאל של הפס העליון,
// ובלחיצה נפתחת מגירה מהצד עם כל הקטגוריות, עמוד "על הרב גרין", הצהרת הנגישות, וואטסאפ וחיוג.
// הקטגוריות נלקחות מ-CATS (data.js), כך ששינוי בלוח הניהול מתעדכן גם כאן.
(function(){
  const css = document.createElement("style");
  css.textContent = `
.menu-btn{display:none;border:0;background:rgba(255,255,255,.16);color:#fff;width:46px;height:46px;border-radius:12px;cursor:pointer;align-items:center;justify-content:center;flex:0 0 auto}
.menu-btn:hover{background:rgba(255,255,255,.26)}
@media (max-width:1340px){
  .top .nav{display:none!important}
  .menu-btn{display:inline-flex}
  .top-in{justify-content:space-between}
  .top-in .phone{margin-inline-start:auto}
}
html.a11y-big .top .nav{display:none!important}
html.a11y-big .menu-btn{display:inline-flex}
html.a11y-big .top-in .phone{margin-inline-start:auto}
html.a11y-big .menu-drawer{width:min(440px,92vw);overflow:auto}
html.a11y-big .menu-body{overflow:visible;flex:none}
@media (max-width:420px){.top-in{gap:10px;padding-inline:14px}.top-in .phone{padding:7px 12px;font-size:0.875rem;letter-spacing:.03em}}
@media (max-width:350px){.top-in{gap:6px;padding-inline:10px}.top-in .phone{padding:6px 8px;font-size:.8rem}}
.menu-shade{position:fixed;inset:0;z-index:94;background:rgba(10,25,50,.45);opacity:0;transition:opacity .25s}
.menu-shade.open{opacity:1}
.menu-drawer{position:fixed;top:0;bottom:0;left:0;z-index:95;width:min(320px,86vw);background:#fff;display:flex;flex-direction:column;transform:translateX(-104%);transition:transform .28s ease;font-family:Heebo,system-ui,sans-serif}
.menu-drawer.open{transform:none;box-shadow:12px 0 40px rgba(0,0,0,.25)}
/* סגור = לא קיים: בלי צל, ובלי שמקלדת או קורא מסך ייכנסו אליו */
.menu-drawer[hidden]{display:none}
.menu-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:linear-gradient(100deg,#1666a8,#1279a8);color:#fff}
.menu-head b{font-family:"Suez One",serif;font-weight:400;font-size:1.375rem}
.menu-head button{border:0;background:rgba(255,255,255,.18);color:#fff;width:40px;height:40px;border-radius:10px;font-size:1.375rem;cursor:pointer}
.menu-body{overflow:auto;padding:10px 10px 18px;flex:1}
.menu-body h3{margin:10px 10px 6px;font-size:0.8125rem;color:#5b6475;font-weight:700;letter-spacing:.02em}
.menu-body a{display:flex;align-items:center;gap:10px;text-decoration:none;color:#1d2433;font-weight:700;font-size:1.0625rem;padding:11px 14px;border-radius:12px;border-inline-start:4px solid transparent}
.menu-body a:hover{background:#f4fafc}
.menu-body a.on{background:#e8f4f8;color:#1666a8;border-inline-start-color:#127a93}
.menu-body a.off{opacity:.35;pointer-events:none}
.menu-body hr{border:0;border-top:1px solid #e3e8ee;margin:10px 6px}
.menu-actions{display:grid;gap:8px;padding:12px 16px 18px;border-top:1px solid #e3e8ee}
.menu-actions a{display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;font-weight:800;border-radius:999px;padding:11px}
.menu-actions .wa{background:#178244;color:#fff}
.menu-actions .tel{border:2px solid #1666a8;color:#1666a8;direction:ltr}
html.menu-lock,html.menu-lock body{overflow:hidden}
`;
  document.head.appendChild(css);

  document.addEventListener("DOMContentLoaded", () => {
    const top = document.querySelector(".top-in"); if (!top) return;
    const onIndex = !!document.getElementById("cats");
    const cats = typeof CATS !== "undefined" ? CATS : [];
    const short = c => c.title.replace("תניא - ", "");
    // בעמוד הבית הקישורים גוללים לקטגוריה; בשאר העמודים הם מובילים לקטגוריה בעמוד הבית
    const href = id => (onIndex ? "#" : "index.html#") + id;
    const page = location.pathname.split("/").pop() || "index.html";
    const sections = [{ id:"featured", title:"★ מומלצים" }, ...cats.map(c => ({ id:c.id, title:short(c) }))];
    const waText = encodeURIComponent("שלום, אשמח לקבל פרטים על ספרי הרב גרין");

    const btn = document.createElement("button");
    btn.className = "menu-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "תפריט וקטגוריות"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "menu-drawer");
    btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
    top.appendChild(btn); // אחרון בשורה = צד שמאל, כי האתר מימין לשמאל

    const shade = document.createElement("div"); shade.className = "menu-shade"; shade.hidden = true;
    const drawer = document.createElement("nav");
    drawer.className = "menu-drawer"; drawer.id = "menu-drawer"; drawer.hidden = true; drawer.setAttribute("aria-label", "תפריט"); drawer.setAttribute("role", "dialog"); drawer.setAttribute("aria-modal", "true");
    drawer.innerHTML = '<div class="menu-head"><b>תפריט</b><button type="button" aria-label="סגירת התפריט">✕</button></div>'
      + '<div class="menu-body">'
      + (sections.length > 1 ? '<h3>קטגוריות</h3><div id="menu-cats">' + sections.map(x => '<a href="' + href(x.id) + '" data-id="' + x.id + '">' + x.title + '</a>').join("") + '</div><hr>' : '')
      + '<a href="' + (onIndex ? '#catalog' : 'index.html') + '"' + (page === "index.html" && !onIndex ? ' class="on"' : '') + '>כל הספרים</a>'
      + '<a href="about.html"' + (page === "about.html" ? ' class="on"' : '') + '>על הרב גרין</a>'
      + '<a href="accessibility.html"' + (page === "accessibility.html" ? ' class="on"' : '') + '>הצהרת נגישות</a>'
      + '</div>'
      + '<div class="menu-actions"><a class="wa" target="_blank" rel="noopener" href="https://wa.me/972546398851?text=' + waText + '">שאלה או הזמנה בוואטסאפ</a><a class="tel" href="tel:0546398851">054-6398851</a></div>';
    document.body.append(shade, drawer);
    // בעמוד ספר: מסמנים את הקטגוריה של הספר (הפס העליון כבר מסמן אותה)
    const navOn = document.querySelector("#nav a.on[href*='#']");
    if (navOn) { const id = navOn.getAttribute("href").split("#")[1]; const m = drawer.querySelector('#menu-cats a[data-id="' + id + '"]'); if (m) m.classList.add("on"); }

    const open = v => {
      if (v) { shade.hidden = drawer.hidden = false; void drawer.offsetWidth; shade.classList.add("open"); drawer.classList.add("open"); }
      else { shade.classList.remove("open"); drawer.classList.remove("open"); setTimeout(() => { if (!drawer.classList.contains("open")) shade.hidden = drawer.hidden = true; }, 280); }
      document.documentElement.classList.toggle("menu-lock", v);
      btn.setAttribute("aria-expanded", v);
      if (v) setTimeout(() => (drawer.querySelector("a.on") || drawer.querySelector("a")).focus(), 60); else btn.focus({ preventScroll:true });
    };
    // בעמוד הבית: לפני הפתיחה מעדכנים איזו קטגוריה מסומנת (markCurrent ב-index.html מאזין לגלילה)
    btn.onclick = () => { window.dispatchEvent(new Event("scroll")); open(true); };
    shade.onclick = () => open(false);
    drawer.querySelector(".menu-head button").onclick = () => open(false);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !drawer.hidden) open(false); });
    // כשהתפריט פתוח, Tab נשאר בתוכו
    drawer.addEventListener("keydown", e => {
      if (e.key !== "Tab") return;
      const f = [...drawer.querySelectorAll("a,button")].filter(x => x.offsetParent !== null && !x.classList.contains("off")), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // בעמוד הבית: גלילה לקטגוריה וסגירת התפריט
    drawer.addEventListener("click", e => {
      const a = e.target.closest("a"); if (!a) return;
      const h = a.getAttribute("href");
      if (onIndex && h.startsWith("#")) {
        e.preventDefault();
        const el = document.getElementById(h.slice(1));
        open(false);
        if (el) { history.replaceState(null, "", h); setTimeout(() => el.scrollIntoView(), 30); }
      } else if (!h.startsWith("tel:") && !a.target) open(false);
    });
  });
})();
