export function initFormMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) {
        console.warn('Поле ввода телефона не найдено');
        return;
    }

    if (typeof Inputmask === 'undefined') {
        console.error('Библиотека Inputmask не загружена');
        return;
    }

    const im = new Inputmask({
        mask: '+7 (999) 999-99-99',
        placeholder: '_',
        showMaskOnHover: true,
        clearIncomplete: true,
        onBeforeMask: function(value) {
            return value.replace(/[^\d]/g, '');
        },
        oncleared: function() {
            console.log('Поле телефона очищено');
        }
    });

    im.mask(phoneInput);
    console.log('Маска для телефона применена: формат +7 (___) ___-__-__');

    const form = document.getElementById('credit-form-element');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = phoneInput.value;
            const amount = document.getElementById('amount').value;

            if (!validateForm(name, phone, amount)) {
                return;
            }

            simulateFormSubmission(name, phone, amount);
        });
    }
}

function validateForm(name, phone, amount) {
    if (name.length < 2) {
        showFormError('Имя должно содержать минимум 2 символа');
        return false;
    }

    if (phone.includes('_')) {
        showFormError('Пожалуйста, заполните номер телефона полностью');
        return false;
    }

    if (!amount || amount < 5000 || amount > 500000) {
        showFormError('Сумма кредита должна быть от 5,000 до 500,000 руб.');
        return false;
    }

    return true;
}

function showFormError(message) {
    let errorElement = document.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        const form = document.querySelector('.form');
        if (form) {
            form.insertBefore(errorElement, form.firstChild);
        }
    }

    errorElement.textContent = message;
    errorElement.classList.add('form-error--show');

    setTimeout(() => {
        errorElement.classList.remove('form-error--show');
    }, 5000);
}

function simulateFormSubmission(name, phone, amount) {
    const submitButton = document.querySelector('#credit-form-element button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.textContent = '✓ Отправлено!';
        submitButton.classList.add('button--success');

        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <h4>Заявка отправлена!</h4>
            <p>Спасибо, ${name}! Ваша заявка на сумму ${formatAmount(amount)} руб. принята.</p>
            <p>Наш менеджер свяжется с вами по телефону ${phone} в течение 15 минут.</p>
        `;

        const form = document.querySelector('.form');
        if (form) {
            form.parentNode.insertBefore(successMessage, form.nextSibling);
        }

        form.reset();

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('button--success');

            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 5000);
        }, 3000);

        console.log('Заявка на кредит отправлена:', { name, phone, amount });
    }, 2000);
}

function formatAmount(amount) {
    return new Intl.NumberFormat('ru-RU').format(amount);
}