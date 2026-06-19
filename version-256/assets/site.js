(function() {
    var navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.body.classList.toggle('nav-open');
        });
    }

    var carousel = document.querySelector('[data-hero-carousel]');
    if (carousel) {
        var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-hero-slide]'));
        var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-hero-dot]'));
        var next = carousel.querySelector('[data-hero-next]');
        var prev = carousel.querySelector('[data-hero-prev]');
        var current = 0;
        var timer = null;

        function showSlide(index) {
            if (!slides.length) {
                return;
            }
            current = (index + slides.length) % slides.length;
            slides.forEach(function(slide, slideIndex) {
                slide.classList.toggle('active', slideIndex === current);
            });
            dots.forEach(function(dot, dotIndex) {
                dot.classList.toggle('active', dotIndex === current);
            });
        }

        function startTimer() {
            window.clearInterval(timer);
            timer = window.setInterval(function() {
                showSlide(current + 1);
            }, 5200);
        }

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                showSlide(Number(dot.getAttribute('data-hero-dot')) || 0);
                startTimer();
            });
        });

        if (next) {
            next.addEventListener('click', function() {
                showSlide(current + 1);
                startTimer();
            });
        }

        if (prev) {
            prev.addEventListener('click', function() {
                showSlide(current - 1);
                startTimer();
            });
        }

        startTimer();
    }

    function normalize(value) {
        return String(value || '').toLowerCase().trim();
    }

    function matchYear(card, selectedYear) {
        var year = Number(card.getAttribute('data-year') || 0);
        if (selectedYear === 'all') {
            return true;
        }
        if (selectedYear === '2020') {
            return year >= 2020;
        }
        if (selectedYear === 'older') {
            return year < 2020;
        }
        return String(year) === selectedYear;
    }

    function bindSearchPanel(panel) {
        var scope = panel.parentElement;
        var search = panel.querySelector('.movie-search');
        var yearFilter = panel.querySelector('.year-filter');
        var typeFilter = panel.querySelector('.type-filter');
        var cards = Array.prototype.slice.call(scope.querySelectorAll('.movie-card, .rank-item'));

        function update() {
            var query = normalize(search ? search.value : '');
            var selectedYear = yearFilter ? yearFilter.value : 'all';
            var selectedType = typeFilter ? typeFilter.value : 'all';

            cards.forEach(function(card) {
                var text = normalize([
                    card.getAttribute('data-title'),
                    card.getAttribute('data-type'),
                    card.getAttribute('data-genre'),
                    card.getAttribute('data-region')
                ].join(' '));
                var type = card.getAttribute('data-type') || '';
                var typeMatched = selectedType === 'all' || type.indexOf(selectedType) !== -1;
                var visible = text.indexOf(query) !== -1 && matchYear(card, selectedYear) && typeMatched;
                card.classList.toggle('is-hidden', !visible);
            });
        }

        [search, yearFilter, typeFilter].forEach(function(control) {
            if (control) {
                control.addEventListener('input', update);
                control.addEventListener('change', update);
            }
        });
    }

    Array.prototype.slice.call(document.querySelectorAll('.filter-panel')).forEach(bindSearchPanel);
})();
