/* ==========================================================================
   S. S. Fatimi — site behaviour
   ========================================================================== */

/* The forthcoming series, ordered as requested by the author (WhatsApp, 04 Sep 2026,
   with the additions of 04 Sep and 13 Sep). Volumes without finished cover art fall
   back to a typographic cover built from `arabic` + `tagline`. */
const books = [
  {volume:"Volume One",roman:"I",title:"Islamophilia",image:null,arabic:"حُبُّ الإسلام",tagline:"Beyond fear, toward understanding.",blurb:"A counter-narrative written not in reaction but in refinement: a conscious turning of fear into familiarity, misunderstanding into dialogue, and distance into dignity.",note:"Where narratives have hardened into walls, and motives have shadowed truth—there emerges a call not of reaction, but of refinement."},
  {volume:"Volume Two",roman:"II",title:"Prophet Muhammad’s ﷺ Narratives for Superior and Maverick Minds",image:"assets/books/prophet.jpg",arabic:"",tagline:"Character as the purpose of revelation.",blurb:"A scholarly gathering of Prophetic narrations for readers seeking genuine intellectual and moral refinement—addressed, in the author’s words, to exceptional and maverick minds.",note:"“Indeed, I was sent to perfect the most noble character.” Built on Prophetic vision and Prophetic curiosity, and on the transmission of Hazrat Ali—the Gate of the city of wisdom and knowledge."},
  {volume:"Volume Three",roman:"III",title:"My Mind Works as a Pressure Cooker",image:"assets/books/pressure.jpg",arabic:"دیگِ فشار",tagline:"Understand. Express. Heal—before it overflows.",blurb:"Thoughts, emotions, memories, dreams: too much inside, too little out. A candid, deeply human look at the mind under pressure—and a gentle argument for release, reflection, and renewal.",note:"“It is not your market pressure cooker; it is my mind—my very self. This book is nothing but a safety valve.”"},
  {volume:"Volume Four",roman:"IV",title:"The Pleasure of Learning and the Joy of Knowing",image:"assets/books/pleasure.jpg",arabic:"",tagline:"Learn deeply. Think freely. Know truly.",blurb:"A meditation on curiosity as a way of life—why learning, pursued honestly and without pretense, becomes its own reward and the surest path to a settled mind.",note:"On the other side stands فن سے بے بہرہ—the one to whom art has given no share, who measures everything by utility and wealth, and mocks what cannot be priced."},
  {volume:"Volume Five",roman:"V",title:"The Essence of Existence",image:"assets/books/essence.jpg",arabic:"جَوْهَرُ الوُجُود",tagline:"Beyond perception. Beyond time. The truth within.",blurb:"A Sufi-philosophical inquiry into being itself—what remains when perception, time, and appearance fall away.",note:"The volume in which the author’s motto becomes a method: to see things as they truly are—within ourselves, across the horizons, and beyond the ornamentation of appearances."},
  {volume:"Volume Six",roman:"VI",title:"Al-‘Awwām ka-al-Anʿām",image:"assets/books/awwam.jpg",arabic:"العَوَامُّ كَالْأَنْعَام",tagline:"The masses are like cattle—a study in the making of a mind.",blurb:"A philosophical, historical and psychological study in the light of the Qur’an, the Sunnah, and human experience: on blind imitation, inherited opinion, and the machinery that manufactures consent.",note:"“They are like cattle; rather, they are even more astray.” — Qur’an 7:179. The remedy is not contempt for the many, but the spread of sound knowledge."},
  {volume:"Volume Seven",roman:"VII",title:"Islamic Civilization Between Scholars and Caliphs",image:"assets/books/civilization.jpg",arabic:"الحَضَارَةُ الإسْلَامِيَّةُ بَيْنَ العُلَمَاءِ وَالخُلَفَاء",tagline:"Who built the civilization—and who claimed it?",blurb:"A comprehensive study of the intellectual, scientific and institutional development of Islamic civilization, and of the dynamic—often uneasy—relationship between the scholars and the rulers.",note:"A work that explores how that relationship shaped, and at times deformed, a civilization across the ages."},
  {volume:"Volume Eight",roman:"VIII",title:"The Standard Islamic Narrative",image:null,arabic:"صَحِيفَةُ المَدِينَة",tagline:"The Qur’an. The Prophet ﷺ. The Constitution of Madinah.",blurb:"An argument that the standard narrative must be recovered from its three original sources—and a close reading of the Constitution of Madinah, the first written constitution in human history, founded on unity, justice, coexistence, and freedom of religion.",note:"“They are one community distinct from other people.” · “For the Jews their religion, and for the Muslims theirs.”"},
  {volume:"Volume Nine",roman:"IX",title:"The SOP of the Caliphate",image:null,arabic:"عَهْدُ الإمَامِ عَلِيّ",tagline:"Governance as a standing procedure, not a personality.",blurb:"A classified reading of the standard operating procedure of the caliphate as set down by Hazrat Ali (may God be pleased with him)—leadership understood not as a crown but as a trust.",note:"“Your first battlefield is your own soul.” — Ali ibn Abi Talib"},
  {volume:"Volume Ten",roman:"X",title:"ʿAbqariyyāt — The Firmly Rooted in Knowledge",image:null,arabic:"عَبْقَرِيَّات · الرَّاسِخُونَ فِي العِلْم",tagline:"On genius, and on those who are firmly rooted.",blurb:"A study of the genius temperament across prophecy, philosophy and science: the isolation it carries, the pressure it endures, and the difference between brilliance and being rooted in knowledge.",note:"Every genius passes through the valley of “am I mad?”—and then the loneliness becomes light."},
  {volume:"Volume Eleven",roman:"XI",title:"We Are One Family Under God",image:"assets/books/family.jpg",arabic:"",tagline:"Different paths, one destination: love.",blurb:"An interfaith call to cordiality, placing scripture beside scripture to argue that every tradition, read rightly, asks us to welcome the stranger and value one another.",note:"“I was a stranger and you welcomed me.” — Jesus Christ · “We sent you not but as a mercy to all the worlds.” — Qur’an 21:107"},
  {volume:"Volume Twelve",roman:"XII",title:"The Uncharted Realm of Knowledge and Wisdom",image:"assets/books/uncharted.jpg",arabic:"العِلْم · الحِكْمَة · البَصِيرَة · النُّور",tagline:"Beyond the maps. Beyond the known.",blurb:"The capstone of the series—an invitation past settled knowledge into a realm bounded not by borders, but by understanding.",note:"“The journey does not end here, for wisdom has no last page.”"}
];

const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Carousel ─────────────────────────────────────────────────────────── */
let active = 0, autoplay;

const dots = books.map((book, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("role", "tab");
  dot.setAttribute("aria-label", `Show ${book.volume}: ${book.title}`);
  dot.addEventListener("click", () => { show(index); restart(); });
  $("bookDots").append(dot);
  return dot;
});

const indexButtons = books.map((book, index) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = `<span class="num">${book.roman}</span><span>${book.title}</span>`;
  btn.addEventListener("click", () => {
    show(index);
    restart();
    document.querySelector(".bookShowcase").scrollIntoView({behavior: reduceMotion ? "auto" : "smooth", block: "center"});
  });
  li.append(btn);
  $("seriesIndex").append(li);
  return btn;
});

function show(index){
  active = (index + books.length) % books.length;
  const b = books[active];
  const hasArt = Boolean(b.image);

  $("bookCover").hidden = !hasArt;
  $("coverPlate").hidden = hasArt;

  if (hasArt){
    $("bookCover").src = b.image;
    $("bookCover").alt = `Cover of ${b.title}`;
  } else {
    $("plateArabic").textContent = b.arabic;
    $("plateTitle").textContent  = b.title;
    $("plateTagline").textContent = b.tagline;
  }

  $("bookVolume").textContent  = b.volume;
  $("bookTitle").textContent   = b.title;
  $("bookTagline").textContent = b.tagline;
  $("bookBlurb").textContent   = b.blurb;
  $("bookNote").textContent    = b.note;

  dots.forEach((d, i) => {
    d.classList.toggle("active", i === active);
    d.setAttribute("aria-selected", i === active);
  });
  indexButtons.forEach((b2, i) => b2.classList.toggle("active", i === active));
}

function restart(){
  clearInterval(autoplay);
  if (!reduceMotion) autoplay = setInterval(() => show(active + 1), 8000);
}

$("previousBook").addEventListener("click", () => { show(active - 1); restart(); });
$("nextBook").addEventListener("click",     () => { show(active + 1); restart(); });

/* Pause autoplay while the reader is actually looking at it. */
const showcase = document.querySelector(".bookShowcase");
showcase.addEventListener("mouseenter", () => clearInterval(autoplay));
showcase.addEventListener("mouseleave", restart);

show(0);
restart();

/* ── Reveal on scroll ─────────────────────────────────────────────────── */
const revealables = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)){
  revealables.forEach(el => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, {rootMargin: "0px 0px -12% 0px", threshold: 0.08});
  revealables.forEach(el => io.observe(el));
}

/* ── Header: stuck state, scroll progress, scrollspy ──────────────────── */
const header   = $("siteHeader");
const progress = $("scrollProgress");
const navAnchors = [...document.querySelectorAll(".navLinks a")];
const sections = navAnchors
  .map(a => document.getElementById(a.getAttribute("href").slice(1)))
  .filter(Boolean);

let ticking = false;
function onScroll(){
  const y = window.scrollY;
  header.classList.toggle("is-stuck", y > 40);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

  // Active section = the last one whose top has passed the header line.
  const line = y + parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) + 40;
  let current = null;
  sections.forEach(sec => { if (sec.offsetTop <= line) current = sec.id; });
  navAnchors.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`));

  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking){ ticking = true; requestAnimationFrame(onScroll); }
}, {passive: true});
onScroll();

/* ── Mobile menu ──────────────────────────────────────────────────────── */
const toggle = $("navToggle");
const navLinks = document.querySelector(".navLinks");
navLinks.id = "navLinks";
toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navAnchors.forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}));

/* ── Contact: copy address ────────────────────────────────────────────── */
const copyBtn = $("copyEmail");
const copyNote = $("copyNote");
copyBtn.addEventListener("click", async () => {
  const email = copyBtn.dataset.email;
  let ok = false;
  try {
    await navigator.clipboard.writeText(email);
    ok = true;
  } catch {
    // Clipboard API needs a secure context; fall back to a hidden selection.
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:absolute;left:-9999px";
    document.body.append(ta);
    ta.select();
    try { ok = document.execCommand("copy"); } catch {}
    ta.remove();
  }
  copyNote.textContent = ok ? "Address copied — ssfatimi@gmail.com" : "Copy failed — the address is shown below";
  copyNote.classList.add("show");
  clearTimeout(copyBtn._t);
  copyBtn._t = setTimeout(() => copyNote.classList.remove("show"), 3200);
});

/* ── Hero starfield ───────────────────────────────────────────────────── */
(function starfield(){
  const canvas = $("starfield");
  if (!canvas || reduceMotion) return;

  const ctx = canvas.getContext("2d");
  let stars = [], w = 0, h = 0, raf;

  function size(){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(Math.min(150, (w * h) / 9000));
    stars = Array.from({length: count}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.25 + .25,
      a: Math.random() * .6 + .15,
      s: Math.random() * .012 + .003,      // twinkle speed
      p: Math.random() * Math.PI * 2,      // phase
      d: Math.random() * .05 + .01         // slow drift
    }));
  }

  function frame(){
    ctx.clearRect(0, 0, w, h);
    for (const st of stars){
      st.p += st.s;
      st.y -= st.d;
      if (st.y < -2) st.y = h + 2;
      const alpha = st.a * (0.55 + 0.45 * Math.sin(st.p));
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,205,154,${alpha.toFixed(3)})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }

  size();
  frame();

  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(size, 180);
  });

  // Don't burn cycles once the hero has scrolled away.
  if ("IntersectionObserver" in window){
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting){ if (!raf) frame(); }
      else { cancelAnimationFrame(raf); raf = null; }
    }, {threshold: 0}).observe(canvas);
  }
})();

/* ── Year ─────────────────────────────────────────────────────────────── */
$("year").textContent = new Date().getFullYear();
