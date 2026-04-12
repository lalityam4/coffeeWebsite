/* ============================================================
   Dial It In — Coffee Site JS
   ============================================================ */

// ── Scroll spy & nav ──────────────────────────────────────

const siteNav  = document.getElementById('siteNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  siteNav.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile hamburger ──────────────────────────────────────

const hamburger = document.getElementById('navHamburger');
const navMenu   = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});
navMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ── Fade-in on scroll ─────────────────────────────────────

const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// ── Bean flip cards ───────────────────────────────────────

document.querySelectorAll('.bean-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// ── Shot accordion ────────────────────────────────────────

document.querySelectorAll('.accordion-item').forEach(item => {
  item.querySelector('.accordion-header').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    // Open clicked if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ── Machine filter ────────────────────────────────────────

const mfilters = document.querySelectorAll('.mfilter');
const mcards   = document.querySelectorAll('.mcard');

mfilters.forEach(btn => {
  btn.addEventListener('click', () => {
    mfilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    mcards.forEach(card => {
      const show = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── Latte art step-through ────────────────────────────────

const LATTE_ART = {
  heart: {
    steps: [
      {
        title: "Steam your milk first",
        desc: "Before you even think about pouring, get your milk right. Use cold whole milk in a cold metal jug. You want silky, glossy microfoam — not bubbly cappuccino froth. Think: melted ice cream texture. If you can see bubbles, it's ruined. Start over.",
        tip: "💡 Target 60–65°C. Too hot and the milk tastes scorched. Too cold and the foam won't hold its shape when you pour.",
        diagram: drawHeart(0),
      },
      {
        title: "Pull your espresso shot",
        desc: "Get a double shot (about 36–40ml) in your cup, nice and fresh. Don't let it sit too long — the crema starts to break down. That golden-brown crema layer is what makes latte art stick and show up.",
        tip: "💡 Tilt the cup toward you slightly before you pour. It gives you more surface area to work with.",
        diagram: drawHeart(1),
      },
      {
        title: "Start pouring from high up",
        desc: "Begin your pour with the jug held about 10cm above the cup. Pour in a thin, steady stream toward the center. This builds the base of the latte and the milk goes under the crema — you won't see any pattern yet. That's normal.",
        tip: "💡 Don't rush. The first half of the pour is about building volume, not making art.",
        diagram: drawHeart(2),
      },
      {
        title: "Drop low and wiggle",
        desc: "When the cup is about half full, bring the jug close to the surface — almost touching. Start pouring faster. You should see white foam appearing on the surface. Now gently wiggle the jug side to side to spread the foam into a circle.",
        tip: "💡 The lower the jug, the more foam sits on top. If you stay high, the milk just dives under the crema.",
        diagram: drawHeart(3),
      },
      {
        title: "Cut through the center",
        desc: "Once you have a white blob on the surface, raise the jug slightly and pour a thin stream straight through the middle of the white circle, toward yourself. This cuts the circle in two and creates the dip at the top of the heart. Done!",
        tip: "💡 Don't panic if it looks like a blob the first 50 times. A heart is genuinely one of the hardest things to make look clean. Keep going.",
        diagram: drawHeart(4),
      },
    ],
  },

  tulip: {
    steps: [
      {
        title: "Steam milk to microfoam",
        desc: "Same as the heart — you need silky, glossy microfoam. No visible bubbles. Think wet paint. Give the jug a swirl before pouring to keep the foam incorporated and fluid.",
        tip: "💡 Whole milk is easiest to learn with. Oat milk can work but it behaves differently — save that for when you've got the basics.",
        diagram: drawTulip(0),
      },
      {
        title: "Pour the first blob",
        desc: "With the cup slightly tilted, bring the jug low to the surface and pour a small amount to create your first white circle. Stop pouring and lift the jug — this locks the first 'petal' of the tulip in place.",
        tip: "💡 The blob should be roughly round. If it streaks sideways, you're pouring too fast or the jug is too far away.",
        diagram: drawTulip(1),
      },
      {
        title: "Pour the second layer",
        desc: "Move the pour position slightly toward the back of the cup (away from you). Pour a second blob, slightly larger than the first. The first blob should push forward as the second one forms behind it.",
        tip: "💡 Each blob should push the previous one slightly — that's how you get the stacked tulip layers.",
        diagram: drawTulip(2),
      },
      {
        title: "Add a third layer",
        desc: "Optional but satisfying: add one more blob behind the second. By now you should have three stacked circles being pushed toward the near edge of the cup. The cup might be almost full — that's okay.",
        tip: "💡 Some baristas do 2-layer tulips, some do 5. Start with 2 or 3 until you nail the push effect.",
        diagram: drawTulip(3),
      },
      {
        title: "Cut through all layers",
        desc: "Finish by cutting a thin stream straight through the center of all the blobs, from back to front, like drawing a line through them. This creates the tulip stem and separates the petals. Lift the jug as you finish to end the pour cleanly.",
        tip: "💡 The cut should be one confident, straight motion. Hesitating makes it wobbly. Commit to it.",
        diagram: drawTulip(4),
      },
    ],
  },

  rosette: {
    steps: [
      {
        title: "Get your microfoam right",
        desc: "The rosette is the hardest of the three — it needs the silkiest, most fluid foam you can make. Any large bubbles and the pattern won't hold. Swirl the jug aggressively before you start to get everything smooth and consistent.",
        tip: "💡 If your foam looks foamy (chunky), try spinning the jug on the counter while it's still hot. The centrifugal motion pops bubbles.",
        diagram: drawRosette(0),
      },
      {
        title: "Build a base layer",
        desc: "Pour from high up, filling the cup to about 40–50% without any wiggling. You're building the canvas. The espresso and milk mix below the crema — the white foam will float on top when you drop low.",
        tip: "💡 More base = more surface area to work with. Don't rush into the pattern part.",
        diagram: drawRosette(1),
      },
      {
        title: "Drop low and start wiggling",
        desc: "Drop the jug close to the surface and begin a steady side-to-side wiggle — left, right, left, right — as you slowly move the pour point toward yourself. You should see the foam fanning out in a zigzag.",
        tip: "💡 The wiggle rhythm and pour speed need to match. Too fast and it blobs. Too slow and the lines run together.",
        diagram: drawRosette(2),
      },
      {
        title: "Move steadily toward yourself",
        desc: "Keep wiggling while slowly pulling the pour toward the near edge of the cup. Each wiggle creates one 'leaf' of the rosette. Try to keep your wiggles evenly spaced — this is the part that takes the most practice.",
        tip: "💡 Think of it like drawing a wavy line that moves in one direction. The wiggle is the waves, the forward motion is the line.",
        diagram: drawRosette(3),
      },
      {
        title: "Cut through the center",
        desc: "When you reach the near edge, raise the jug and pour a thin, fast stream straight back through the middle of the entire rosette from front to back. This is the stem that ties all the leaves together. End the pour cleanly.",
        tip: "💡 A clean stem makes a good rosette look great. A wobbly one makes it look like a leaf pile. One clean confident line.",
        diagram: drawRosette(4),
      },
    ],
  },
};

// ── SVG Cup Diagram Generators ────────────────────────────

function cupBase() {
  return `
    <svg viewBox="0 0 240 260" xmlns="http://www.w3.org/2000/svg">
      <!-- saucer -->
      <ellipse cx="120" cy="235" rx="90" ry="16" fill="#C4956A" opacity="0.3"/>
      <!-- cup body -->
      <path d="M52 118 Q48 204 120 210 Q192 204 188 118 Z" fill="#F5F0E8" stroke="#3C1F0F" stroke-width="2"/>
      <!-- handle -->
      <path d="M188 135 Q220 135 220 165 Q220 195 188 188" fill="none" stroke="#3C1F0F" stroke-width="2.5" stroke-linecap="round"/>
      <!-- crema -->
      <ellipse cx="120" cy="118" rx="68" ry="14" fill="#C0824A" opacity="0.9"/>
      <!-- cup rim -->
      <ellipse cx="120" cy="118" rx="68" ry="14" fill="none" stroke="#3C1F0F" stroke-width="2"/>
  `;
}

function drawHeart(step) {
  const art = [
    `<!-- step 0: empty cup -->`,
    `<!-- step 1: espresso only -->
     <ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.6"/>`,
    `<!-- step 2: pour started -->
     <ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.6"/>
     <ellipse cx="120" cy="118" rx="28" ry="5" fill="#F5F0E8" opacity="0.4"/>`,
    `<!-- step 3: white blob -->
     <ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <ellipse cx="120" cy="116" rx="38" ry="9" fill="white" opacity="0.85"/>`,
    `<!-- step 4: heart forming -->
     <ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <path d="M120 130 Q102 118 102 108 Q102 98 110 98 Q120 98 120 105 Q120 98 130 98 Q138 98 138 108 Q138 118 120 130Z" fill="white" opacity="0.9"/>`,
    `<!-- step 5: finished heart -->
     <ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <path d="M120 132 Q100 118 100 106 Q100 94 110 94 Q120 94 120 102 Q120 94 130 94 Q140 94 140 106 Q140 118 120 132Z" fill="white" opacity="0.9"/>`,
  ][step];
  return cupBase() + art + `</svg>`;
}

function drawTulip(step) {
  const art = [
    ``,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <ellipse cx="120" cy="116" rx="22" ry="6" fill="white" opacity="0.85"/>`,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <ellipse cx="120" cy="117" rx="22" ry="6" fill="white" opacity="0.75"/>
     <ellipse cx="120" cy="112" rx="18" ry="5" fill="white" opacity="0.9"/>`,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <ellipse cx="120" cy="119" rx="24" ry="6" fill="white" opacity="0.7"/>
     <ellipse cx="120" cy="113" rx="20" ry="5" fill="white" opacity="0.8"/>
     <ellipse cx="120" cy="107" rx="16" ry="5" fill="white" opacity="0.9"/>`,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <ellipse cx="120" cy="119" rx="24" ry="6" fill="white" opacity="0.7"/>
     <ellipse cx="120" cy="113" rx="20" ry="5" fill="white" opacity="0.8"/>
     <ellipse cx="120" cy="107" rx="16" ry="5" fill="white" opacity="0.9"/>
     <line x1="120" y1="105" x2="120" y2="122" stroke="#C0824A" stroke-width="2" opacity="0.6"/>`,
  ][step] || '';
  return cupBase() + art + `</svg>`;
}

function drawRosette(step) {
  const art = [
    ``,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>`,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <ellipse cx="120" cy="116" rx="40" ry="8" fill="white" opacity="0.5"/>`,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <path d="M86 118 Q92 112 98 118 Q104 112 110 118 Q116 112 122 118 Q128 112 134 118 Q140 112 146 118 Q152 112 155 116" fill="none" stroke="white" stroke-width="7" stroke-linecap="round" opacity="0.85"/>`,
    `<ellipse cx="120" cy="118" rx="60" ry="10" fill="#8B4513" opacity="0.5"/>
     <path d="M86 119 Q92 111 98 119 Q104 111 110 119 Q116 111 122 119 Q128 111 134 119 Q140 111 146 119 Q152 113 154 117" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
     <line x1="120" y1="108" x2="120" y2="126" stroke="#C0824A" stroke-width="2.5" opacity="0.7"/>`,
  ][step] || '';
  return cupBase() + art + `</svg>`;
}

// ── Latte art controller ──────────────────────────────────

let currentArt  = 'heart';
let currentStep = 0;

function renderLatteStep() {
  const art  = LATTE_ART[currentArt];
  const step = art.steps[currentStep];
  const total = art.steps.length;

  document.getElementById('stepCurrent').textContent = currentStep + 1;
  document.getElementById('stepTotal').textContent   = total;
  document.getElementById('latteStepTitle').textContent = step.title;
  document.getElementById('latteStepDesc').textContent  = step.desc;
  document.getElementById('latteStepTip').textContent   = step.tip || '';

  const diagram = document.getElementById('latteDiagram');
  diagram.style.opacity = '0';
  setTimeout(() => {
    diagram.innerHTML  = step.diagram;
    diagram.style.opacity = '1';
  }, 200);

  // Dots
  const dotsEl = document.getElementById('latteDots');
  dotsEl.innerHTML = art.steps.map((_, i) =>
    `<div class="latte-dot${i === currentStep ? ' active' : ''}"></div>`
  ).join('');

  document.getElementById('lattePrev').disabled = currentStep === 0;
  document.getElementById('latteNext').disabled = currentStep === total - 1;
}

document.getElementById('lattePrev')?.addEventListener('click', () => {
  if (currentStep > 0) { currentStep--; renderLatteStep(); }
});
document.getElementById('latteNext')?.addEventListener('click', () => {
  const total = LATTE_ART[currentArt].steps.length;
  if (currentStep < total - 1) { currentStep++; renderLatteStep(); }
});

document.querySelectorAll('.latte-type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.latte-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentArt  = btn.dataset.art;
    currentStep = 0;
    renderLatteStep();
  });
});

// ── Smooth scroll for nav links ───────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Init ──────────────────────────────────────────────────

renderLatteStep();
