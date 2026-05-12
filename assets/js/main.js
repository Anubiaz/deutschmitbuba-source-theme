/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    if (!navigation) return;

    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;
    const topicTrigger = navigation.querySelector('.buba-nav-trigger');

    const closeMenu = function () {
        navigation.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        topicTrigger?.setAttribute('aria-expanded', 'false');
        document.documentElement.style.overflowY = null;
    };

    const openMenu = function () {
        navigation.classList.add('is-open');
        burger.setAttribute('aria-expanded', 'true');
        topicTrigger?.setAttribute('aria-expanded', 'true');
        document.documentElement.style.overflowY = 'hidden';
    };

    burger.setAttribute('aria-expanded', navigation.classList.contains('is-open') ? 'true' : 'false');

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('is-open')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    navigation.querySelectorAll('.gh-navigation-menu a[href^="#"]:not([href^="#/"])').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
            closeMenu();
            burger.focus();
        }
    });
})();

/* Home navigation ARIA state */
(function () {
    const dropdown = document.querySelector('.buba-nav-dropdown');
    const trigger = dropdown?.querySelector('.buba-nav-trigger');
    if (!dropdown || !trigger) return;

    const setExpanded = function (value) {
        trigger.setAttribute('aria-expanded', value ? 'true' : 'false');
    };

    setExpanded(false);

    dropdown.addEventListener('mouseenter', function () {
        setExpanded(true);
    });

    dropdown.addEventListener('mouseleave', function () {
        setExpanded(false);
    });

    dropdown.addEventListener('focusin', function () {
        setExpanded(true);
    });

    dropdown.addEventListener('focusout', function (event) {
        if (!dropdown.contains(event.relatedTarget)) {
            setExpanded(false);
        }
    });
})();

/* Homepage review rotation */
(function () {
    const cards = document.querySelectorAll('.buba-review-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
        const slides = Array.from(card.querySelectorAll('.buba-review-slide'));
        const dots = Array.from(card.querySelectorAll('.buba-review-dots span'));
        if (slides.length < 2) return;

        let index = 0;

        const show = function (nextIndex) {
            index = nextIndex % slides.length;

            slides.forEach(function (slide, slideIndex) {
                slide.classList.toggle('is-active', slideIndex === index);
            });

            dots.forEach(function (dot, dotIndex) {
                dot.classList.toggle('is-active', dotIndex === index);
            });
        };

        card.classList.add('is-rotating');
        show(0);

        window.setInterval(function () {
            show(index + 1);
        }, 4000);
    });
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
(function () {
    dropdown();
})();

/* Infinite scroll pagination */
(function () {
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination();
    }
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();
