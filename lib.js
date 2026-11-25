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
// באתר החי לכל ספר יש עמוד קבוע (book-lemaan.html), כדי שבוואטסאפ ובגוגל יופיעו הכריכה והשם שלו. build.mjs בונה אותם ומדליק את BUILT
var BUILT = true;
const bookUrl = b => BUILT ? "book-" + encodeURIComponent(b.img) + ".html" : "book.html?b=" + encodeURIComponent(b.img);
const short = c => c.title.replace("תניא - ", "");

// סליקה: כשתחובר מערכת סליקה (למשל קארדקום), מדליקים כאן ומוסיפים לכל ספר payUrl, ובעמוד הספר יופיע כפתור "לתשלום מאובטח".
// עד אז ההזמנה נשלחת בוואטסאפ.
const CHECKOUT = { enabled:false };

// אייקונים לכפתורים
const ICON_WA = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';
const ICON_BOOK = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0A2 2 0 0 0 6 22h13"/></svg>';

// ===== חיפוש =====
// מילים נוספות שמוצאות את כל הספרים של הקטגוריה (חוץ משם הקטגוריה עצמה)
const SEARCH_EXTRA = { tanya:"תניא משכיל לאיתן ביאור", haashara:"תניא", kids:"תניא ילדים", english:"אנגלית english", moadim:"חגים" };
// בלי ניקוד, בלי גרשיים מכל סוג, ומקפים ונקודות הופכים לרווח
const searchNorm = s => String(s || "").toLowerCase().replace(/[\u0591-\u05C7]/g, "").replace(/["'`\u05F3\u05F4\u2018\u2019\u201C\u201D\u201E]/g, "").replace(/[^\u05D0-\u05EAa-z0-9]+/g, " ").trim();
// כתיב מלא וחסר: מתעלמים מ-ו' ומ-י' באמצע המילה ("ליקוטי" = "לקוטי", "ביאור" = "באור")
const searchBone = w => w.length < 3 ? w : w[0] + w.slice(1, -1).replace(/[וי]/g, "") + w.slice(-1);
const searchText = (name, desc, cat) => searchNorm([name, desc, cat.title, SEARCH_EXTRA[cat.id]].join(" "));
function searchMatch(text, query){
  const words = text.split(" "), forms = words.flatMap(w => /^[ובהלכמש]/.test(w) && w.length > 4 ? [w, w.slice(1)] : [w]).map(searchBone);
  return searchNorm(query).split(" ").filter(Boolean).every(t => {
    if (text.includes(t)) return true;
    const b = searchBone(t);
    return b.length >= 3 && /[א-ת]/.test(b) && forms.some(f => f === b || (b.length >= 4 && f.startsWith(b)));
  });
}
