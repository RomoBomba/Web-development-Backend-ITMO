export function createProductElement(productId, product, formatPrice) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.productId = productId;

    article.innerHTML = `
        <h3 class="product-card__title">
            <a href="/products/${productId}" class="product-card__link">${product.name}</a>
        </h3>
        <div class="product-card__image-wrapper">
            <img src="${product.image || '/images/default-product.png'}" 
                 alt="${product.name}" 
                 class="product-card__image"
                 onerror="this.src='/images/default-product.png'">
            ${product.caption ? `<span class="image-caption">${product.caption}</span>` : ''}
        </div>
        <p class="product-card__description">${product.description?.substring(0, 100) || ''}</p>
        <p class="product-card__price">
            <strong class="price--current">${formatPrice(product.price)}</strong>
        </p>
        <button class="button button--primary add-to-cart" data-product-id="${productId}">В корзину</button>
    `;

    return article;
}

export function getCategoryCaption(categoryId) {
    const captions = {
        1: '🎸 Электрогитара',
        2: '🎵 Акустическая',
        3: '🎸 Бас-гитара',
        4: '🔧 Аксессуар'
    };
    return captions[categoryId] || '';
}