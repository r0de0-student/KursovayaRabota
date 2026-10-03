// script.js - Полные анимации для Goodlyfe Gyms

document.addEventListener('DOMContentLoaded', function() {

    // ========== 1. АНИМАЦИЯ ПРИ СКРОЛЛЕ (появление элементов) ==========
    
    // Функция проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // Элемент считается видимым, если его верхняя граница выше нижней границы окна - 100px
        return rect.top <= windowHeight - 100 && rect.bottom >= 0;
    }
    
    // Функция применения анимации к элементу
    function animateElement(el) {
        if (!el.hasAttribute('data-animated')) {
            // Добавляем класс animated для запуска CSS анимации
            el.classList.add('animated');
            el.setAttribute('data-animated', 'true');
        }
    }
    
    // Сброс анимации при выходе из зоны видимости (чтобы анимировалось снова)
    function resetAnimation(el) {
        if (el.hasAttribute('data-animated')) {
            el.classList.remove('animated');
            el.removeAttribute('data-animated');
            // Небольшая задержка перед повторной проверкой
            setTimeout(() => {
                if (isElementInViewport(el)) {
                    animateElement(el);
                }
            }, 50);
        }
    }
    
    // Все элементы для анимации при скролле
    const animatedElements = [
        '.card', '.phone-mockup', '.social-circle', 
        '.meet-text', '.meet-images-stacked', '.app-content',
        '.footer-col', '.testimonials-left', '.testimonials-right',
        '.download-badge', '.faq-link-outline'
    ];
    
    // Функция проверки всех элементов
    function checkAllAnimations() {
        animatedElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (isElementInViewport(el)) {
                    animateElement(el);
                } else {
                    resetAnimation(el);
                }
            });
        });
    }
    
    // Запускаем при загрузке
    setTimeout(checkAllAnimations, 100);
    
    // Запускаем при скролле
    window.addEventListener('scroll', checkAllAnimations);
    window.addEventListener('resize', checkAllAnimations);
    
    // ========== 2. ДОПОЛНИТЕЛЬНАЯ АНИМАЦИЯ ДЛЯ ТЕЛЕФОНОВ ==========
    const phones = document.querySelectorAll('.phone-mockup');
    phones.forEach((phone, i) => {
        phone.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        phone.addEventListener('mouseenter', () => {
            phone.style.transform = 'translateY(-15px) rotate(2deg)';
            phone.style.filter = 'drop-shadow(15px 20px 30px rgba(0, 0, 0, 0.3))';
        });
        
        phone.addEventListener('mouseleave', () => {
            phone.style.transform = 'translateY(0) rotate(0)';
            phone.style.filter = 'drop-shadow(10px 15px 25px rgba(0, 0, 0, 0.25))';
        });
    });
    
    // ========== 3. АНИМАЦИЯ ДЛЯ КАРТОЧЕК ==========
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 40px -12px rgba(228, 48, 113, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // ========== 4. АНИМАЦИЯ ДЛЯ СОЦИАЛЬНЫХ КРУЖКОВ ==========
    const socialCircles = document.querySelectorAll('.social-circle');
    socialCircles.forEach((circle, i) => {
        const hoverColors = ['#1877F2', '#FF0000', '#E4405F'];
        
        circle.addEventListener('mouseenter', () => {
            circle.style.transform = 'scale(1.15) translateY(-5px)';
            circle.style.backgroundColor = hoverColors[i % hoverColors.length];
            const icon = circle.querySelector('i');
            if (icon) icon.style.color = 'white';
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.style.transform = 'scale(1) translateY(0)';
            circle.style.backgroundColor = '#f2eee7';
            const icon = circle.querySelector('i');
            if (icon) icon.style.color = '#E43071';
        });
    });
    
    // ========== 5. ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ ЗАГРУЗКЕ ==========
    const heroTitle = document.querySelector('.welcome-title-full');
    const heroBtn = document.querySelector('.see-benefits-full');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroBtn) {
        heroBtn.style.opacity = '0';
        heroBtn.style.transform = 'translateY(20px)';
        heroBtn.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            heroBtn.style.opacity = '1';
            heroBtn.style.transform = 'translateY(0)';
        }, 400);
    }
    
    // ========== 6. УВЕДОМЛЕНИЯ ПРИ КЛИКЕ ==========
    function showNotification(message, type = 'info') {
        const oldNotifications = document.querySelectorAll('.notification');
        oldNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2500);
    }
    
    // Стили для уведомлений
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #1a1a2e;
            color: white;
            padding: 14px 24px;
            border-radius: 50px;
            font-size: 14px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        .notification.success { background: #10b981; }
        .notification.error { background: #ef4444; }
        .notification.info { background: #E43071; }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // Кнопка "See benefits"
    const seeBenefits = document.querySelector('.see-benefits-full');
    if (seeBenefits) {
        seeBenefits.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Спасибо за интерес! Мы свяжемся с вами.', 'info');
        });
    }
    
    // Кнопки Download
    const downloadBtns = document.querySelectorAll('.download-badge');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isGoogle = btn.classList.contains('google-play');
            const store = isGoogle ? 'Google Play' : 'App Store';
            showNotification(`Переход в ${store} для скачивания...`, 'success');
        });
    });
    
    // Кнопка Free Trial
    const freeTrial = document.querySelector('.free-trial');
    if (freeTrial) {
        freeTrial.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Бесплатная пробная версия активирована на 7 дней!', 'info');
        });
    }
    
    // Кнопка FAQ
    const faqBtn = document.querySelector('.faq-link-outline');
    if (faqBtn) {
        faqBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Часто задаваемые вопросы откроются в новой вкладке.', 'info');
        });
    }
    
    // ========== 7. КНОПКА "НАВЕРХ" ==========
    const goTopBtn = document.createElement('button');
    goTopBtn.innerHTML = '↑';
    goTopBtn.className = 'go-top';
    document.body.appendChild(goTopBtn);
    
    const goTopStyle = document.createElement('style');
    goTopStyle.textContent = `
        .go-top {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            background: #E43071;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(228,48,113,0.4);
        }
        .go-top.show {
            opacity: 1;
            visibility: visible;
        }
        .go-top:hover {
            background: #c71a5c;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(goTopStyle);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            goTopBtn.classList.add('show');
        } else {
            goTopBtn.classList.remove('show');
        }
    });
    
    goTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ========== 8. МОДАЛЬНОЕ ОКНО LOGIN ==========
    const modalHTML = `
        <div id="loginModal" class="login-modal">
            <div class="login-modal-content">
                <span class="login-modal-close">&times;</span>
                <h2>Вход в аккаунт</h2>
                <input type="email" id="loginEmail" placeholder="Email">
                <input type="password" id="loginPassword" placeholder="Пароль">
                <button id="loginSubmit">Войти</button>
                <p class="register-link">Нет аккаунта? <a href="#" id="showRegister">Зарегистрироваться</a></p>
            </div>
        </div>
        <div id="registerModal" class="login-modal">
            <div class="login-modal-content">
                <span class="login-modal-close">&times;</span>
                <h2>Регистрация</h2>
                <input type="text" id="regName" placeholder="Имя">
                <input type="email" id="regEmail" placeholder="Email">
                <input type="password" id="regPassword" placeholder="Пароль">
                <input type="password" id="regConfirm" placeholder="Подтвердите пароль">
                <button id="registerSubmit">Зарегистрироваться</button>
                <p class="register-link">Уже есть аккаунт? <a href="#" id="showLogin">Войти</a></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .login-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(5px);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }
        .login-modal.show { display: flex; }
        .login-modal-content {
            background: white;
            border-radius: 28px;
            width: 90%;
            max-width: 400px;
            padding: 35px;
            position: relative;
            box-shadow: 0 25px 50px rgba(0,0,0,0.3);
            animation: modalFadeIn 0.3s ease;
        }
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .login-modal-content h2 {
            font-size: 28px;
            margin-bottom: 20px;
            color: #1a1a2e;
            text-align: center;
        }
        .login-modal-content input {
            width: 100%;
            padding: 14px 16px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 12px;
            font-size: 16px;
        }
        .login-modal-content input:focus {
            outline: none;
            border-color: #E43071;
        }
        .login-modal-content button {
            width: 100%;
            padding: 14px;
            background: #E43071;
            color: white;
            border: none;
            border-radius: 40px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 10px;
        }
        .login-modal-content button:hover {
            background: #c71a5c;
        }
        .login-modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #999;
        }
        .login-modal-close:hover { color: #E43071; }
        .register-link {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
        .register-link a {
            color: #E43071;
            text-decoration: none;
        }
    `;
    document.head.appendChild(modalStyle);
    
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginNavBtn = document.querySelector('.login-btn');
    
    function openModal(modal) { modal.classList.add('show'); }
    function closeAllModals() {
        if (loginModal) loginModal.classList.remove('show');
        if (registerModal) registerModal.classList.remove('show');
    }
    
    if (loginNavBtn) {
        loginNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(loginModal);
        });
    }
    
    document.querySelectorAll('.login-modal-close').forEach(btn => {
        btn.addEventListener('click', () => closeAllModals());
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeAllModals();
        if (e.target === registerModal) closeAllModals();
    });
    
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(registerModal);
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(loginModal);
        });
    }
    
    const loginSubmit = document.getElementById('loginSubmit');
    if (loginSubmit) {
        loginSubmit.addEventListener('click', () => {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                showNotification('Заполните все поля!', 'error');
            } else {
                showNotification(`Добро пожаловать, ${email}!`, 'success');
                closeAllModals();
                document.getElementById('loginEmail').value = '';
                document.getElementById('loginPassword').value = '';
            }
        });
    }
    
    const registerSubmit = document.getElementById('registerSubmit');
    if (registerSubmit) {
        registerSubmit.addEventListener('click', () => {
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;
            
            if (!name || !email || !password || !confirm) {
                showNotification('Заполните все поля!', 'error');
            } else if (password !== confirm) {
                showNotification('Пароли не совпадают!', 'error');
            } else {
                showNotification(`Добро пожаловать, ${name}! Регистрация успешна.`, 'success');
                closeAllModals();
                document.getElementById('regName').value = '';
                document.getElementById('regEmail').value = '';
                document.getElementById('regPassword').value = '';
                document.getElementById('regConfirm').value = '';
            }
        });
    }
});