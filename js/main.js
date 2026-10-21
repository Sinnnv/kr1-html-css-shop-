(() => {
    // Данные товаров: ключ = id из ссылки product.html?id=N
    const PRODUCTS = {
        1: {
            title: 'Товар 1',
            category: 'Электроника',
            price: '1000 руб.',
            oldPrice: '1200 руб.',
            img: 'images/product-1.jpg',
            description: 'Учебный товар с бейджем «Хит». Демонстрирует выделенную карточку и старую цену.',
            badges: [{ text: 'Хит', mod: '' }],
            features: [
                'учебный товар для фронтенд-проекта;',
                'адаптированная карточка с БЭМ-классами;',
                'поддержка состояний наведения и фокуса.'
            ],
            specs: [
                ['Категория', 'Электроника'],
                ['Производитель', 'Учебный бренд'],
                ['Модель', 'KR1-001'],
                ['Гарантия', '12 месяцев'],
                ['Наличие', 'В наличии']
            ]
        },
        2: {
            title: 'Товар 2',
            category: 'Аксессуары',
            price: '1500 руб.',
            oldPrice: '',
            img: 'images/product-2.jpg',
            description: 'Новинка каталога. Демонстрирует модификатор product-card--new.',
            badges: [{ text: 'Новинка', mod: 'badge--new' }],
            features: [
                'новая позиция каталога;',
                'аккуратная карточка без скидок;',
                'готова к расширению описания.'
            ],
            specs: [
                ['Категория', 'Аксессуары'],
                ['Производитель', 'Учебный бренд'],
                ['Модель', 'KR1-002'],
                ['Гарантия', '6 месяцев'],
                ['Наличие', 'В наличии']
            ]
        },
        3: {
            title: 'Товар 3',
            category: 'Для дома',
            price: '2000 руб.',
            oldPrice: '2500 руб.',
            img: 'images/product-3.jpg',
            description: 'Товар со скидкой. Использует модификатор product-card--discount и красный бейдж.',
            badges: [{ text: '-20%', mod: 'badge--sale' }],
            features: [
                'действует скидка 20%;',
                'старая цена зачёркнута;',
                'бейдж акции в углу карточки.'
            ],
            specs: [
                ['Категория', 'Для дома'],
                ['Производитель', 'Учебный бренд'],
                ['Модель', 'KR1-003'],
                ['Гарантия', '12 месяцев'],
                ['Наличие', 'В наличии']
            ]
        },
        4: {
            title: 'Товар 4',
            category: 'Канцелярия',
            price: '700 руб.',
            oldPrice: '',
            img: 'images/product-4.jpg',
            description: 'Обычная карточка товара без специальных модификаторов.',
            badges: [],
            features: [
                'базовая карточка без бейджей;',
                'подходит для демонстрации сетки;',
                'минимальный набор данных.'
            ],
            specs: [
                ['Категория', 'Канцелярия'],
                ['Производитель', 'Учебный бренд'],
                ['Модель', 'KR1-004'],
                ['Гарантия', 'нет'],
                ['Наличие', 'В наличии']
            ]
        },
        5: {
            title: 'Товар 5',
            category: 'Подарки',
            price: '1800 руб.',
            oldPrice: '',
            img: 'images/product-5.jpg',
            description: 'Выделенная карточка через БЭМ-модификатор product-card--featured.',
            badges: [{ text: 'Выбор покупателей', mod: '' }],
            features: [
                'выделенная рамка карточки;',
                'бейдж выбора покупателей;',
                'готова к добавлению рейтинга.'
            ],
            specs: [
                ['Категория', 'Подарки'],
                ['Производитель', 'Учебный бренд'],
                ['Модель', 'KR1-005'],
                ['Гарантия', '3 месяца'],
                ['Наличие', 'В наличии']
            ]
        },
        6: {
            title: 'Товар 6',
            category: 'Редкая позиция',
            price: '3000 руб.',
            oldPrice: '',
            img: 'images/product-6.jpg',
            description: 'Недоступный товар. Кнопка заказа отключена, изображение обесцвечено.',
            badges: [{ text: 'Нет в наличии', mod: 'badge--muted' }],
            features: [
                'товар недоступен для заказа;',
                'изображение в grayscale;',
                'кнопка заказа disabled.'
            ],
            specs: [
                ['Категория', 'Редкая позиция'],
                ['Производитель', 'Учебный бренд'],
                ['Модель', 'KR1-006'],
                ['Гарантия', 'нет'],
                ['Наличие', 'Нет в наличии']
            ]
        }
    };

    // Подмена содержимого product.html по ?id=N (узлы ищутся по существующим классам)
    const initProductPage = () => {
        const titleEl = document.querySelector('.product-detail__title');
        if (!titleEl) return; // не страница товара — выходим, ничего не ломаем

        const id = new URLSearchParams(window.location.search).get('id') || '1';
        const p = PRODUCTS[id] || PRODUCTS['1'];

        titleEl.textContent = p.title;

        const crumb = document.querySelector('.breadcrumbs__current');
        if (crumb) crumb.textContent = p.title;

        const catEl = document.querySelector('.product-detail__category');
        if (catEl) catEl.textContent = 'Категория: ' + p.category;

        const priceEl = document.querySelector('.product-detail__price');
        if (priceEl) {
            priceEl.innerHTML = p.oldPrice
                ? p.price + ' <span class="product-detail__price--old">' + p.oldPrice + '</span>'
                : p.price;
        }

        const descEl = document.querySelector('.product-detail__description');
        if (descEl) descEl.textContent = p.description;

        const imgEl = document.querySelector('.product-detail__image');
        if (imgEl) {
            imgEl.src = p.img;
            imgEl.alt = 'Фотография: ' + p.title;
        }

        const badgesEl = document.querySelector('.product-detail__badges');
        if (badgesEl) {
            badgesEl.innerHTML = p.badges
                .map(b => '<span class="badge ' + b.mod + '">' + b.text + '</span>')
                .join('');
        }

        const featuresEl = document.querySelector('.product-detail__features');
        if (featuresEl) {
            featuresEl.innerHTML = p.features.map(f => '<li>' + f + '</li>').join('');
        }

        const specsBody = document.querySelector('.data-table tbody');
        if (specsBody) {
            specsBody.innerHTML = p.specs
                .map(s => '<tr><td>' + s[0] + '</td><td>' + s[1] + '</td></tr>')
                .join('');
        }

        const orderLink = document.querySelector('.product-detail__actions .button--primary');
        if (orderLink) orderLink.href = 'order.html?id=' + id;

        document.title = p.title + ' — Учебный интернет-магазин';
    };

    const initOrderDialog = () => {
        const dialog = document.getElementById('order-dialog');
        if (!dialog) return;

        const input = document.getElementById('selected-product');
        const closeBtn = document.getElementById('close-order-dialog');

        document.querySelectorAll('.product-card__button[data-product]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (input && btn.dataset.product) input.value = btn.dataset.product;
                dialog.showModal();
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());
    };

    const initForms = () => {
        document.querySelectorAll('form.order-form').forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                const controls = Array.from(form.elements).filter(el => el.willValidate);
                controls.forEach(el => el.removeAttribute('aria-invalid'));

                if (!form.checkValidity()) {
                    controls.forEach(el => {
                        if (!el.checkValidity()) el.setAttribute('aria-invalid', 'true');
                    });
                    form.reportValidity();
                    return;
                }

                const msg = document.getElementById('success-message');
                if (msg) msg.hidden = false;

                const dlg = form.closest('dialog');
                if (dlg) dlg.close();
                form.reset();
            });
        });
    };

    const initScrollTop = () => {
        const btn = document.getElementById('scroll-top-button');
        if (!btn) return;

        const toggle = () =>
            btn.classList.toggle('scroll-top-button--visible', window.scrollY > 300);

        window.addEventListener('scroll', toggle);
        toggle();

        btn.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
        );
    };

    document.addEventListener('DOMContentLoaded', () => {
        initProductPage();
        initOrderDialog();
        initForms();
        initScrollTop();
    });
})();