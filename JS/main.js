(() => {
    const initOrderDialog = () => {
        const dialog = document.getElementById('order-dialog');
        if (!dialog) {
            return;
        }

        const selectedProductInput = document.getElementById('selected-product');
        const closeDialogButton = document.getElementById('close-order-dialog');
        const orderButtons = document.querySelectorAll(
            '.product-card__button[data-product], [data-open-order-dialog]'
        );

        orderButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (selectedProductInput && button.dataset.product) {
                    selectedProductInput.value = button.dataset.product;
                }

                dialog.showModal();
            });
        });

        if (closeDialogButton) {
            closeDialogButton.addEventListener('click', () => {
                dialog.close();
            });
        }
    };

    const initForms = () => {
        const forms = document.querySelectorAll('form.order-form');

        forms.forEach((form) => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const controls = Array.from(form.elements).filter((element) => element.willValidate);

                controls.forEach((element) => {
                    element.removeAttribute('aria-invalid');
                });

                if (!form.checkValidity()) {
                    controls.forEach((element) => {
                        if (!element.checkValidity()) {
                            element.setAttribute('aria-invalid', 'true');
                        }
                    });

                    form.reportValidity();
                    return;
                }

                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.hidden = false;
                }

                const dialog = form.closest('dialog');
                if (dialog) {
                    dialog.close();
                }

                form.reset();
            });
        });
    };

    const initScrollTopButton = () => {
        const scrollTopButton = document.getElementById('scroll-top-button');
        if (!scrollTopButton) {
            return;
        }

        const toggleButton = () => {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('scroll-top-button--visible');
            } else {
                scrollTopButton.classList.remove('scroll-top-button--visible');
            }
        };

        window.addEventListener('scroll', toggleButton);
        toggleButton();

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        initOrderDialog();
        initForms();
        initScrollTopButton();
    });
})();