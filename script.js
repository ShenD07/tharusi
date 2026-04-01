const CONFIG = {
  testMode: false,
  testSeconds: 10,
  realTargetDate: "2026-06-17T00:00:00",
  showClues: true
};

const photos = [
  {
    src: "img1.png",
    caption: "The moment I realized how lucky I am to have you 💖",
  },
  {
    src: "img2.png",
    caption: "A memory with you that I’ll cherish forever ✨",
  },
  {
    src: "img3.png",
    caption: "Her smile… my favorite view in the world 🌸",
  },
];

const messages = [
  "Happy Birthday, my love. You make my world softer, brighter, and more beautiful every single day.",
  "Every memory with you feels like my favorite song on repeat.",
  "Your smile is my peace, your laugh is my happiness, and your love is my biggest blessing.",
  "No matter how many birthdays come and go, I will always choose you, celebrate you, and love you more each day.",
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
  { name: "theme-fuchsia-night", rain: false, particles: 28 },
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

  setTimeout(() => {
    launchSurprise();
  }, 850);
}

function revealMainPage() {
  preReveal.classList.add("hidden");
  mainPage.classList.remove("hidden");
  renderMainPhoto();
  createFloatingHearts(floatingLove);
  startTypewriter(messages);
  startPhotoAutoSlide();
}

openLetterBtn.addEventListener("click", () => {
  letterModal.classList.add("show");
});

closeLetterBtn.addEventListener("click", () => {
  letterModal.classList.remove("show");
});

letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) {
    letterModal.classList.remove("show");
  }
});

giftTrigger.addEventListener("click", openGiftAnimation);

closeSurpriseBtn.addEventListener("click", () => {
  const mainHidden = mainPage.classList.contains("hidden");
  surpriseOverlay.classList.remove("show");
  if (mainHidden) {
    revealMainPage();
  }
});

openSurpriseBtn.addEventListener("click", () => {
  launchSurprise();
});

createFloatingHearts(countdownFloatingLove);
pickCountdownTheme();
updateCountdown();
updateClue();

setInterval(updateCountdown, 1000);
setInterval(updateClue, 7000);

/* ════════════════════════════════
   BORED BUTTON + GAME PANEL
════════════════════════════════ */
(function () {
  const boredBtn    = document.getElementById("boredBtn");
  const gamePanel   = document.getElementById("gamePanel");
  const gameCloseBtn= document.getElementById("gameCloseBtn");

  // open panel
  boredBtn.addEventListener("click", () => {
    gamePanel.classList.add("open");
    // reset game UI when opening
    resetGameUI();
  });

  // close panel — stop game if running
  gameCloseBtn.addEventListener("click", () => {
    gamePanel.classList.remove("open");
    stopGame();
  });

  // close on backdrop click
  gamePanel.addEventListener("click", (e) => {
    if (e.target === gamePanel) {
      gamePanel.classList.remove("open");
      stopGame();
    }
  });

  /* ── GAME LOGIC ── */
  const LOVE_NOTES = [
    "You are my sunshine ☀️",
    "I love your smile 😊",
    "My favourite person 💖",
    "My heart is yours 💝",
    "You are magic ✨",
    "Forever yours 💕",
    "So lucky it's you 🍀",
    "Pure happiness 🎉",
    "My everything 🌍",
    "Heart smiles for you 💓",
    "You = joy 🌸",
  ];

  const BALLOONS = ["🎈", "🎀", "💗", "🌸", "💝", "🎊", "🌺", "💖"];

  let active = false, score = 0, missed = 0, level = 1;
  let timers = [], gameTimerID = null;
  const GAME_TIME = 600, MAX_MISS = 5;

  const arena    = document.getElementById("bArena");
  const scoreEl  = document.getElementById("bScore");
  const missEl   = document.getElementById("bMissed");
  const levelEl  = document.getElementById("bLevel");
  const overEl   = document.getElementById("bGameover");
  const startBtn = document.getElementById("bStartBtn");

  startBtn.addEventListener("click", startGame);

  function resetGameUI() {
    scoreEl.textContent = 0;
    missEl.textContent  = "0 / 5";
    levelEl.textContent = 1;
    overEl.textContent  = "";
    startBtn.textContent    = "🎈 Start Game";
    startBtn.style.display  = "inline-block";
    arena.innerHTML = "";
  }

  function stopGame() {
    active = false;
    clearTimeout(gameTimerID);
    timers.forEach(clearTimeout);
    timers = [];
    arena.innerHTML = "";
  }

  function startGame() {
    stopGame();
    active = true; score = 0; missed = 0; level = 1;
    scoreEl.textContent = 0;
    missEl.textContent  = "0 / 5";
    levelEl.textContent = 1;
    overEl.textContent  = "";
    startBtn.style.display = "none";

    gameTimerID = setTimeout(endGame, GAME_TIME * 1000);
    spawnWave();
  }

  function spawnWave() {
    if (!active) return;
    const count = 2 + level;
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(spawnBalloon, i * Math.max(120, 550 - level * 35)));
    }
    timers.push(setTimeout(spawnWave, Math.max(1600, 3000 - level * 180)));
  }

  function spawnBalloon() {
    if (!active) return;
    const b        = document.createElement("div");
    b.className    = "b-balloon";
    const emoji    = BALLOONS[Math.floor(Math.random() * BALLOONS.length)];
    const duration = Math.max(1.6, 4.2 - level * 0.28);
    const left     = 4 + Math.random() * 82;
    const note     = LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)];

    b.style.left = left + "%";
    b.style.animationDuration = duration + "s";
    b.innerHTML = `<div class="b-body">${emoji}</div><div class="b-string"></div>`;

    const pop = () => { if (b.parentNode && active) doPop(b, note); };
    b.addEventListener("click", pop);
    b.addEventListener("touchstart", e => { e.preventDefault(); pop(); }, { passive: false });
    arena.appendChild(b);

    const missID = setTimeout(() => {
      if (!b.parentNode || !active) return;
      b.remove();
      missed++;
      missEl.textContent = missed + " / 5";
      arena.classList.add("b-arena-flash");
      setTimeout(() => arena.classList.remove("b-arena-flash"), 280);
      if (missed >= MAX_MISS) endGame();
    }, duration * 1000 + 50);

    timers.push(missID);
  }

  function doPop(b, note) {
    const rect  = arena.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    const x = bRect.left - rect.left + bRect.width / 2;
    const y = bRect.top  - rect.top  + bRect.height / 2;
    b.remove();

    score++;
    scoreEl.textContent = score;
    level = 1 + Math.floor(score / 10);
    levelEl.textContent = level;

    const burst = document.createElement("div");
    burst.className = "b-pop-burst";
    burst.textContent = "💥";
    burst.style.left = (x - 20) + "px";
    burst.style.top  = (y - 20) + "px";
    arena.appendChild(burst);
    setTimeout(() => burst.remove(), 560);

    const np = document.createElement("div");
    np.className = "b-note-pop";
    np.textContent = note;
    np.style.left = Math.max(4, Math.min(x - 60, arena.offsetWidth - 145)) + "px";
    np.style.top  = (y - 10) + "px";
    arena.appendChild(np);
    setTimeout(() => np.remove(), 1000);
  }

  function endGame() {
    active = false;
    clearTimeout(gameTimerID);
    timers.forEach(clearTimeout);
    timers = [];
    arena.innerHTML = "";

    let msg;
    if (score >= 30)      msg = `🏆 ${score} pts — Incredible Sudu! 🏆`;
    else if (score >= 15) msg = `🌟 ${score} pts — Amazing! 🌟`;
    else if (score >= 5)  msg = `💕 ${score} pts — Nice try! 💕`;
    else                  msg = `🥰 ${score} pts — You're adorable anyway! 🥰`;

    overEl.textContent      = msg;
    startBtn.textContent    = "🎈 Play Again";
    startBtn.style.display  = "inline-block";
  }
})();

