(function() {
    if (localStorage.getItem('age_verified') === 'true') {
        return;
    }

    const style = document.createElement('style');
    style.innerHTML = `
        #custom-age-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            animation: fadeIn 0.3s ease-in-out;
        }
        #custom-age-modal {
            background-color: __MODAL_BG__;
            padding: 40px;
            border-radius: 12px;
            max-width: 650px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            box-sizing: border-box;
        }
        #custom-age-modal h2 {
            font-size: 26px;
            font-weight: 900;
            color: __TEXT_COLOR__;
            margin-bottom: 20px;
            letter-spacing: 0.5px;
        }
        #custom-age-modal p {
            font-size: 14px;
            color: __TEXT_COLOR__;
            opacity: 0.85;
            margin-bottom: 35px;
            line-height: 1.5;
        }
        #custom-age-modal p a {
            color: __BTN_YES_BG__;
            text-decoration: underline;
        }
        .age-btn-container {
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        .age-btn {
            flex: 1;
            padding: 16px 20px;
            font-size: 15px;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid __TEXT_COLOR__;
        }
        #age-btn-no {
            background-color: __BTN_NO_BG__;
            color: __BTN_NO_COLOR__;
        }
        #age-btn-no:hover {
            opacity: 0.8;
        }
        #age-btn-yes {
            background-color: __BTN_YES_BG__;
            color: __BTN_YES_COLOR__;
            border-color: __BTN_YES_BG__;
        }
        #age-btn-yes:hover {
            opacity: 0.9;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @media (max-width: 480px) {
            .age-btn-container {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'custom-age-overlay';
    overlay.innerHTML = `
        <div id="custom-age-modal">
            <h2>AVEZ-VOUS PLUS DE 18 ANS ?</h2>
            <p>En entrant sur ce site, vous acceptez <a href="/terms" target="_blank">nos conditions d'utilisation</a> et notre <a href="/privacy" target="_blank">politique de confidentialité</a>.</p>
            <div class="age-btn-container">
                <button class="age-btn" id="age-btn-no">J'ai moins de 18 ans</button>
                <button class="age-btn" id="age-btn-yes">J'ai plus de 18 ans.</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('age-btn-yes').addEventListener('click', function() {
        localStorage.setItem('age_verified', 'true');
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    });

    document.getElementById('age-btn-no').addEventListener('click', function() {
        window.location.href = '__REDIRECT_URL__';
    });
})();
