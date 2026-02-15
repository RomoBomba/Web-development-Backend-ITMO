export function initGallery() {
    const galleryContainer = document.querySelector('.gallery-swiper');
    if (!galleryContainer) {
        console.warn('Контейнер галереи не найден');
        return null;
    }

    if (typeof Swiper === 'undefined') {
        console.error('Библиотека Swiper не загружена');
        return null;
    }

    const swiper = new Swiper('.gallery-swiper', {
        direction: 'horizontal',
        loop: true,
        speed: 600,
        grabCursor: true,
        spaceBetween: 20,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        },

        effect: 'slide',

        keyboard: {
            enabled: true,
            onlyInViewport: true
        },

        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
        }
    });

    console.log('Галерея Swiper инициализирована с настройками:', {
        loop: true,
        autoplay: true,
        slidesPerView: 'adaptive',
        navigation: true,
        pagination: true
    });

    return swiper;
}