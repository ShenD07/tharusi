const CONFIG = {
  testMode: true,          // true = 30 seconds, false = real target date
  testSeconds: 30,
  realTargetDate: "2026-06-17T00:00:00",
  showClues: true
};

const photos = [
  {
    src: "images/img1.png",
    caption: "Replace this with your favorite photo together 💕",
  },
  {
    src: "images/img2.png",
    caption: "A memory that still makes you smile ✨",
  },
  {
    src: "images/img3.png",
    caption: "Her cutest moment ever 🌸",
  }
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
  "ALMOST TIME",
  "SOMETHING BEAUTIFUL IS WAITING",
  "JUST A LITTLE LONGER",
  "KEEP WATCHING",
  "SOON",
  "DON'T OPEN TOO EARLY"
];

const countdownThemes = [
  { name: "theme-romantic-pink", rain: false, particles: 18 },
  { name: "theme-rainy-rose", rain: true, particles: 12 },
  { name: "theme-blush-mist", rain: false, particles: 20 },
  { name: "theme-fuchsia-night", rain: false, particles: 26 }
];

const targetDate = CONFIG.testMode
  ? new Date(Date.now() + CONFIG.testSeconds * 1000)
  : new Date(CONFIG.realTargetDate);

/* elements */
const preReveal = document.getElementById("preReveal");
const countdownStage = document.getElementById("countdownStage");
const giftStage = document.getElementById("giftStage");
const giftTrigger = document.getElementById("giftTrigger");
const wishOverlay = document.getElementById("wishOverlay");
const enterMainPageBtn = document.getElementById("enterMainPageBtn");
const mainPage = document.getElementById("mainPage");
const countdownClue = document.getElementById("countdownClue");

const countdownThemeOverlay = document.getElementById("countdownThemeOverlay");
const countdownRain = document.getElementById("countdownRain");
const countdownParticles = document.getElementById("countdownParticles");

const confettiLayer = document.getElementById("confettiLayer");
const balloonLayer = document.getElementById("balloonLayer");

const mainPhoto = document.getElementById("mainPhoto");
const mainCaption = document.getElementById("mainCaption");
const typewriter = document.getElementById("typewriter");
const floatingLove = document.getElementById("floatingLove");

const letterModal = document.getElementById("letterModal");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");

let currentPhoto = 0;
let photoInterval = null;
let countdownFinished = false;
let giftOpened = false;
let countdownSlides = [];
let countdownSlideIndex = 0;

/* main photo slideshow */
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
  photoInterval = setInterval(nextPhoto, 4000);
}

/* typewriter */
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

/* floating hearts */
function createFloatingHearts() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 12 + Math.random() * 18 + "px";
    heart.style.animationDuration = 8 + Math.random() * 10 + "s";
    heart.style.animationDelay = Math.random() * 8 + "s";
    floatingLove.appendChild(heart);
  }
}


/* countdown theme */
function pickCountdownTheme() {
  const randomTheme = countdownThemes[Math.floor(Math.random() * countdownThemes.length)];
  countdownThemeOverlay.className = `countdown-theme-overlay ${randomTheme.name}`;

  countdownRain.innerHTML = "";
  if (randomTheme.rain) {
    for (let i = 0; i < 70; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.opacity = `${0.2 + Math.random() * 0.4}`;
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
    dot.style.animationDuration = `${8 + Math.random() * 10}s`;
    dot.style.animationDelay = `${Math.random() * 4}s`;
    countdownParticles.appendChild(dot);
  }
}

/* clues */
function updateClue() {
  countdownClue.textContent = CONFIG.showClues
    ? clues[Math.floor(Math.random() * clues.length)]
    : "";
}

/* countdown logic */
function updateCountdown() {
  if (countdownFinished) return;

  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    document.getElementById("days").textContent = "000";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    countdownFinished = true;
    showGiftStage();
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

function showGiftStage() {
  countdownStage.classList.add("hidden");
  giftStage.classList.remove("hidden");
}

/* effects */
function createSparkBurst() {
  const burstCount = 26;

  for (let i = 0; i < burstCount; i++) {
    const spark = document.createElement("div");
    spark.className = "spark-burst";
    spark.textContent = i % 2 === 0 ? "✨" : "💖";
    spark.style.fontSize = `${20 + Math.random() * 18}px`;
    spark.style.opacity = "1";
    document.body.appendChild(spark);

    const x = (Math.random() - 0.5) * 700;
    const y = (Math.random() - 0.5) * 500;

    requestAnimationFrame(() => {
      spark.style.transform = `translate(${x}px, ${y}px) scale(1.4) rotate(${Math.random() * 260}deg)`;
      spark.style.opacity = "0";
    });

    setTimeout(() => spark.remove(), 1100);
  }
}

function createConfetti() {
  confettiLayer.innerHTML = "";
  const colors = ["#ffd6ea", "#fff2b2", "#ffffff", "#ff8dc2", "#f6d6ff"];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${3 + Math.random() * 2.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
  }
}

function createBalloons() {
  balloonLayer.innerHTML = "";
  const colors = [
    "linear-gradient(180deg, #ffd2e7, #ff8fbe)",
    "linear-gradient(180deg, #fff7c8, #ffd778)",
    "linear-gradient(180deg, #ffffff, #f3d9e6)",
    "linear-gradient(180deg, #f4ddff, #dda2ff)"
  ];

  for (let i = 0; i < 16; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = `${7 + Math.random() * 5}s`;
    balloon.style.animationDelay = `${Math.random() * 1.2}s`;
    balloon.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
    balloonLayer.appendChild(balloon);
  }
}

/* gift */
function openGiftAnimation() {
  if (giftOpened) return;
  giftOpened = true;

  giftTrigger.classList.add("opening");

  setTimeout(() => {
    giftTrigger.classList.add("opened");
    createSparkBurst();
  }, 180);

  setTimeout(() => {
    wishOverlay.classList.add("show");
    createConfetti();
    createBalloons();
  }, 950);
}

/* reveal main page */
function enterMainPage() {
  wishOverlay.classList.remove("show");
  preReveal.classList.add("hidden");
  mainPage.classList.remove("hidden");

  renderMainPhoto();
  startPhotoAutoSlide();
  startTypewriter(messages);
  createFloatingHearts();
}

/* love letter */
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

/* events */
giftTrigger.addEventListener("click", openGiftAnimation);
enterMainPageBtn.addEventListener("click", enterMainPage);

/* init */

pickCountdownTheme();
updateClue();
updateCountdown();

setInterval(updateCountdown, 1000);
setInterval(updateClue, 7000);