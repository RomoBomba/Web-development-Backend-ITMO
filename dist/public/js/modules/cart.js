export function loadCartFromStorage() {
    try {
        const stored = localStorage.getItem('musicstore-cart');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
    }
    return {
        items: {},
        discount: 0,
        discountCode: null,
        shipping: 0
    };
}

export function saveCartToStorage(cartData) {
    try {
        localStorage.setItem('musicstore-cart', JSON.stringify(cartData));
    } catch (error) {
        console.error('Ошибка сохранения корзины:', error);
    }
}

export function addProductToCart(productId, productCatalog) {
    let product = productCatalog[productId];

    if (!product && productId) {
        const numericId = parseInt(productId, 10);
        if (!isNaN(numericId)) {
            product = productCatalog[numericId];
        }
    }

    if (!product) {
        return null;
    }

    const cartData = loadCartFromStorage();

    if (cartData.items[productId]) {
        cartData.items[productId].quantity += 1;
    } else {
        const cartKey = String(productId);
        cartData.items[cartKey] = {
            type: 'product',
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            description: product.description
        };
    }

    saveCartToStorage(cartData);
    return product;
}

export function showNotification(message, type = 'info') {
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.className = `notification notification--${type} notification--show`;

    setTimeout(() => {
        notification.classList.remove('notification--show');
    }, 3000);
}

export function animateAddToCartButton(productId) {
    const button = document.querySelector(`.add-to-cart[data-product-id="${productId}"]`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = '✓ Добавлено';
        button.classList.add('button--success');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('button--success');
        }, 1500);
    }
}

export function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' руб.';
}