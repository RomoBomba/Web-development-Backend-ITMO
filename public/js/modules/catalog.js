export const productCatalog = {
    'fender-strat': {
        name: 'Fender American Professional II Stratocaster',
        price: 145000,
        image: 'images/guitars/fender-strat.png',
        description: 'Легендарный стратокастер с улучшенной электроникой.',
        category: 'electric',
        brand: 'fender',
        oldPrice: 155000
    },
    'gibson-lespaul': {
        name: 'Gibson Les Paul Standard 50s',
        price: 210000,
        image: 'images/guitars/gibson-lespaul.png',
        description: 'Классика рок-музыки в оригинальном исполнении 50-х годов.',
        category: 'electric',
        brand: 'gibson'
    },
    'ibanez-rg550': {
        name: 'Ibanez RG550 Yellow',
        price: 85000,
        image: 'images/guitars/ibanez-rg550.jpg',
        description: 'Переиздание культовой модели для любителей хэви-музыки.',
        category: 'electric',
        brand: 'ibanez',
        oldPrice: 95000
    },
    'yamaha-fg800': {
        name: 'Yamaha FG800',
        price: 18500,
        image: 'images/guitars/yamaha-fg800.png',
        description: 'Качественная акустическая гитара по доступной цене.',
        category: 'acoustic',
        brand: 'yamaha'
    },
    'ibanez-grx120': {
        name: 'Ibanez Gio GRX120 Blue',
        price: 32000,
        image: 'images/guitars/ibanez_gio_grx120.jpg',
        description: 'Уникальная модель с характерным дизайном.',
        category: 'electric',
        brand: 'ibanez'
    },
    'epiphone-335': {
        name: 'Epiphone ES-335',
        price: 45000,
        image: 'images/guitars/epiphone-335.png',
        description: 'Легендарная полуакустика по доступной цене.',
        category: 'electric',
        brand: 'epiphone'
    },
    'squier-hellokitty': {
        name: 'Squier Hello Kitty Stratocaster',
        price: 65000,
        image: 'images/guitars/hellokitty.png',
        description: 'Лимитированная гитара, в честь 50-летия Hello Kitty.',
        category: 'electric',
        brand: 'squier',
        oldPrice: 70000
    },
    'bcrich-kkv': {
        name: 'B.C. Rich Kerry King V',
        price: 68000,
        image: 'images/guitars/bcrich.jpg',
        description: 'Популярная модель с агрессивной формой.',
        category: 'electric',
        brand: 'bcrich',
        oldPrice: 75000
    },
    'epiphone-thunderbird': {
        name: 'Epiphone Thunderbird IV',
        price: 43500,
        image: 'images/guitars/bass1.jpg',
        description: 'Легендарная бас-гитара с топом из махагони.',
        category: 'bass',
        brand: 'epiphone',
        oldPrice: 55000
    }
};

export function getCategoryCaption(category) {
    const captions = {
        'electric': 'Электрогитара',
        'acoustic': 'Акустическая гитара',
        'bass': 'Бас-гитара'
    };
    return captions[category] || 'Гитара';
}

export function createProductElement(productId, product, formatPriceFn) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('data-product-id', productId);
    article.setAttribute('data-category', product.category);
    article.setAttribute('data-brand', product.brand);
    article.setAttribute('data-price', product.price);

    const hasDiscount = product.oldPrice && product.oldPrice > product.price;

    article.innerHTML = `
        <h3 class="product-card__title">
            <a href="#" class="product-card__link">${product.name}</a>
        </h3>
        <div class="product-card__image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-card__image" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5ObyBpbWFnZTwvdGV4dD48L3N2Zz4='">
            <span class="image-caption">${getCategoryCaption(product.category)}</span>
        </div>
        <p class="product-card__description">${product.description}</p>
        <p class="product-card__price">
            <strong class="price--current">${formatPriceFn(product.price)}</strong>
            ${hasDiscount ? `<del class="price--old">${formatPriceFn(product.oldPrice)}</del>` : ''}
        </p>
        <button class="button button--primary add-to-cart" data-product-id="${productId}">В корзину</button>
    `;

    return article;
}