/**
 * Content override for PROJECT and SKILLS pages.
 * Source: https://github.com/shakanaaa
 * Loaded AFTER main.js, it replaces the contents of slinkData,
 * skillTabsList and skillGroupsData in place (they are const arrays
 * declared in main.js), so main.js itself stays untouched.
 * Skill "level" numbers are estimates: change them to match your own level.
 */

// PROJECT page: all public repos, the list scrolls (wheel, arrows or W/S)
slinkData.splice(0, slinkData.length,
  { numeral: "I",    title: "TASK SUBMISSION SYSTEM",  subtitle: "Sistem Pengumpulan Tugas · PHP",             url: "https://github.com/shakanaaa/sistem-pengumpulan-tugas" },
  { numeral: "II",   title: "DAILY CALORIE TRACKER",   subtitle: "Calorie & Nutrition Calculator · JavaScript", url: "https://github.com/shakanaaa/perhitungan-kalori-harian" },
  { numeral: "III",  title: "SPMB ADMISSIONS",         subtitle: "New Student Admission Web App · Laravel",     url: "https://github.com/shakanaaa/spmb" },
  { numeral: "IV",   title: "WHATSAPP BOT",            subtitle: "Automation Bot · JavaScript",                 url: "https://github.com/shakanaaa/bot-wa" },
  { numeral: "V",    title: "FACE DETECTION",          subtitle: "Image Face Detection · JavaScript",           url: "https://github.com/shakanaaa/face-detection-image" },
  { numeral: "VI",   title: "VISUAL NOVEL",            subtitle: "Web Visual Novel Game · JavaScript",          url: "https://github.com/shakanaaa/visual-novel" },
  { numeral: "VII",  title: "CASHIER APP LARAVEL",     subtitle: "Point of Sale Application · Laravel",         url: "https://github.com/shakanaaa/tugas-aplikasi-kasir-laravel" },
  { numeral: "VIII", title: "CASHIER APP",             subtitle: "Point of Sale Application · PHP",             url: "https://github.com/shakanaaa/tugas-kasir" },
  { numeral: "IX",   title: "SURAT DISNAKER",          subtitle: "Letter Management Web App · PHP",             url: "https://github.com/shakanaaa/surat-disnaker" },
  { numeral: "X",    title: "VERIFIKASI BKK DISNAKER", subtitle: "BKK Data Verification · Laravel",             url: "https://github.com/shakanaaa/verif-bkk-DISNAKER" },
  { numeral: "XI",   title: "LIRIK LAGU PYTHON",       subtitle: "Song Lyrics Project · Python",                url: "https://github.com/shakanaaa/lirik-lagu-python" },
  { numeral: "XII",  title: "PLUGIN WHISKY",           subtitle: "Plugin Project · HTML",                       url: "https://github.com/shakanaaa/plugin-whisky" },
  { numeral: "XIII", title: "CLEANER TRASH",           subtitle: "Junk File Cleaner Script · Batchfile",        url: "https://github.com/shakanaaa/cleaner-trash" }
);

// SKILLS page tabs
skillTabsList.splice(0, skillTabsList.length,
  { id: "frontend",  code: "01", label: "FRONTEND" },
  { id: "backend",   code: "02", label: "BACKEND" },
  { id: "ai",        code: "03", label: "AI & CREATIVE" },
  { id: "languages", code: "04", label: "LANGUAGES" }
);

// SKILLS page stats (from the tech stack on the GitHub profile)
skillGroupsData.splice(0, skillGroupsData.length,
  {
    id: "frontend",
    title: "FRONTEND & WEB",
    code: "01",
    skills: [
      { name: "HTML5 · CSS3", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Bootstrap · Tailwind CSS", level: 78 },
      { name: "React · Vue", level: 55 },
      { name: "Angular", level: 45 }
    ]
  },
  {
    id: "backend",
    title: "BACKEND & DATABASE",
    code: "02",
    skills: [
      { name: "PHP · Laravel", level: 85 },
      { name: "Node.js · Express", level: 68 },
      { name: "NestJS · Next.js", level: 48 },
      { name: "MySQL · SQLite", level: 78 },
      { name: "Prisma ORM", level: 50 },
      { name: "Git · GitHub", level: 75 }
    ]
  },
  {
    id: "ai",
    title: "AI & CREATIVE TOOLS",
    code: "03",
    skills: [
      { name: "TensorFlow · Face Detection", level: 45 },
      { name: "WebGL · OpenGL", level: 40 },
      { name: "Figma · UI Design", level: 75 },
      { name: "Adobe Illustrator", level: 65 },
      { name: "After Effects", level: 60 },
      { name: "Digital Art & Drawing", level: 80 }
    ]
  },
  {
    id: "languages",
    title: "PROGRAMMING LANGUAGES",
    code: "04",
    skills: [
      { name: "PHP", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "Python", level: 65 },
      { name: "Java", level: 55 },
      { name: "C#", level: 50 },
      { name: "C · C++", level: 50 }
    ]
  }
);

// --------------------------------------------------------------------------
// Scrollable project list
// --------------------------------------------------------------------------
(function () {
  const style = document.createElement("style");
  style.textContent = `
    #slink-cards-container {
      max-height: 58vh;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
      scroll-behavior: smooth;
      padding: 8px 40px 24px 12px;
      scrollbar-width: thin;
      scrollbar-color: #7de6fd rgba(0, 18, 51, 0.6);
    }
    #slink-cards-container::-webkit-scrollbar { width: 6px; }
    #slink-cards-container::-webkit-scrollbar-track { background: rgba(0, 18, 51, 0.6); }
    #slink-cards-container::-webkit-scrollbar-thumb { background: #7de6fd; border-radius: 3px; }
  `;
  document.head.appendChild(style);

  // Keep the angled stair-step layout bounded: the card offset repeats every 5 cards
  const origRender = renderSlinkCards;
  renderSlinkCards = function () {
    origRender();
    document.querySelectorAll(".slink-card").forEach((card, idx) => {
      card.style.setProperty("--card-idx", idx % 5);
    });
  };

  // Scroll the active card into view when selecting with keyboard or mouse
  const origSelect = selectSlinkCard;
  selectSlinkCard = function (index) {
    origSelect(index);
    const box = document.getElementById("slink-cards-container");
    const card = document.getElementById("slink-card-" + index);
    if (!box || !card) return;
    const top = card.offsetTop - box.offsetTop;
    if (top < box.scrollTop) {
      box.scrollTop = top - 8;
    } else if (top + card.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTop = top + card.offsetHeight - box.clientHeight + 16;
    }
  };
})();

// If a page was opened straight from the URL (?page=project / ?page=skills),
// main.js already rendered the old data, so render again with the new data.
if (typeof isProjectPageOpen !== "undefined" && isProjectPageOpen) renderSlinkCards();
if (typeof isSkillPageOpen !== "undefined" && isSkillPageOpen) {
  renderSkillsTabs();
  renderSkillStats(currentSkillTab);
}