// פונקציות עזר לקטלוג ולעמודי הספרים. הנתונים עצמם ב-data.js
const PHONE_INTL = "972546398851";
const wa = t => "https://wa.me/" + PHONE_INTL + "?text=" + encodeURIComponent(t);

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

// סימן השקל בגופן נפרד: בגופנים של האתר (Heebo, Suez One) הוא מצויר כמו ש"ח
const NIS = '<span class="nis">₪</span>';
function priceTag(b){
  if (b.hidePrice) return "";
  if (b.price === "sold") return '<span class="tag sold">אזל</span>';
  if (b.price == null)   return '<span class="tag ask">מחיר בטלפון</span>';
  return '<span class="tag">' + b.price + NIS + (b.per ? ' <small>לכרך</small>' : '') + '</span>';
}
function orderLink(b){
  if (b.hidePrice) return "";
  const t = b.price === "sold"
    ? 'שלום, רציתי לברר אם הספר "' + b.name + '" צפוי לחזור למלאי'
    : 'שלום, אשמח להזמין את הספר "' + b.name + '"';
  return '<a class="order" target="_blank" rel="noopener" href="' + wa(t) + '">' + (b.price === "sold" ? "לברר על הדפסה חוזרת" : "להזמנה בוואטסאפ") + ' ←</a>';
}

// כל הפריטים (סדרות וספרים) ברשימה אחת. img הוא המזהה של הספר, גם בכתובת של עמוד הספר (book.html?b=lemaan)
const allItems = CATS.flatMap(c => [...(c.series || []).map(x => ({ ...x, cat:c, isSeries:true })), ...c.books.map(x => ({ ...x, cat:c }))]);
const findItem = id => allItems.find(x => x.img === id);
const bookUrl = b => "book.html?b=" + encodeURIComponent(b.img);
const short = c => c.title.replace("תניא - ", "");

// סליקה: כשתחובר מערכת סליקה (למשל קארדקום), מדליקים כאן ומוסיפים לכל ספר payUrl, ובעמוד הספר יופיע כפתור "לתשלום מאובטח".
// עד אז ההזמנה נשלחת בוואטסאפ.
const CHECKOUT = { enabled:false };
