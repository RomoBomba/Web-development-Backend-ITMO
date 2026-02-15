import { productCatalog, createProductElement, getCategoryCaption } from './modules/catalog.js';
import { addProductToCart, showNotification, animateAddToCartButton, formatPrice } from './modules/cart.js';
import { startLoadTimer, setActiveNavItem, displayLoadTime } from './modules/utils.js';

let currentFilteredProducts = { ...productCatalog };

function initCatalogPage() {
    console.log('Инициализация страницы каталога...');

    startLoadTimer();

    setActiveNavItem();

    renderProducts();

    setupFilterHandlers();

    setupCartHandlers();

    window.addEventListener('load', displayLoadTime);

    console.log('Страница каталога инициализирована');
}

function renderProducts(productsToRender = currentFilteredProducts) {
    const productsGrid = document.getElementById('products-grid');
    const resultsCountElement = document.getElementById('results-count-number');

    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    Object.keys(productsToRender).forEach(productId => {
        const product = productsToRender[productId];
        const productElement = createProductElement(productId, product, formatPrice);
        productsGrid.appendChild(productElement);
    });

    const productCount = Object.keys(productsToRender).length;
    if (resultsCountElement) {
        resultsCountElement.textContent = productCount;
    }

    console.log(`Отображено товаров: ${productCount}`);
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

    currentFilteredProducts = {};

    Object.keys(productCatalog).forEach(productId => {
        const product = productCatalog[productId];
        let matches = true;

        if (categoryFilter !== 'all' && product.category !== categoryFilter) {
            matches = false;
        }

        if (brandFilter !== 'all' && product.brand !== brandFilter) {
            matches = false;
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

        if (matches) {
            currentFilteredProducts[productId] = product;
        }
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

    currentFilteredProducts = { ...productCatalog };
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
    const addedProduct = addProductToCart(productId, productCatalog);
    if (addedProduct) {
        showNotification(`"${addedProduct.name}" добавлен в корзину!`, 'success');

        animateAddToCartButton(productId);

        console.log(`Товар добавлен в корзину: ${addedProduct.name}`);
    }
}

document.addEventListener('DOMContentLoaded', initCatalogPage);

if (typeof window !== 'undefined') {
    window.catalog = {
        productCatalog,
        filterProducts,
        resetFilters
    };
}