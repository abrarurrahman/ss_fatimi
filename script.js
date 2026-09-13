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

/* ── Shared 3D helper ─────────────────────────────────────────────────────
   A tiny perspective projector. Rotates a point about Y then X and divides
   by depth. Enough for a starfield and a node graph; no library needed.     */
const FOV = 760;
function project(p, rotX, rotY, cx, cy){
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x1 =  p.x * cosY - p.z * sinY;
  const z1 =  p.x * sinY + p.z * cosY;

  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y1 =  p.y * cosX - z1 * sinX;
  const z2 =  p.y * sinX + z1 * cosX;

  const k = FOV / (FOV + z2);
  return {x: cx + x1 * k, y: cy + y1 * k, z: z2, k};
}

/* Runs a canvas animation only while it is on screen. */
function whileVisible(canvas, draw){
  let raf = null;
  const loop = () => { draw(); raf = requestAnimationFrame(loop); };
  const start = () => { if (!raf) loop(); };
  const stop  = () => { if (raf){ cancelAnimationFrame(raf); raf = null; } };
  if ("IntersectionObserver" in window){
    new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), {threshold: 0}).observe(canvas);
  } else start();
  return {start, stop};
}

/* Sizes a canvas to its CSS box at device resolution. */
function fitCanvas(canvas, ctx){
  const dpr  = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width  = Math.max(1, Math.round(rect.width  * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return {w: rect.width, h: rect.height};
}

/* ── Hero starfield, in depth ─────────────────────────────────────────────
   Stars sit in a 3D box and drift toward the viewer, so the field has
   parallax rather than being a flat sheet of dots.                          */
(function starfield(){
  const canvas = $("starfield");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");

  let stars = [], w = 0, h = 0, rotY = 0;
  let pointerX = 0, pointerY = 0, driftX = 0, driftY = 0;

  const SPREAD = 1100;

  function seed(){
    ({w, h} = fitCanvas(canvas, ctx));
    const count = Math.round(Math.min(220, (w * h) / 6200));
    stars = Array.from({length: count}, () => ({
      x: (Math.random() - .5) * SPREAD * 2,
      y: (Math.random() - .5) * SPREAD * 1.2,
      z: Math.random() * SPREAD,
      r: Math.random() * 1.5 + .35,
      a: Math.random() * .55 + .2,
      tw: Math.random() * .015 + .004,
      ph: Math.random() * Math.PI * 2
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    rotY += 0.00035;
    driftX += (pointerX - driftX) * .04;
    driftY += (pointerY - driftY) * .04;

    const cx = w / 2 + driftX * 26;
    const cy = h / 2 + driftY * 18;

    for (const s of stars){
      s.z -= 0.32;
      if (s.z < -FOV * 0.6){ s.z = SPREAD; s.x = (Math.random() - .5) * SPREAD * 2; s.y = (Math.random() - .5) * SPREAD * 1.2; }
      s.ph += s.tw;

      const p = project(s, driftY * 0.12, rotY + driftX * 0.12, cx, cy);
      if (p.k <= 0) continue;

      const alpha = s.a * (.5 + .5 * Math.sin(s.ph)) * Math.min(1, p.k * 1.1);
      const r = Math.max(.2, s.r * p.k);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,205,154,${alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  seed();
  whileVisible(canvas, draw);

  window.addEventListener("pointermove", e => {
    pointerX = (e.clientX / window.innerWidth  - .5) * 2;
    pointerY = (e.clientY / window.innerHeight - .5) * 2;
  }, {passive: true});

  let t;
  window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(seed, 180); });
})();

/* ── The constellation ────────────────────────────────────────────────────
   The twelve volumes as nodes on a sphere around a central question, drawn
   with depth sorting so near stars occlude far ones. Drag to rotate, click
   a star to open that volume.                                               */
(function constellation(){
  const canvas = $("constellationCanvas");
  const stage  = document.querySelector(".constellationStage");
  const tip    = $("constellationTip");
  if (!canvas || !stage) return;

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, R = 240;

  // Fibonacci sphere: an even scatter, no clumping at the poles.
  const nodes = books.map((book, i) => {
    const n = books.length;
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      ux: Math.cos(theta) * rad, uy: y, uz: Math.sin(theta) * rad,
      x: 0, y: 0, z: 0, book, index: i, pulse: Math.random() * Math.PI * 2
    };
  });
  const core = {ux: 0, uy: 0, uz: 0, x: 0, y: 0, z: 0, core: true};

  // Every volume answers to the centre; the ring and its chords bind them.
  const edges = [];
  nodes.forEach(n => edges.push([core, n, .16]));
  for (let i = 0; i < nodes.length; i++){
    edges.push([nodes[i], nodes[(i + 1) % nodes.length], .3]);
    if (i < nodes.length / 2) edges.push([nodes[i], nodes[(i + 5) % nodes.length], .12]);
  }

  let rotX = -0.22, rotY = 0, targetX = -0.22, targetY = 0;
  let dragging = false, moved = false, lastX = 0, lastY = 0;
  let hover = null, hoverIndex = -1;

  function size(){
    ({w, h} = fitCanvas(canvas, ctx));
    R = Math.min(w, h) * 0.42;
  }

  function draw(){
    if (!dragging) targetY += 0.0022;
    rotX += (targetX - rotX) * .07;
    rotY += (targetY - rotY) * .07;

    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;

    // Place everything for this frame.
    for (const n of nodes){
      const p = project({x: n.ux * R, y: n.uy * R, z: n.uz * R}, rotX, rotY, cx, cy);
      n.x = p.x; n.y = p.y; n.z = p.z; n.k = p.k;
    }
    const cp = project({x: 0, y: 0, z: 0}, rotX, rotY, cx, cy);
    core.x = cp.x; core.y = cp.y; core.z = cp.z; core.k = cp.k;

    // Edges first, faded by depth.
    for (const [a, b, base] of edges){
      const depth = (a.k + b.k) / 2;
      const lit = hover && (a === hover || b === hover);
      const alpha = Math.max(0, base * depth * (lit ? 3.4 : 1));
      if (alpha < .012) continue;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(201,169,97,${Math.min(.85, alpha).toFixed(3)})`;
      ctx.lineWidth = lit ? 1.15 : .7;
      ctx.stroke();
    }

    // The centre: the question the series turns around.
    const coreR = 5 * core.k;
    const glow = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, coreR * 9);
    glow.addColorStop(0, "rgba(226,205,154,.55)");
    glow.addColorStop(1, "rgba(226,205,154,0)");
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(core.x, core.y, coreR * 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(core.x, core.y, coreR, 0, Math.PI * 2);
    ctx.fillStyle = "#f2e6c8"; ctx.fill();

    // Nodes, far to near, so the near ones sit on top.
    const sorted = [...nodes].sort((a, b) => b.z - a.z);
    for (const n of sorted){
      n.pulse += .02;
      const isHover = n === hover;
      const isActive = n.index === active;
      const depth = Math.min(1, Math.max(.25, n.k));
      const r = (isHover ? 8.5 : isActive ? 7 : 4.6) * depth * (1 + .06 * Math.sin(n.pulse));

      if (isHover || isActive){
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        g.addColorStop(0, `rgba(226,205,154,${isHover ? .5 : .3})`);
        g.addColorStop(1, "rgba(226,205,154,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2); ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = isHover || isActive
        ? "rgba(248,240,220,.98)"
        : `rgba(201,169,97,${(.45 + .5 * depth).toFixed(3)})`;
      ctx.fill();

      if (isActive && !isHover){
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 6 * depth, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(201,169,97,.65)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Roman numeral, only on stars facing us.
      if (depth > .72){
        ctx.font = `${Math.round(10 * depth)}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = `rgba(226,205,154,${((depth - .72) * 2.6).toFixed(3)})`;
        ctx.textAlign = "left";
        ctx.fillText(n.book.roman, n.x + r + 7, n.y + 3.5);
      }
    }
  }

  function pick(mx, my){
    let best = null, bestD = 20;
    for (const n of nodes){
      const d = Math.hypot(n.x - mx, n.y - my);
      if (d < bestD){ bestD = d; best = n; }
    }
    return best;
  }

  function showTip(n){
    if (!n){ tip.classList.remove("show"); tip.hidden = true; return; }
    tip.hidden = false;
    tip.innerHTML =
      `<span class="tipNum">${n.book.volume}</span>` +
      `<span class="tipTitle">${n.book.title}</span>` +
      `<span class="tipTag">${n.book.tagline}</span>`;
    tip.style.left = `${n.x}px`;
    tip.style.top  = `${n.y}px`;
    tip.classList.add("show");
  }

  canvas.addEventListener("pointermove", e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    if (dragging){
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      targetY += dx * .006;
      targetX = Math.max(-1.1, Math.min(1.1, targetX + dy * .005));
      lastX = e.clientX; lastY = e.clientY;
      return;
    }

    const n = pick(mx, my);
    if (n !== hover){
      hover = n;
      hoverIndex = n ? n.index : -1;
      canvas.style.cursor = n ? "pointer" : "grab";
      showTip(n);
    } else if (n) {
      tip.style.left = `${n.x}px`;
      tip.style.top  = `${n.y}px`;
    }
  });

  canvas.addEventListener("pointerdown", e => {
    dragging = true; moved = false;
    lastX = e.clientX; lastY = e.clientY;
    stage.classList.add("is-dragging");
    try { canvas.setPointerCapture(e.pointerId); } catch {}
  });

  function endDrag(){
    dragging = false;
    stage.classList.remove("is-dragging");
  }
  canvas.addEventListener("pointerup", e => {
    endDrag();
    if (!moved && hoverIndex >= 0){
      show(hoverIndex);
      restart();
      document.querySelector(".bookShowcase")
        .scrollIntoView({behavior: reduceMotion ? "auto" : "smooth", block: "center"});
    }
    try { canvas.releasePointerCapture(e.pointerId); } catch {}
  });
  canvas.addEventListener("pointercancel", endDrag);
  canvas.addEventListener("pointerleave", () => {
    endDrag();
    hover = null; hoverIndex = -1;
    showTip(null);
  });

  size();
  if (reduceMotion){
    draw();                       // one static frame
  } else {
    whileVisible(canvas, draw);
  }

  let t;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(() => { size(); if (reduceMotion) draw(); }, 180);
  });
})();

/* ── Cards lean toward the cursor ─────────────────────────────────────── */
(function cardTilt(){
  if (reduceMotion || window.matchMedia("(hover:none)").matches) return;
  const MAX = 7;   // degrees

  document.querySelectorAll(".themeCard, .note").forEach(card => {
    card.classList.add("tiltReady");

    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width  - .5;
      const py = (e.clientY - r.top)  / r.height - .5;
      card.classList.add("is-tilting");
      card.style.transform =
        `perspective(900px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-6px) scale(1.012)`;
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-tilting");
      card.style.transform = "";
    });
  });
})();

/* ── Year ─────────────────────────────────────────────────────────────── */
$("year").textContent = new Date().getFullYear();
