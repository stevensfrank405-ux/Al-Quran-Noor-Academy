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
