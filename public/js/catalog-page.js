import { createProductElement, getCategoryCaption } from './modules/catalog.js';
import { addProductToCart, showNotification, animateAddToCartButton, formatPrice } from './modules/cart.js';
import { startLoadTimer, setActiveNavItem, displayLoadTime } from './modules/utils.js';

const serverProducts = window.__PRODUCTS__ || [];
let currentFilteredProducts = [...serverProducts];

function initCatalogPage() {
    console.log('Инициализация страницы каталога...');

    startLoadTimer();

    setActiveNavItem();

    renderProducts(currentFilteredProducts);

    setupFilterHandlers();

    setupCartHandlers();

    window.addEventListener('load', displayLoadTime);

    console.log('Страница каталога инициализирована');
}

function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('products-grid');
    const resultsCountElement = document.getElementById('results-count-number');

    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">Товары не найдены</p>';
        if (resultsCountElement) resultsCountElement.textContent = '0';
        return;
    }

    productsToRender.forEach(product => {
        const productForElement = {
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            caption: product.caption || getCategoryCaption(product.categoryId)
        };

        const productElement = createProductElement(product.id, productForElement, formatPrice);
        productsGrid.appendChild(productElement);
    });

    if (resultsCountElement) {
        resultsCountElement.textContent = productsToRender.length;
    }

    console.log(`Отображено товаров: ${productsToRender.length}`);
}

function setupFilterHandlers() {
    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price');
    const brandSelect = document.getElementById('brand');
    const resetButton = document.getElementById('reset-filters');

    if (categorySelect) {
        categorySelect.addEventListener('change', filterProducts);
    }

    if (priceSelect) {
        priceSelect.addEventListener('change', filterProducts);
    }

    if (brandSelect) {
        brandSelect.addEventListener('change', filterProducts);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
}

function filterProducts() {
    const categoryFilter = document.getElementById('category')?.value || 'all';
    const priceFilter = document.getElementById('price')?.value || 'all';
    const brandFilter = document.getElementById('brand')?.value || 'all';

    console.log('Применение фильтров:', { categoryFilter, priceFilter, brandFilter });

    currentFilteredProducts = serverProducts.filter(product => {
        let matches = true;

        if (categoryFilter !== 'all') {
            const categoryMap = {
                'electric': 1,
                'acoustic': 2,
                'bass': 3,
                'accessories': 4
            };
            if (product.categoryId !== categoryMap[categoryFilter]) {
                matches = false;
            }
        }

        if (brandFilter !== 'all' && product.name) {
            const brandMap = {
                'fender': 'Fender',
                'gibson': 'Gibson',
                'ibanez': 'Ibanez',
                'epiphone': 'Epiphone',
                'squier': 'Squier',
                'yamaha': 'Yamaha',
                'bcrich': 'B.C. Rich'
            };
            const brandName = brandMap[brandFilter];
            if (brandName && !product.name.includes(brandName)) {
                matches = false;
            }
        }

        if (priceFilter !== 'all') {
            const price = product.price;
            if (priceFilter === 'budget' && price > 30000) {
                matches = false;
            } else if (priceFilter === 'medium' && (price <= 30000 || price > 70000)) {
                matches = false;
            } else if (priceFilter === 'premium' && price <= 70000) {
                matches = false;
            }
        }

        return matches;
    });

    renderProducts(currentFilteredProducts);
}

function resetFilters() {
    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price');
    const brandSelect = document.getElementById('brand');

    if (categorySelect) categorySelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    if (brandSelect) brandSelect.value = 'all';

    console.log('Фильтры сброшены');

    currentFilteredProducts = [...serverProducts];
    renderProducts(currentFilteredProducts);
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
    const product = serverProducts.find(p => p.id == productId);
    if (product) {
        const productForCart = {
            [productId]: {
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image
            }
        };

        const addedProduct = addProductToCart(productId, productForCart);
        if (addedProduct) {
            showNotification(`"${product.name}" добавлен в корзину!`, 'success');
            animateAddToCartButton(productId);
            console.log(`Товар добавлен в корзину: ${product.name}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', initCatalogPage);

if (typeof window !== 'undefined') {
    window.catalog = {
        serverProducts,
        filterProducts,
        resetFilters
    };
}