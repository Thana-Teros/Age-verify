(function () {
  if (localStorage.getItem('age_verified') === 'true') return;

  const style = document.createElement('style');
  style.textContent = `
    #custom-age-overlay { position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, .85); font-family: Arial, sans-serif; }
    #custom-age-modal { width: min(650px, 90vw); box-sizing: border-box; padding: 40px; border-radius: 12px; text-align: center; color: __TEXT_COLOR__; background: __MODAL_BG__; box-shadow: 0 10px 30px rgba(0,0,0,.5); }
    #custom-age-modal h2 { margin: 0 0 20px; font-size: 26px; }
    #custom-age-modal p { margin: 0 0 35px; line-height: 1.5; }
    .age-btn-container { display: flex; justify-content: center; gap: 20px; }
    .age-btn { flex: 1; padding: 16px 20px; border: 1px solid __TEXT_COLOR__; border-radius: 4px; cursor: pointer; font-weight: bold; }
    #age-btn-no { color: __BTN_NO_COLOR__; background: __BTN_NO_BG__; }
    #age-btn-yes { color: __BTN_YES_COLOR__; border-color: __BTN_YES_BG__; background: __BTN_YES_BG__; }
    @media (max-width: 480px) { .age-btn-container { flex-direction: column; } }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'custom-age-overlay';
  overlay.innerHTML = `<div id="custom-age-modal"><h2>__TITLE_TEXT__</h2><p>__DESCRIPTION_TEXT__</p><div class="age-btn-container"><button class="age-btn" id="age-btn-no">__NO_BUTTON_TEXT__</button><button class="age-btn" id="age-btn-yes">__YES_BUTTON_TEXT__</button></div></div>`;
  document.body.appendChild(overlay);

  document.getElementById('age-btn-yes').addEventListener('click', () => {
    localStorage.setItem('age_verified', 'true');
    overlay.remove();
  });
  document.getElementById('age-btn-no').addEventListener('click', () => {
    window.location.href = '__REDIRECT_URL__';
  });
})();
