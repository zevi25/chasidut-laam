// נתוני האתר: קטגוריות, ספרים, מומלצים ותמונות.
// הקובץ הזה נכתב גם מלוח הניהול (admin.html). אפשר לערוך אותו ידנית, אבל צריך לשמור על המבנה.
// מחיר: מספר · "sold" = אזל · null = מחיר בטלפון. per:true = המחיר לכרך.
// volumes: הכרכים של סדרה לפי הסדר, כמו שכתובים על הכריכות. null = עוד לא ידוע הטווח.
// img: המזהה של הספר. זה גם שם הקובץ ב-covers/ וגם הכתובת של עמוד הספר (book.html?b=...).
const CATS = [
  { id:"tanya", title:"תניא", intro:"סדרת הספרים \"משכיל לאיתן\": ריכוז ביאורי האדמו\"רים על התניא, בביאור שוטף וקולע, עם הגדרות וסיכומים המאפשרים גם לימוד עצמי.",
    series:[
      {"img":"likutei","name":"לקוטי אמרים","desc":"באור משכיל לאיתן, על לקוטי אמרים · 7 כרכים","price":55,"per":true,"volumes":["א-יב","יג-כח","כט-לו","לז-מ","מא-מג","מד-מח","מט-נג"],"volWord":"פרקים"},
      {"img":"kodesh","name":"אגרת הקודש","desc":"באור משכיל לאיתן, על אגרת הקודש · 8 כרכים","price":55,"per":true,"volumes":["א-ה","ו-יא","יב-טו","טז-כ","כא-כו",null,null,null],"volWord":"אגרות"}
    ],
    books:[
      {"img":"shaar","name":"שער היחוד והאמונה","desc":"באור משכיל לאיתן, על שער היחוד והאמונה · 3 כרכים","price":55,"per":true,"volumes":["א-ו","ז-ח","ט-יב"],"volWord":"פרקים"},
      {"img":"chinuch","name":"חנוך לנער","desc":"באור משכיל לאיתן, על הקדמת שער היחוד והאמונה - \"חנוך לנער\"","price":40},
      {"img":"teshuva","name":"אגרת התשובה","desc":"באור משכיל לאיתן, על אגרת התשובה","price":55},
      {"img":"histalkut","name":"אגרת ההסתלקות","desc":"אגרת הקודש כ\"ז - אגרת ההסתלקות","price":40},
      {"img":"kuntres-ag","name":"קונטרס אחרון א-ג","desc":"באור משכיל לאיתן, על קונטרס אחרון פרקים א-ג","price":40},
      {"img":"kuntres-dt","name":"קונטרס אחרון ד-ט","desc":"באור משכיל לאיתן, על קונטרס אחרון פרקים ד-ט","price":55}
    ] },
  { id:"haashara", title:"תניא - ספרי העשרה",
    books:[
      {"img":"tiferet","name":"תפארת התניא","desc":"פרקי מבוא בסיסיים להכרת התניא.","price":40},
      {"img":"leiyun","name":"תניא לעיון","desc":"הבהרת מושגים בסיסיים המתבארים בתניא, ביסודיות.","price":50},
      {"img":"teshuva-derech","name":"התשובה בדרך הנכונה","desc":"ביאור אגרת התשובה למתחילים, בהיכרות ראשונה. בשילוב סיפורים מהחיים והסברים כלליים.","price":50},
      {"img":"machshevet","name":"מחשבת התניא","desc":"סיכומים כלליים בשפה עממית, המבהירים את הנושאים השונים המתבארים לאורך התניא בחמשה עשר הפרקים הראשונים.","price":"sold"}
    ] },
  { id:"kids", title:"תניא לילדים", intro:"באור מנוקד לתניא בשפה ובסגנון קל, המובן גם לצעירי הצאן, עם שאלות לתלמיד לשינון ולחזרה שנערכו על ידי אנשי חינוך. הספר נלמד במוסדות חב\"ד בגילאים 7-13.",
    series:[
      {"img":"kids-set","name":"תניא לילדים (3 חלקים)","desc":"באור מנוקד לתניא בשפה ובסגנון קל, עם שאלות לתלמיד לשינון ולחזרה.","price":null}
    ],
    books:[
      {"img":"kids-a","name":"פרק א'","desc":"הכרות עם התניא, וביאור פרק א'.","price":"sold"},
      {"img":"kids-tet","name":"פרק ט'","desc":"ביאור פרק ט'. המאבק בין היצרים כמלחמת עולם.","price":40},
      {"img":"kids-lb","name":"פרק ל\"ב","desc":"ביאור פרק ל\"ב העוסק בעניין אהבת ישראל.","price":"sold"}
    ] },
  { id:"ahavat", title:"אהבת ישראל", intro:"אהבת ישראל אינה רק סיסמה, אלא נושא עיוני רחב ובו היבטים רבים ומגוונים, כפי שהם מתועדים בחמשת הספרים.",
    series:[
      {"img":"ahavat-set","name":"ספרי אהבת ישראל","desc":"חמשה ספרים על אהבת ישראל באור החסידות.","price":null,"hidePrice":true}
    ],
    books:[
      {"img":"ahavat-tanya","name":"אהבת ישראל בלב התניא","desc":"ביאור מורחב על פרק ל\"ב שבתניא, ובו מודגש ההבדל בין התניא לספרות התורנית שקדמה לגילוי החסידות.","price":40},
      {"img":"ahavat-tzemach","name":"אהבת ישראל במשנת הצ\"צ","desc":"ביאור המאמר בנושא זה המופיע בספר דרך מצוותיך, שבמרכזו האחדות הנדרשת מישראל המהווה הכנה להתעלות בתפילה.","price":40},
      {"img":"ahavat-rashab","name":"אהבת ישראל במשנת הרש\"ב","desc":"ביאור המאמר המפורסם הנקרא \"החלצו - רנ\"ט\", מאמר עיוני אודות מניעת שנאת חינם ועשיית השלום בפמליה של מעלה ומטה.","price":50},
      {"img":"ahavat-rayatz","name":"אהבת ישראל במשנת הריי\"צ","desc":"מאמרו של הרבי בסגנון קל, אודות שנאת חנם ודרכי מניעתה.","price":40},
      {"img":"ahava-achdut","name":"אהבה ואחדות באור החסידות","desc":"הוראות מגוונות של ה\"בעל שם טוב\" וה\"מגיד ממעזריטש\" כפי שהם משתקפים במבטם של אדמו\"רי חב\"ד.","price":50}
    ] },
  { id:"maamarim", title:"חסידות לעם", intro:"סדרת המאמרים המבוארים: מאמרים נבחרים של האדמו\"רים העוסקים בנושאים בסיסיים בחסידות, מנוקדים, ערוכים בצורה נאה ומבוארים היטב בשפה קלה. מיועדים לכל חסיד, ומומלצים ללימוד עם נוער ומקורבים.",
    series:[
      {"img":"maamarim-set","name":"סדרת המאמרים המבוארים","desc":"","price":null,"hidePrice":true}
    ],
    books:[
      {"img":"yetziat","name":"יציאת מצרים \"בכל דור ודור\"","desc":"מאמרו של הרבי העוסק ביציאה מהמיצרים וההגבלות הנערמים בדרכו של היהודי בעבודת בוראו.","price":40},
      {"img":"veata","name":"\"ואתה תצווה\"","desc":"המאמר האחרון שהרבי הגיהה וחלקו בידו הקדושה לחסידים. עוסק בהחדרת האמונה בישראל והבאתה לידי גילוי פנימי בנפש הבהמית.","price":50},
      {"img":"chayei","name":"\"חיי עולם וחיי שעה\"","desc":"מאמר בסיסי של הרבי הריי\"צ אודות היצרים והנפשות ויסודות היהדות, בשילוב פרקים בחינוך והכרת יסודות החסידות.","price":40},
      {"img":"bati","name":"\"באתי לגני\"","desc":"מאמרו של הרבי הריי\"צ, שמסרו לחסידים ללמודו בשבת י' שבט, יום הסתלקותו.","price":45},
      {"img":"kinyan","name":"קנין החיים","desc":"מאמר הרבי הריי\"צ אודות החיים והאושר עם התשובה בראש השנה.","price":40},
      {"img":"lemaan","name":"למען דעת","desc":"מאמר הרבי הריי\"צ אודות ההתרחקות מן המותרות ותענוגות העולם, ועשיית הכלים המתאימים לברכת ה' ש\"היא תעשיר\".","price":40,"isNew":true},
      {"img":"kuntres-maayan","name":"קונטרס ומעיין מבית ה'","desc":"מאמר בסיסי של הרבי הרש\"ב, בו הוא מבהיר את צורת החיים הנכונה המתאימה ליהודי.","price":60},
      {"img":"hashem-echad","name":"ה' אחד","desc":"מאמרו של הרבי הריי\"צ אודות אחדות הבורא, והשגחה פרטית על כלל ישראל ועל כל אחד.","price":40},
      {"img":"ohalei","name":"באהלי צדיקים","desc":"ביאור מאמרו המפורסם של אדמו\"ר האמצעי הנקרא קונטרס ההשתטחות, ובו תיאור נפלא למעלות התפילה והביקור על קברי צדיקים.","price":50},
      {"img":"tefillin","name":"התפילין במשנת חב\"ד","desc":"המאמר לבר המצווה אודות מהותה של מצוות תפילין. מנוקד ומבואר בטוב טעם. מומלץ לעיון לכל מניחי התפילין.","price":45}
    ] },
  { id:"chinuch", title:"חינוך",
    books:[
      {"img":"naar","name":"הנער שמעד","desc":"סיפור מרתק על נער צעיר מבית חסידי שמעד והגיע רחוק, שזכה לאחר שנים לחזור למוטב. רווי במסרים חינוכיים.","price":40},
      {"img":"klalei","name":"כללי החינוך וההדרכה","desc":"סיכום מאלף של הרבי הריי\"צ אודות כללי החינוך וההדרכה בגילאים השונים. ספר חובה לעוסקים בחינוך, להורים ולכל המעוניין לשפר את מידותיו.","price":50},
      {"img":"tikun","name":"תיקון המידות","desc":"חינוך למידות טובות והתנהגות אנושית, בהדרכת רבותינו נשיאינו, הרואים את \"תיקון המידות\" כאחד מעיקרי העבודה בחסידות.","price":45},
      {"img":"shma","name":"שמע בני","desc":"שיחות חינוכיות שבהם הרבי עצמו מדבר אל לב הילדים ומדריכם לנצח את היצר. מומלץ ללימוד בבתי הספר היסודיים.","price":40},
      {"img":"horaah","name":"ההוראה בתורת חב\"ד","desc":"פרקי הוראה והדרכה למורים (וגם להורים): כיצד לרדת אל התלמיד ולהקנות לו את החומר הנלמד.","price":40}
    ] },
  { id:"parshanut", title:"פרשנות חסידית",
    books:[
      {"img":"tefila-avoda","name":"התפילה והעבודה","desc":"משמעות התפילה ואופנה בהדרכת אדמו\"רי חב\"ד.","price":50},
      {"img":"tefila-chasidit","name":"התפילה החסידית","desc":"סיפורים מאלפים אודות תפילותיהם של האדמו\"רים, ספרי החסידים ואנשים פשוטים, רוויים במסרים חינוכיים.","price":40},
      {"img":"or-chabad","name":"אור חב\"ד","desc":"אמירות חסידיות על סדר זרעים.","price":50},
      {"img":"ora","name":"אורה לתורה","desc":"פתגמי הרבי הריי\"צ על שלושת החומשים: בראשית, שמות, ויקרא.","price":null}
    ] },
  { id:"moadim", title:"מועדי ישראל",
    books:[
      {"img":"hagada","name":"הגדה של פסח","desc":"ההגדה שהגיהה הרבי נשיא דורנו, עם הדרכה מפורטת לעריכת הסדר ופתגמי האדמו\"רים.","price":45,"back":true}
    ] },
  { id:"english", title:"אנגלית", en:true,
    books:[
      {"img":"en-veata","name":"Ve'atah Tetzaveh","desc":"The discourse known as Veatah Tetzaveh, the last one personally edited and distributed by the Lubavitcher Rebbe.","price":70},
      {"img":"en-prayer","name":"Chassidic Prayer","desc":"Illustrative stories about the prayers of the Rebbes and elder Chassidim, full of educational and inspiring messages.","price":70},
      {"img":"en-teacher","name":"Teacher and His Pupil","desc":"An expert guide for better teaching and improved learning, based on the sayings of our sages and in the light of Chassidut.","price":70},
      {"img":"en-love","name":"Love and Unity","desc":"The Chassidic perspective on the mitzvah upon which the whole Torah is based, taken from the works of the Chassidic leaders.","price":70},
      {"img":"en-bati","name":"Bati LeGani","desc":"A commentary on the famous maamar: how to turn the darkness in this world into light, and make the world a divine dwelling place.","price":70},
      {"img":"en-kinyan","name":"Kinyan HaChaim","desc":"A discourse by the sixth leader of Lubavitch on taking a serious look at life from a joyous point of view; Rosh HaShanah as the foundation for true happiness.","price":70},
      {"img":"en-haggadah","name":"Haggadah for Passover","desc":"A comprehensive guide to conducting the Seder according to Chabad-Lubavitch customs, in a simplified, easy-to-follow arrangement.","price":"sold"},
      {"img":"en-avos","name":"Pirkei Avos in the Light of Chassidus · 3 Vol.","desc":"Rabbi Green's lucid commentary on Pirkei Avot from a Chassidic perspective.","price":"sold"},
      {"img":"en-tefillin","name":"Tefillin in Light of Chassidut","desc":"Translation and elucidation of the well-known Bar Mitzvah discourse.","price":"sold"},
      {"img":"en-tanya","name":"Commentary on the Tanya · 2 Vol.","desc":"Gathers the multitude of explanations on the Tanya, culled from the teachings of the leaders of Chabad.","price":"sold"},
      {"img":"en-themes","name":"Themes in Tanya","desc":"Discusses the first fifteen chapters of the Tanya: correct self-appraisal, the Beinoni and more.","price":"sold"},
      {"img":"en-principles","name":"Principles of Education and Guidance","desc":"The Rebbe Rayatz's discourse written soon after the founding of Yeshivat Tomchei Temimim.","price":"sold"},
      {"img":"en-chayei","name":"Chayei Olam V'Chayei Shaah","desc":"Rabbi Yosef Yitzchak Schneersohn's essential discourse in vocalized Hebrew and English, with a concise commentary.","price":"sold"}
    ] }
];

// המומלצים בראש הקטלוג, לפי הסדר
const FEATURED = ["likutei","lemaan","hagada","tiferet"];

// רוחב התמונה ביחס לרוחב הספר עצמו, כדי שכל הספרים יוצגו באותו גודל. ספר בלי ערך מוצג ביחס 1
const IMG_R = {"ahava-achdut":1.045,"ahavat-rashab":1.045,"ahavat-rayatz":1.05,"ahavat-set":1.011,"ahavat-tanya":1.045,"ahavat-tzemach":1.041,"bati":1.05,"chayei":1.05,"chinuch":1.047,"en-avos":1.007,"en-bati":1.032,"en-chayei":1.14,"en-haggadah":1.145,"en-kinyan":1.032,"en-love":1.032,"en-prayer":1.032,"en-principles":1.163,"en-tanya":1,"en-teacher":1.027,"en-tefillin":1.15,"en-themes":1.2,"en-veata":1.032,"hagada":1.616,"hashem-echad":1.05,"histalkut":1.047,"horaah":1.05,"kids-a":1.217,"kids-lb":1.216,"kids-set":1.019,"kids-tet":1.05,"kinyan":1.046,"klalei":1.045,"kodesh":1.009,"kuntres-ag":1.042,"kuntres-dt":1.042,"kuntres-maayan":1.04,"leiyun":1.046,"lemaan":1.591,"likutei":1.009,"maamarim-set":1.007,"machshevet":1.171,"naar":1.05,"ohalei":1.055,"or-chabad":1.046,"ora":1.05,"shaar":2.46,"shma":1.046,"tefila-avoda":1.05,"tefila-chasidit":1.055,"tefillin":1.041,"teshuva":1.051,"teshuva-derech":1.045,"tiferet":1.05,"tikun":1.05,"veata":1.05,"yetziat":1.046};

// גרסת הכריכות: עולה בכל שמירה מלוח הניהול, כדי שהדפדפן לא יציג תמונה ישנה
const IMG_V = 4;
