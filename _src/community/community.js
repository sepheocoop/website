const root = document.documentElement;
const themeButton = document.querySelector('.js-theme-toggle');
const themeIcon = document.querySelector('.js-theme-icon');
const menuButton = document.querySelector('.js-community-menu');
const navLinks = document.querySelector('.js-community-links');

const themeIcons = {
  dark: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `,
  light: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z"></path>
    </svg>
  `,
};

function setTheme(theme) {
  root.dataset.theme = theme;

  if (themeIcon) {
    themeIcon.innerHTML = theme === 'dark' ? themeIcons.dark : themeIcons.light;
  }

  if (themeButton) {
    themeButton.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
    );
  }
}

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem('sepheo-community-theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
  } catch {
    // Theme preference persistence is optional.
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function closeMenu() {
  navLinks?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

setTheme(getInitialTheme());

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);

  try {
    window.localStorage.setItem('sepheo-community-theme', nextTheme);
  } catch {}
});

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('is-open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (event) => {
  const link =
    event.target instanceof Element ? event.target.closest('a') : null;

  if (!link) {
    return;
  }

  closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

document.addEventListener('click', (event) => {
  if (
    event.target instanceof Node &&
    !menuButton?.contains(event.target) &&
    !navLinks?.contains(event.target)
  ) {
    closeMenu();
  }
});
