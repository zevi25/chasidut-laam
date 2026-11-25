// סל הזמנה: נשמר בדפדפן של המבקר, ובסוף נשלח כהודעת וואטסאפ אחת (cart.html).
// כשתחובר סליקה, עמוד הסל הוא המקום לכפתור התשלום.
(function(){
  const KEY = "cart";
  const read = () => { try { const c = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(c) ? c : []; } catch { return []; } };
  const write = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {} refresh(); };
  const same = (a, b) => a.img === b.img && String(a.vols || "") === String(b.vols || "");
  const Cart = window.Cart = {
    items: read,
    count: () => read().reduce((n, x) => n + (x.vols ? x.vols.length : 1) * x.qty, 0),
    add(entry){ const c = read(), f = c.find(x => same(x, entry)); if (f) f.qty = Math.min(99, f.qty + entry.qty); else c.push({ img:entry.img, vols:entry.vols || null, qty:entry.qty }); write(c); },
    setQty(i, q){ const c = read(); if (!c[i]) return; if (q < 1) c.splice(i, 1); else c[i].qty = Math.min(99, q); write(c); },
    remove(i){ const c = read(); c.splice(i, 1); write(c); },
    clear(){ write([]); },
    toast(text){
      let t = document.getElementById("cart-toast");
      if (!t) { t = document.createElement("div"); t.id = "cart-toast"; t.setAttribute("role", "status"); document.body.append(t); }
      t.innerHTML = '<span>' + text + '</span><a href="cart.html">לסל ←</a>';
      t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 4500);
    }
  };
  const css = document.createElement("style");
  css.textContent = `
.cart-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,.16);color:#fff;text-decoration:none}
.cart-btn:hover{background:rgba(255,255,255,.26)}
.cart-btn b{position:absolute;top:-5px;inset-inline-end:-5px;min-width:22px;height:22px;padding:0 5px;border-radius:999px;background:#f3b552;color:#1d2433;font:800 .8125rem/22px Heebo,sans-serif;text-align:center}
.cart-btn b:empty{display:none}
@media (max-width:600px){html:not(.has-cart) .cart-btn{display:none}}
@media (max-width:430px){html.has-cart .top-in .phone{font-size:0;width:44px;height:44px;padding:0;justify-content:center;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231666a8'%3E%3Cpath d='M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z'/%3E%3C/svg%3E") center/22px no-repeat}}
#cart-toast{position:fixed;inset-inline:16px;bottom:18px;z-index:96;max-width:440px;margin:0 auto;background:#1d2433;color:#fff;border-radius:14px;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;font:500 1rem Heebo,sans-serif;box-shadow:0 14px 30px rgba(0,0,0,.3);transform:translateY(160%);transition:transform .25s}
#cart-toast.show{transform:none}
#cart-toast a{color:#f3b552;font-weight:800;text-decoration:none;white-space:nowrap;padding:6px 0}
.add{position:absolute;bottom:-16px;inset-inline-start:-10px;z-index:2;width:44px;height:44px;border-radius:50%;border:0;background:var(--ribbon,#127a93);color:#fff;display:grid;place-items:center;cursor:pointer;box-shadow:0 6px 14px rgba(0,0,0,.18)}
.add:hover{filter:brightness(1.1)}
.add.done{background:#157a3f}
@media (max-width:600px){.add{width:40px;height:40px;bottom:-12px;inset-inline-start:-6px}}
`;
  document.head.appendChild(css);
  const ICON = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>';
  window.ICON_CART = ICON;
  let btn;
  function refresh(){
    const n = Cart.count();
    document.documentElement.classList.toggle("has-cart", n > 0);
    if (btn) { btn.querySelector("b").textContent = n || ""; btn.setAttribute("aria-label", n ? "סל ההזמנה: " + n + " פריטים" : "סל ההזמנה (ריק)"); }
  }
  document.addEventListener("DOMContentLoaded", () => {
    const phone = document.querySelector(".top-in .phone");
    if (phone) { btn = document.createElement("a"); btn.className = "cart-btn"; btn.href = "cart.html"; btn.innerHTML = ICON + "<b></b>"; phone.after(btn); }
    refresh();
    // כפתור "הוספה לסל" בכרטיסים של הקטלוג
    document.addEventListener("click", e => {
      const a = e.target.closest(".add"); if (!a) return;
      e.preventDefault();
      Cart.add({ img:a.dataset.img, qty:1 });
      a.classList.add("done"); setTimeout(() => a.classList.remove("done"), 1500);
      Cart.toast('"' + a.dataset.name + '" נוסף לסל');
    });
  });
  window.addEventListener("storage", e => { if (e.key === KEY) refresh(); });
})();
