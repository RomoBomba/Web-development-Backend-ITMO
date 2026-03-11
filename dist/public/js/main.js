import { initGallery } from './modules/gallery.js';
import { initFormMask } from './modules/form.js';
import { addProductToCart, showNotification, animateAddToCartButton, formatPrice } from './modules/cart.js';
import { startLoadTimer, setActiveNavItem, displayLoadTime, enhanceProductCards } from './modules/utils.js';

let swiperInstance = null;

// Хардкодированный каталог товаров
const productCatalog = {
    'elixir-strings': { name: 'Комплект струн Elixir', price: 2200, image: 'images/addition/strings-elixir.png', description: 'Наноструктурное покрытие' },
    'dunlop-picks': { name: 'Медиаторы Dunlop', price: 800, image: 'images/addition/picks-dunlop.png', description: 'Набор из 12 медиаторов' },
    'cort-cable': { name: 'Гитарный кабель Cort', price: 1500, image: 'images/addition/cable.png', description: 'Качественный кабель 3 метра' },
    'fender-strat': { name: 'Fender American Professional II Stratocaster', price: 145000, image: 'images/guitars/fender-strat.png', description: 'Электрогитара' },
    'yamaha-fg800': { name: 'Yamaha FG800', price: 18500, image: 'images/guitars/yamaha-fg800.png', description: 'Акустическая гитара' },
    'guitar-case': { name: 'Чехол для акустической гитары', price: 3200, image: 'images/addition/case.png', description: 'Прочный чехол' }
};

// Объединяем все источники товаров
function getAllProducts() {
    const allProducts = { ...productCatalog };

    if (window.__PRODUCTS__ && Array.isArray(window.__PRODUCTS__)) {
        window.__PRODUCTS__.forEach(product => {
            allProducts[product.id] = {
                name: product.name,
                price: parseFloat(product.price),
                image: product.image || '/images/default-product.png',
                description: product.description || ''
            };
        });
    }

    if (window.recommendedProducts && Array.isArray(window.recommendedProducts)) {
        window.recommendedProducts.forEach(product => {
            allProducts[product.id] = {
                name: product.name,
                price: parseFloat(product.price),
                image: product.image || '/images/default-product.png',
                description: product.description || ''
            };
        });
    }

    if (window.catalogProducts && Array.isArray(window.catalogProducts)) {
        window.catalogProducts.forEach(product => {
            allProducts[product.id] = {
                name: product.name,
                price: parseFloat(product.price),
                image: product.image || '/images/default-product.png',
                description: product.description || ''
            };
        });
    }

    return allProducts;
}

function initApp() {
    startLoadTimer();
    setActiveNavItem();
    swiperInstance = initGallery();
    initFormMask();
    enhanceProductCards();
    setupCartHandlers();
    window.addEventListener('load', displayLoadTime);
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
    const allProducts = getAllProducts();
    const addedProduct = addProductToCart(productId, allProducts);
    if (addedProduct) {
        showNotification(`"${addedProduct.name}" добавлен в корзину!`, 'success');
        animateAddToCartButton(productId);
    }
}

document.addEventListener('DOMContentLoaded', initApp);

if (typeof window !== 'undefined') {
    window.musicStore = {
        productCatalog,
        formatPrice,
        getAllProducts
    };
}