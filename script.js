/* --- CONFIGURATION --- */
const SITE_MODE = "NLA"; // Change to "NLA" to switch the page to No Longer Available mode

(function initSiteMode() {
  document.addEventListener("DOMContentLoaded", () => {
    const nlaSection = document.getElementById("nlaSection");
    const preReveal = document.getElementById("preReveal");
    const mainPage = document.getElementById("mainPage");

    if (SITE_MODE === "NLA") {
      // 1. Show the NLA Section
      if (nlaSection) nlaSection.classList.remove("hidden");
      
      // 2. Hide and disable everything else
      if (preReveal) preReveal.style.display = "none";
      if (mainPage) mainPage.style.display = "none";
      
      // 3. Prevent any birthday logic from firing
      console.log("Site is currently in NLA mode.");
      return; 
    }
  });
})();

// ... the rest of your existing birthday script.js code follows here ...

/* ════════════════════════════════
   AUTO-REDIRECT & VISIT TRACKING
════════════════════════════════ */
(function () {
  function trackVisit() {
    const now = new Date();
    // Convert to local timezone string
    const localTime = now.toLocaleString('en-US', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    const timestamp = now.toISOString();
    const visitorData = {
      timestamp: timestamp,
      localTime: localTime,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      pageTitle: document.title
    };
    
    // Option 1: Send to Discord Webhook
    // Uncomment below and add your webhook URL
    
    fetch('https://discord.com/api/webhooks/1493683050062811319/0E9Vyx1exdU1SvGK8iR56nUBKC-b-sEPmKXwBsLdQamoKSsMqdOONi_vBNTLgEyvGBte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🔔 Birthday page visited!\nTime: ${localTime}`
      })
    }).catch(() => {});
    
  
   
  }
  
  // Uncomment below to enable auto-redirect and tracking
  trackVisit();
})();

const CONFIG = {
  testMode: false,
  testSeconds: 10,
  realTargetDate: "2026-06-17T00:00:00",
  showClues: true
};

const photos = [
  { src: "img1.png", caption: "The moment I realized how lucky I am to have you 💖" },
  { src: "img2.png", caption: "A memory with you that I’ll cherish forever ✨" },
  { src: "img3.png", caption: "Her smile… my favorite view in the world 🌸" }
];

const messages = [
  "Happy Birthday, my love. You make my world softer, brighter, and more beautiful every single day.",
  "Every memory with you feels like my favorite song on repeat.",
  "Your smile is my peace, your laugh is my happiness, and your love is my biggest blessing.",
  "No matter how many birthdays come and go, I will always choose you, celebrate you, and love you more each day."
];

const clues = [
  "",
  "NOT YET",
  "SOMETHING IS WAITING",
  "ALMOST TIME",
  "JUST A LITTLE MORE",
  "SOON",
  "KEEP WATCHING"
];

const countdownThemes = [
  { name: "theme-romantic-pink", rain: false, particles: 18 },
  { name: "theme-rainy-rose", rain: true, particles: 12 },
  { name: "theme-blush-mist", rain: false, particles: 20 },
  { name: "theme-fuchsia-night", rain: false, particles: 28 }
];

const targetDate = CONFIG.testMode
  ? new Date(Date.now() + CONFIG.testSeconds * 1000)
  : new Date(CONFIG.realTargetDate);

let currentPhoto = 0;
let mainPhotoInterval = null;
let countdownDone = false;
let giftOpened = false;

const mainPage = document.getElementById("mainPage");
const preReveal = document.getElementById("preReveal");
const countdownStage = document.getElementById("countdownStage");
const giftStage = document.getElementById("giftStage");
const giftTrigger = document.getElementById("giftTrigger");
const surpriseOverlay = document.getElementById("surpriseOverlay");
const closeSurpriseBtn = document.getElementById("closeSurpriseBtn");
const openSurpriseBtn = document.getElementById("openSurpriseBtn");
const countdownClue = document.getElementById("countdownClue");
const countdownThemeOverlay = document.getElementById("countdownThemeOverlay");
const countdownRain = document.getElementById("countdownRain");
const countdownParticles = document.getElementById("countdownParticles");
const countdownFloatingLove = document.getElementById("countdownFloatingLove");
const mainPhoto = document.getElementById("mainPhoto");
const mainCaption = document.getElementById("mainCaption");
const typewriter = document.getElementById("typewriter");
const floatingLove = document.getElementById("floatingLove");
const letterModal = document.getElementById("letterModal");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");

function renderMainPhoto() {
  mainPhoto.style.opacity = "0.4";
  mainPhoto.style.transform = "scale(1.06)";

  setTimeout(() => {
    mainPhoto.src = photos[currentPhoto].src;
    mainCaption.textContent = photos[currentPhoto].caption;
    mainPhoto.onload = () => {
      mainPhoto.style.opacity = "1";
      mainPhoto.style.transform = "scale(1)";
    };
  }, 180);
}

function nextPhoto() {
  currentPhoto = (currentPhoto + 1) % photos.length;
  renderMainPhoto();
}

function startPhotoAutoSlide() {
  if (mainPhotoInterval) clearInterval(mainPhotoInterval);
  mainPhotoInterval = setInterval(nextPhoto, 4000);
}

function createFloatingHearts(targetEl) {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 12 + Math.random() * 18 + "px";
    heart.style.animationDuration = 8 + Math.random() * 10 + "s";
    heart.style.animationDelay = Math.random() * 8 + "s";
    targetEl.appendChild(heart);
  }
}

function startTypewriter(texts) {
  let index = 0;
  let subIndex = 0;
  let deleting = false;

  function tick() {
    const current = texts[index];

    if (!deleting && subIndex < current.length) {
      subIndex++;
    } else if (deleting && subIndex > 0) {
      subIndex--;
    } else if (!deleting && subIndex === current.length) {
      setTimeout(() => {
        deleting = true;
        tick();
      }, 900);
      return;
    } else if (deleting && subIndex === 0) {
      deleting = false;
      index = (index + 1) % texts.length;
    }

    typewriter.innerHTML = current.substring(0, subIndex) + '<span class="cursor">|</span>';
    setTimeout(tick, deleting ? 35 : 70);
  }

  tick();
}

function pickCountdownTheme() {
  const randomTheme = countdownThemes[Math.floor(Math.random() * countdownThemes.length)];
  countdownThemeOverlay.className = `countdown-theme-overlay ${randomTheme.name}`;

  countdownRain.innerHTML = "";
  if (randomTheme.rain) {
    for (let i = 0; i < 70; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.opacity = (0.25 + Math.random() * 0.35).toFixed(2);
      drop.style.height = `${40 + Math.random() * 70}px`;
      drop.style.animationDuration = `${0.6 + Math.random() * 0.55}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      countdownRain.appendChild(drop);
    }
  }

  countdownParticles.innerHTML = "";
  for (let i = 0; i < randomTheme.particles; i++) {
    const dot = document.createElement("div");
    dot.className = "count-particle";
    const size = 2 + Math.random() * 5;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.bottom = `${Math.random() * 20}%`;
    dot.style.animationDuration = `${8 + Math.random() * 12}s`;
    dot.style.animationDelay = `${Math.random() * 4}s`;
    countdownParticles.appendChild(dot);
  }
}

function updateClue() {
  countdownClue.textContent = CONFIG.showClues
    ? clues[Math.floor(Math.random() * clues.length)]
    : "";
}

function updateCountdown() {
  if (countdownDone) return;

  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    countdownDone = true;
    document.getElementById("days").textContent = "000";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    showGiftReveal();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function showGiftReveal() {
  countdownStage.classList.add("hidden");
  giftStage.classList.remove("hidden");
}

function launchSurprise() {
  surpriseOverlay.classList.add("show");

  for (let i = 0; i < 80; i++) {
    const burst = document.createElement("div");
    burst.className = "burst-item";
    burst.textContent = i % 2 === 0 ? "💖" : "✨";
    burst.style.setProperty("--x", ((Math.random() - 0.5) * 1200) + "px");
    burst.style.setProperty("--y", ((Math.random() - 0.5) * 900) + "px");
    burst.style.setProperty("--r", (Math.random() * 240) + "deg");
    surpriseOverlay.appendChild(burst);

    setTimeout(() => burst.remove(), 1800);
  }
}

function openGiftAnimation() {
  if (giftOpened) return;
  giftOpened = true;
  giftTrigger.classList.add("opened");
  setTimeout(launchSurprise, 850);
}

function revealMainPage() {
  preReveal.classList.add("hidden");
  mainPage.classList.remove("hidden");
  renderMainPhoto();
  createFloatingHearts(floatingLove);
  startTypewriter(messages);
  startPhotoAutoSlide();
}

openLetterBtn.addEventListener("click", () => letterModal.classList.add("show"));
closeLetterBtn.addEventListener("click", () => letterModal.classList.remove("show"));
letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) letterModal.classList.remove("show");
});
giftTrigger.addEventListener("click", openGiftAnimation);
closeSurpriseBtn.addEventListener("click", () => {
  const mainHidden = mainPage.classList.contains("hidden");
  surpriseOverlay.classList.remove("show");
  if (mainHidden) revealMainPage();
});
openSurpriseBtn.addEventListener("click", launchSurprise);

createFloatingHearts(countdownFloatingLove);
pickCountdownTheme();
updateCountdown();
updateClue();
setInterval(updateCountdown, 1000);
setInterval(updateClue, 7000);

/* ════════════════════════════════
   GAME HUB
════════════════════════════════ */
(function () {
  const boredBtn = document.getElementById("boredBtn");
  const gamePanel = document.getElementById("gamePanel");
  const gameCloseBtn = document.getElementById("gameCloseBtn");
  const gamePicker = document.getElementById("gamePicker");
  const gamePanelTitle = document.getElementById("gamePanelTitle");

  const screens = {
    balloon: document.getElementById("gameBaloon"),
    memory: document.getElementById("gameMemory")
  };

  boredBtn.addEventListener("click", () => {
    gamePanel.classList.add("open");
    showPicker();
  });

  gameCloseBtn.addEventListener("click", closePanel);
  gamePanel.addEventListener("click", (e) => {
    if (e.target === gamePanel) closePanel();
  });

  function closePanel() {
    gamePanel.classList.remove("open");
    stopAllGames();
    showPicker();
  }

  function hideAllScreens() {
    Object.values(screens).forEach(el => el.classList.add("hidden"));
  }

  function showPicker() {
    gamePicker.classList.remove("hidden");
    hideAllScreens();
    gamePanelTitle.textContent = "🎮 Game Room";
  }

  function showGame(key, title) {
    gamePicker.classList.add("hidden");
    hideAllScreens();
    screens[key].classList.remove("hidden");
    gamePanelTitle.textContent = title;
  }

  function stopAllGames() {
    stopBalloon();
    stopMemory();
  }

  document.querySelectorAll(".game-pick-card[data-game]").forEach(btn => {
    btn.addEventListener("click", () => {
      const g = btn.dataset.game;
      if (g === "balloon") {
        showGame("balloon", "🎈 Pop Balloons");
        resetBalloon();
      }
      if (g === "memory") {
        showGame("memory", "🧩 Memory Match");
        resetMemory();
      }
    });
  });

  ["backFromBalloon", "backFromMemory"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", () => {
        stopAllGames();
        showPicker();
      });
    }
  });

  /* ════════════════════════
     GAME 1 — BALLOON POP
  ════════════════════════ */
  const LOVE_NOTES = [
    "You are my sunshine ☀️", "I love your smile 😊", "My favourite person 💖",
    "My heart is yours 💝", "You are magic ✨", "Forever yours 💕", "So lucky it's you 🍀",
    "Pure happiness 🎉", "My everything 🌍", "Heart smiles for you 💓", "You = joy 🌸"
  ];
  const BALLOONS = ["🎈", "🎀", "💗", "🌸", "💝", "🎊", "🌺", "💖"];

  let bActive = false, bScore = 0, bMissed = 0, bLevel = 1, bTimers = [], bGameTimer = null;
  const BTIME = 600, BMISS = 5;

  const bArena = document.getElementById("bArena");
  const bScoreEl = document.getElementById("bScore");
  const bMissEl = document.getElementById("bMissed");
  const bLevelEl = document.getElementById("bLevel");
  const bOverEl = document.getElementById("bGameover");
  const bStartBtn = document.getElementById("bStartBtn");

  bStartBtn.addEventListener("click", startBalloon);

  function resetBalloon() {
    stopBalloon();
    bScoreEl.textContent = "0";
    bMissEl.textContent = "0 / 5";
    bLevelEl.textContent = "1";
    bOverEl.textContent = "";
    bStartBtn.textContent = "🎈 Start Game";
    bStartBtn.classList.remove("hidden");
    bArena.innerHTML = "";
  }

  function stopBalloon() {
    bActive = false;
    clearTimeout(bGameTimer);
    bTimers.forEach(clearTimeout);
    bTimers = [];
    bArena.innerHTML = "";
  }

  function startBalloon() {
    stopBalloon();
    bActive = true;
    bScore = 0;
    bMissed = 0;
    bLevel = 1;
    bScoreEl.textContent = 0;
    bMissEl.textContent = "0 / 5";
    bLevelEl.textContent = 1;
    bOverEl.textContent = "";
    bStartBtn.classList.add("hidden");
    bGameTimer = setTimeout(endBalloon, BTIME * 1000);
    bSpawnWave();
  }

  function bSpawnWave() {
    if (!bActive) return;
    for (let i = 0; i < 2 + bLevel; i++) {
      bTimers.push(setTimeout(bSpawn, i * Math.max(120, 550 - bLevel * 35)));
    }
    bTimers.push(setTimeout(bSpawnWave, Math.max(1600, 3000 - bLevel * 180)));
  }

  function bSpawn() {
    if (!bActive) return;
    const b = document.createElement("div");
    b.className = "b-balloon";
    const emoji = BALLOONS[Math.floor(Math.random() * BALLOONS.length)];
    const dur = Math.max(1.6, 4.2 - bLevel * 0.28);
    const note = LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)];
    b.style.left = (4 + Math.random() * 82) + "%";
    b.style.animationDuration = dur + "s";
    b.innerHTML = `<div class="b-body">${emoji}</div><div class="b-string"></div>`;
    const pop = () => { if (b.parentNode && bActive) bPop(b, note); };
    b.addEventListener("click", pop);
    b.addEventListener("touchstart", e => { e.preventDefault(); pop(); }, { passive: false });
    bArena.appendChild(b);
    bTimers.push(setTimeout(() => {
      if (!b.parentNode || !bActive) return;
      b.remove();
      bMissed++;
      bMissEl.textContent = bMissed + " / 5";
      bArena.classList.add("b-arena-flash");
      setTimeout(() => bArena.classList.remove("b-arena-flash"), 280);
      if (bMissed >= BMISS) endBalloon();
    }, dur * 1000 + 50));
  }

  function bPop(b, note) {
    const r = bArena.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const x = br.left - r.left + br.width / 2;
    const y = br.top - r.top + br.height / 2;
    b.remove();
    bScore++;
    bScoreEl.textContent = bScore;
    bLevel = 1 + Math.floor(bScore / 10);
    bLevelEl.textContent = bLevel;
    const burst = document.createElement("div");
    burst.className = "b-pop-burst";
    burst.textContent = "💥";
    burst.style.left = (x - 20) + "px";
    burst.style.top = (y - 20) + "px";
    bArena.appendChild(burst);
    setTimeout(() => burst.remove(), 560);
    const np = document.createElement("div");
    np.className = "b-note-pop";
    np.textContent = note;
    np.style.left = Math.max(4, Math.min(x - 60, bArena.offsetWidth - 145)) + "px";
    np.style.top = (y - 10) + "px";
    bArena.appendChild(np);
    setTimeout(() => np.remove(), 1000);
  }

  function endBalloon() {
    bActive = false;
    clearTimeout(bGameTimer);
    bTimers.forEach(clearTimeout);
    bTimers = [];
    bArena.innerHTML = "";
    bOverEl.textContent = bScore >= 30 ? `🏆 ${bScore} pts — Incredible Sudu! 🏆`
      : bScore >= 15 ? `🌟 ${bScore} pts — Amazing! 🌟`
      : bScore >= 5 ? `💕 ${bScore} pts — Nice try! 💕`
      : `🥰 ${bScore} pts — You're adorable anyway! 🥰`;
    bStartBtn.textContent = "🎈 Play Again";
    bStartBtn.classList.remove("hidden");
  }

  /* ════════════════════════
     GAME 2 — MEMORY MATCH
  ════════════════════════ */
  const MEM_EMOJIS = ["💖", "🌸", "✨", "🎀", "💝", "🌺", "🦋", "🎊"];
  let mMoves = 0, mPairs = 0, mTimer = null, mSeconds = 0, mFlipped = [], mLocked = false;

  const mMovesEl = document.getElementById("mMoves");
  const mPairsEl = document.getElementById("mPairs");
  const mTimeEl = document.getElementById("mTime");
  const mGrid = document.getElementById("memGrid");
  const mOverEl = document.getElementById("mGameover");
  const mStartBtn = document.getElementById("mStartBtn");

  mStartBtn.addEventListener("click", startMemory);

  function resetMemory() {
    stopMemory();
    mMovesEl.textContent = "0";
    mPairsEl.textContent = "0 / 8";
    mTimeEl.textContent = "0s";
    mOverEl.textContent = "";
    mStartBtn.textContent = "🧩 Start Game";
    mStartBtn.classList.remove("hidden");
    mGrid.innerHTML = "";
  }

  function stopMemory() {
    clearInterval(mTimer);
    mTimer = null;
  }

  function startMemory() {
    stopMemory();
    mMoves = 0;
    mPairs = 0;
    mSeconds = 0;
    mFlipped = [];
    mLocked = false;
    mMovesEl.textContent = 0;
    mPairsEl.textContent = "0 / 8";
    mTimeEl.textContent = "0s";
    mOverEl.textContent = "";
    mStartBtn.classList.add("hidden");
    buildMemoryGrid();
    mTimer = setInterval(() => {
      mSeconds++;
      mTimeEl.textContent = mSeconds + "s";
    }, 1000);
  }

  function buildMemoryGrid() {
    const cards = [...MEM_EMOJIS, ...MEM_EMOJIS].sort(() => Math.random() - 0.5);
    mGrid.innerHTML = "";
    cards.forEach(emoji => {
      const card = document.createElement("div");
      card.className = "mem-card";
      card.innerHTML = `<div class="card-front">❓</div><div class="card-back">${emoji}</div>`;
      card.dataset.emoji = emoji;
      card.addEventListener("click", () => flipCard(card));
      mGrid.appendChild(card);
    });
  }

  function flipCard(card) {
    if (mLocked || card.classList.contains("flipped") || card.classList.contains("matched")) return;
    card.classList.add("flipped");
    mFlipped.push(card);
    if (mFlipped.length === 2) {
      mLocked = true;
      mMoves++;
      mMovesEl.textContent = mMoves;
      const [a, b] = mFlipped;
      if (a.dataset.emoji === b.dataset.emoji) {
        a.classList.add("matched");
        b.classList.add("matched");
        mPairs++;
        mPairsEl.textContent = mPairs + " / 8";
        mFlipped = [];
        mLocked = false;
        if (mPairs === 8) endMemory();
      } else {
        setTimeout(() => {
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          mFlipped = [];
          mLocked = false;
        }, 900);
      }
    }
  }

  function endMemory() {
    stopMemory();
    const rating = mMoves <= 16 ? "🏆 Perfect memory!" : mMoves <= 24 ? "🌟 Impressive!" : mMoves <= 36 ? "💕 Well done!" : "🥰 You did it!";
    mOverEl.textContent = `${rating} Completed in ${mSeconds}s with ${mMoves} moves!`;
    mStartBtn.textContent = "🧩 Play Again";
    mStartBtn.classList.remove("hidden");
  }
})();

/* ════════════════════════════════
   MAIN PAGE BUTTON → SHARED GAME ROOM
════════════════════════════════ */
(function () {
  const openGamesBtn = document.getElementById("openGamesBtn");
  const gamePanel = document.getElementById("gamePanel");

  if (!openGamesBtn || !gamePanel) return;

  openGamesBtn.addEventListener("click", () => {
    gamePanel.classList.add("open");
    const picker = document.getElementById("gamePicker");
    const title = document.getElementById("gamePanelTitle");
    if (picker) picker.classList.remove("hidden");
    ["gameBaloon", "gameMemory"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    if (title) title.textContent = "🎮 Game Room";
  });
})();
