(function () {
    function setupCarousel(section) {
        var list = section.querySelector('.annur-bump__list');
        var dots = section.querySelector('.annur-bump__dots');

        if (!list || !dots) {
            return;
        }

        function setupDots() {
            dots.replaceChildren();

            if (window.innerWidth >= 1024 || !list.clientWidth) {
                return;
            }

            var pageCount = Math.ceil(list.scrollWidth / list.clientWidth);

            for (var i = 0; i < pageCount; i++) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'annur-bump__dot';
                dot.setAttribute('aria-label', 'Tampilkan halaman logo ' + (i + 1));
                dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
                dot.addEventListener('click', (function (page) {
                    return function () {
                        list.scrollTo({
                            left: page * list.clientWidth,
                            behavior: 'smooth',
                        });
                    };
                }(i)));
                dots.appendChild(dot);
            }
        }

        function updateDots() {
            if (window.innerWidth >= 1024) {
                return;
            }

            var index = Math.round(list.scrollLeft / list.clientWidth);
            dots.querySelectorAll('.annur-bump__dot').forEach(function (dot, dotIndex) {
                dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
            });
        }

        list.addEventListener('scroll', updateDots, { passive: true });
        window.addEventListener('resize', setupDots);
        setupDots();
    }

    document.querySelectorAll('.annur-bump').forEach(setupCarousel);
}());
