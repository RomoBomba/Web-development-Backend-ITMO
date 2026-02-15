import { initGallery } from './modules/gallery.js';
import { initFormMask } from './modules/form.js';
import { addProductToCart, showNotification, animateAddToCartButton, formatPrice } from './modules/cart.js';
import { productCatalog } from './modules/catalog.js';
import { startLoadTimer, setActiveNavItem, displayLoadTime, enhanceProductCards } from './modules/utils.js';

let swiperInstance = null;

function initApp() {
    console.log('Инициализация MusicStore...');

    startLoadTimer();

    setActiveNavItem();

    swiperInstance = initGallery();

    initFormMask();

    enhanceProductCards();

    setupCartHandlers();

    window.addEventListener('load', displayLoadTime);

    console.log('MusicStore инициализирован успешно');
}

function setupCartHandlers() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-product-id');
            if (productId) {
                handleAddToCart(productId);
            }
        }
    });
}

function handleAddToCart(productId) {
    const addedProduct = addProductToCart(productId, productCatalog);
    if (addedProduct) {
        showNotification(`"${addedProduct.name}" добавлен в корзину!`, 'success');

        animateAddToCartButton(productId);

        console.log(`Товар добавлен в корзину: ${addedProduct.name} (${formatPrice(addedProduct.price)})`);
    }
}

function setupGalleryControls() {
    if (!swiperInstance) return;

    const gallery = document.querySelector('.gallery-swiper');
    if (gallery) {
        gallery.addEventListener('mouseenter', () => {
            swiperInstance.autoplay.stop();
        });

        gallery.addEventListener('mouseleave', () => {
            swiperInstance.autoplay.start();
        });
    }
}

document.addEventListener('DOMContentLoaded', initApp);

if (typeof window !== 'undefined') {
    window.musicStore = {
        productCatalog,
        formatPrice
    };
}