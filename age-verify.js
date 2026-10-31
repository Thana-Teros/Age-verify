(function () {
  'use strict';

  // This widget is an information barrier, not a reliable access-control system.
  // Visitors can bypass any browser-only check; protect sensitive resources server-side.
  const defaults = {
    ageLimit: '18',
    titleText: 'AVEZ-VOUS PLUS DE __AGE_LIMIT__ ANS ?',
    descriptionText: "En entrant sur ce site, vous confirmez avoir l'âge requis.",
    yesButtonText: "J'ai plus de __AGE_LIMIT__ ans",
    noButtonText: "J'ai moins de __AGE_LIMIT__ ans",
    redirectUrl: 'https://www.google.com',
    modalBgColor: '#FDF1D3',
    textColor: '#111111',
    yesButtonBg: '#1b4332',
    yesButtonColor: '#ffffff',
    noButtonBg: '#FDF1D3',
    noButtonColor: '#111111'
  };

  function decodeBase64Utf8(value) {
    if (typeof value !== 'string') return '';
    try {
      const bytes = Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch (_) {
      return '';
    }
  }

  const encodedConfig = window.__AGE_VERIFY_CONFIG__ || {};
  const config = Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => {
    const value = decodeBase64Utf8(encodedConfig[key]);
    return [key, value || fallback];
  }));

  const storageKey = 'age_verify_information_acknowledged_v1';
  if (localStorage.getItem(storageKey) === 'true') return;

  const replaceAgeLimit = (text) => text.replaceAll('__AGE_LIMIT__', config.ageLimit);
  const style = document.createElement('style');
  style.textContent = [
    '#custom-age-overlay { position: fixed; inset: 0; z-index: 2147483647; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0, 0, 0, .85); font-family: Arial, sans-serif; }',
    '#custom-age-modal { width: min(650px, 100%); box-sizing: border-box; padding: 40px; border-radius: 12px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,.5); }',
    '#custom-age-modal h2 { margin: 0 0 20px; font-size: 26px; }',
    '#custom-age-modal p { margin: 0 0 35px; line-height: 1.5; }',
    '.age-btn-container { display: flex; justify-content: center; gap: 20px; }',
    '.age-btn { flex: 1; padding: 16px 20px; border: 1px solid currentColor; border-radius: 4px; cursor: pointer; font-weight: bold; }',
    '@media (max-width: 480px) { .age-btn-container { flex-direction: column; } }'
  ].join('\n');
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'custom-age-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'custom-age-title');

  const modal = document.createElement('section');
  modal.id = 'custom-age-modal';
  modal.style.color = config.textColor;
  modal.style.backgroundColor = config.modalBgColor;

  const title = document.createElement('h2');
  title.id = 'custom-age-title';
  title.textContent = replaceAgeLimit(config.titleText);
  const description = document.createElement('p');
  description.textContent = replaceAgeLimit(config.descriptionText);
  const buttons = document.createElement('div');
  buttons.className = 'age-btn-container';

  const noButton = document.createElement('button');
  noButton.type = 'button';
  noButton.className = 'age-btn';
  noButton.textContent = replaceAgeLimit(config.noButtonText);
  noButton.style.color = config.noButtonColor;
  noButton.style.backgroundColor = config.noButtonBg;

  const yesButton = document.createElement('button');
  yesButton.type = 'button';
  yesButton.className = 'age-btn';
  yesButton.textContent = replaceAgeLimit(config.yesButtonText);
  yesButton.style.color = config.yesButtonColor;
  yesButton.style.backgroundColor = config.yesButtonBg;
  yesButton.style.borderColor = config.yesButtonBg;

  yesButton.addEventListener('click', () => {
    localStorage.setItem(storageKey, 'true');
    overlay.remove();
  });
  noButton.addEventListener('click', () => window.location.assign(config.redirectUrl));

  buttons.append(noButton, yesButton);
  modal.append(title, description, buttons);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  yesButton.focus();
})();
