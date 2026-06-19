const navToggle = document.querySelector('[data-nav-toggle]');
const siteNav = document.querySelector('[data-site-nav]');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        siteNav.classList.toggle('is-open');
    });
}

const slider = document.querySelector('[data-hero-slider]');

if (slider) {
    const slides = Array.from(slider.querySelectorAll('[data-hero-slide]'));
    const dots = Array.from(slider.querySelectorAll('[data-hero-dot]'));
    let activeIndex = 0;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === activeIndex);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === activeIndex);
        });
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    if (slides.length > 1) {
        window.setInterval(() => showSlide(activeIndex + 1), 5200);
    }
}

const filterForm = document.querySelector('[data-filter-form]');
const filterInput = document.querySelector('[data-filter-input]');
const filterList = document.querySelector('[data-filter-list]');

if (filterForm && filterInput && filterList) {
    const cards = Array.from(filterList.querySelectorAll('.movie-card'));
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q') || '';

    if (initialQuery) {
        filterInput.value = initialQuery;
    }

    const normalize = (value) => value.toString().trim().toLowerCase();

    const applyFilter = () => {
        const query = normalize(filterInput.value);
        cards.forEach((card) => {
            const text = normalize(card.textContent + ' ' + Object.values(card.dataset).join(' '));
            card.classList.toggle('is-filter-hidden', query && !text.includes(query));
        });
    };

    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        applyFilter();
    });

    filterInput.addEventListener('input', applyFilter);
    applyFilter();
}
