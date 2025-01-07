document.addEventListener('DOMContentLoaded', function () {
    // Функціональність слайдера
    const slides = document.querySelector('.slides');
    const slideElements = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;

    function showSlide(index) {
        const totalSlides = slideElements.length;
        if (totalSlides === 0) return; // Перевірка наявності слайдів
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (prevButton && nextButton && slides) {
        prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
    }

    // Автоматична зміна слайдів
     setInterval(() => showSlide(currentIndex + 1), 5000);

    // Функціональність пошуку та відображення ліків
    const medicineList = document.getElementById('medicine-list');
    const searchInput = document.getElementById('search-input');

    if (medicineList && searchInput) {
        const medicines = [
            { id: 1, name: 'Аспірин', description: 'Знеболювальний та жарознижувальний засіб', price: 50, discount: 10 },
            { id: 2, name: 'Парацетамол', description: 'Знеболювальний та жарознижувальний засіб', price: 40 },
            { id: 3, name: 'Ібупрофен', description: 'Нестероїдний протизапальний препарат', price: 60, discount: 5 },
            { id: 4, name: 'Омепразол', description: 'Засіб для лікування виразки шлунку', price: 100 },
            { id: 5, name: 'Амоксицилін', description: 'Антибіотик широкого спектру дії', price: 120, discount: 15 },
        ];

        function displayMedicines(medicinesArray) {
            medicineList.innerHTML = '';
            medicinesArray.forEach(medicine => {
                const medicineCard = document.createElement('div');
                medicineCard.className = 'medicine-card';

                const discountedPrice = medicine.discount
                    ? (medicine.price * (1 - medicine.discount / 100)).toFixed(2)
                    : medicine.price.toFixed(2);

                medicineCard.innerHTML = `
                    <h3>${medicine.name}</h3>
                    <p>${medicine.description}</p>
                    <div class="price-info">
                        <span class="price">${discountedPrice} грн</span>
                        ${medicine.discount ? `
                            <span class="original-price">${medicine.price.toFixed(2)} грн</span>
                            <span class="discount">-${medicine.discount}%</span>
                        ` : ''}
                    </div>
                `;

                medicineList.appendChild(medicineCard);
            });
        }

        function searchMedicines(searchTerm) {
            const filteredMedicines = medicines.filter(medicine =>
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayMedicines(filteredMedicines);
        }

        searchInput.addEventListener('input', function () {
            searchMedicines(this.value);
        });

        // Початкове відображення всіх ліків
        displayMedicines(medicines);
    }

    // Функція для плавного прокручування до якоря
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анімація появи елементів при прокручуванні
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.feature, .promotion-card, .medicine-card, .contact-info');
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('resize', handleScrollAnimation);
    handleScrollAnimation(); // Викликаємо функцію при завантаженні сторінки

    // Додаємо інтерактивність до кнопок
    const buttons = document.querySelectorAll('.btn, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
