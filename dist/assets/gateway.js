const intro = document.querySelector('.intro');
const skip = document.querySelector('.intro-skip');
const replay = document.querySelector('.replay');
const gateway = document.querySelector('.gateway');
const main = document.getElementById('main');
const motion = matchMedia('(prefers-reduced-motion: no-preference)');
const pointerMotion = matchMedia('(hover: hover) and (pointer: fine)');
const sessionKey = 'graphity-gateway-intro-v3';
let expiration;
let introReturnFocus = main;

function finishIntro() {
  if (intro.hidden) return;
  const skipHadFocus = document.activeElement === skip;
  clearTimeout(expiration);
  intro.hidden = true;
  gateway.classList.remove('is-introducing');
  if (skipHadFocus) introReturnFocus.focus({ preventScroll: true });
}

function startIntro(returnFocus = main) {
  if (!motion.matches || !intro.hidden) return;
  introReturnFocus = returnFocus;
  intro.hidden = false;
  gateway.classList.add('is-introducing');
  expiration = setTimeout(finishIntro, 1800);
}

function isFirstVisit() {
  try {
    if (sessionStorage.getItem(sessionKey)) return false;
    sessionStorage.setItem(sessionKey, '1');
    return true;
  } catch {
    return false;
  }
}

function updateMotionPreference() {
  replay.hidden = !motion.matches;
  if (!motion.matches) finishIntro();
}

updateMotionPreference();
motion.addEventListener('change', updateMotionPreference);
skip.addEventListener('click', finishIntro);
replay.addEventListener('click', () => {
  startIntro(replay);
  if (!intro.hidden) skip.focus({ preventScroll: true });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') finishIntro();
});
document.addEventListener('focusin', event => {
  if (!intro.contains(event.target)) finishIntro();
});

if (motion.matches && isFirstVisit()) startIntro();

for (const card of document.querySelectorAll('.division')) {
  card.addEventListener('pointermove', event => {
    if (!motion.matches || !pointerMotion.matches) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', ((event.clientX - left) / width) * 100 + '%');
    card.style.setProperty('--pointer-y', ((event.clientY - top) / height) * 100 + '%');
  });
}
