const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));
document.querySelectorAll('[data-course]').forEach(link => link.addEventListener('click', () => {
  const select = document.querySelector('#course');
  if (select) select.value = link.dataset.course;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#trial-form');
const message = document.querySelector('#inquiry-message');
if (form) {
const selectedCourse = new URLSearchParams(window.location.search).get('course');
const courseSelect = document.querySelector('#course');
if ([...courseSelect.options].some(option => option.value === selectedCourse)) courseSelect.value = selectedCourse;
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  message.value = `Assalamu Alaikum, I would like to enquire about lessons at Al-Quran Noor Academy.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCountry / time zone: ${data.get('country')}\nLearning for: ${data.get('learner')}\nCourse: ${data.get('course')}\nGoals & preferred times: ${data.get('goals') || 'To be discussed'}\n\nPlease share trial arrangements, available timings, and fees.`;
  document.querySelector('#inquiry-result').hidden = false;
  document.querySelector('#copy-status').textContent = '';
  message.focus();
});
document.querySelector('#copy-inquiry').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(message.value);
    status.textContent = 'Message copied. You can paste it into an email or chat.';
  } catch {
    message.focus();
    message.select();
    status.textContent = 'Select and copy the message above, or download it below.';
  }
});
document.querySelector('#download-inquiry').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([message.value], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'al-quran-noor-inquiry.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

}

// Enhance visible content without hiding it when JavaScript is unavailable.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.course-card, .explore-card, .module, .steps article, .approach-item, .quote-art, .reading-panel, .center-heading, .section-heading, .reflection-shell');
let revealObserver;
function revealEverything() {
  revealTargets.forEach(element => element.classList.remove('reveal-pending'));
  revealObserver?.disconnect();
}
if ('IntersectionObserver' in window && !motionPreference.matches) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${(index % 3) * 130}ms`);
    element.classList.add('reveal-pending');
    revealObserver.observe(element);
  });
}
motionPreference.addEventListener('change', event => { if (event.matches) revealEverything(); });

const reflectionSlides = [...document.querySelectorAll('[data-reflection]')];
if (reflectionSlides.length) {
  let reflectionIndex = 0;
  document.querySelector('.reflection-controls').hidden = false;
  function showReflection(direction) {
    reflectionIndex = (reflectionIndex + direction + reflectionSlides.length) % reflectionSlides.length;
    reflectionSlides.forEach((slide, index) => { slide.hidden = index !== reflectionIndex; });
    document.querySelector('#reflection-count').textContent = `${reflectionIndex + 1} / ${reflectionSlides.length}`;
  }
  document.querySelector('#previous-reflection').addEventListener('click', () => showReflection(-1));
  document.querySelector('#next-reflection').addEventListener('click', () => showReflection(1));
}
const backToTop = document.createElement('button');
backToTop.type = 'button';
backToTop.className = 'back-to-top';
backToTop.textContent = '↑ Top';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.hidden = true;
document.body.append(backToTop);
let scrollUpdatePending = false;
function updateScrollState() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
  document.documentElement.style.setProperty('--reading-progress', progress);
  backToTop.hidden = window.scrollY < 650;
  scrollUpdatePending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollUpdatePending) {
    scrollUpdatePending = true;
    window.requestAnimationFrame(updateScrollState);
  }
}, { passive: true });
window.addEventListener('resize', updateScrollState);
updateScrollState();
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: motionPreference.matches ? 'instant' : 'smooth' });
  const homeLink = document.querySelector('header .brand');
  homeLink?.focus({ preventScroll: true });
});

// A visible pause control keeps decorative motion optional.
const motionToggle = document.createElement('button');
motionToggle.type = 'button';
motionToggle.className = 'motion-toggle';
motionToggle.setAttribute('aria-label', 'Pause decorative animations');
motionToggle.setAttribute('aria-pressed', 'false');
motionToggle.textContent = 'Ⅱ Pause motion';
document.body.append(motionToggle);
let userPausedMotion = false;
function updateMotionControls() {
  const paused = userPausedMotion || motionPreference.matches;
  document.documentElement.classList.toggle('motion-paused', paused);
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.textContent = motionPreference.matches ? 'Motion reduced' : paused ? '▷ Resume motion' : 'Ⅱ Pause motion';
  motionToggle.setAttribute('aria-label', paused ? 'Resume decorative animations' : 'Pause decorative animations');
  motionToggle.disabled = motionPreference.matches;
  if (paused) revealEverything();
}
motionToggle.addEventListener('click', () => {
  userPausedMotion = !userPausedMotion;
  updateMotionControls();
});
motionPreference.addEventListener('change', updateMotionControls);
updateMotionControls();
