let loadStartTime;

export function startLoadTimer() {
    loadStartTime = performance.now();
}

export function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('nav__link--active');

        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref === 'index.html' && currentPage === '')) {
            link.classList.add('nav__link--active');
        }
    });
}

export function displayLoadTime() {
    if (!loadStartTime) {
        console.warn('Таймер не был запущен');
        return;
    }

    const loadEndTime = performance.now();
    const loadTime = (loadEndTime - loadStartTime) / 1000;

    const loadTimeElement = document.createElement('div');
    loadTimeElement.className = 'load-time';
    loadTimeElement.innerHTML = `
        <p>Время загрузки страницы: <strong>${loadTime.toFixed(3)}</strong> секунд</p>
        <small>Время измеряется с помощью Performance API</small>
    `;

    const loadTimeContainer = document.querySelector('.load-time-info');
    if (loadTimeContainer) {
        loadTimeContainer.appendChild(loadTimeElement);
    } else {
        console.log(`Время загрузки: ${loadTime.toFixed(3)} сек.`);
    }
}

export function enhanceProductCards() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });

        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart')) {
                const productName = this.querySelector('.product-card__link')?.textContent;
                if (productName) {
                    console.log(`Просмотр товара: ${productName}`);
                }
            }
        });
    });
}