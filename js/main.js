const mount = document.querySelector('#site-header');

const setupMenuToggle = () => {
    const menuButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-links');

    if (menuButton && menu) {
        menuButton.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });
    }
};

const loadSharedHeader = async () => {
    if (!mount) {
        setupMenuToggle();
        return;
    }

    const base = mount.dataset.base || '';
    const src = mount.dataset.headerSrc || 'components/site-header.html';

    try {
        const response = await fetch(src);
        const html = await response.text();
        mount.innerHTML = html.replaceAll('{{base}}', base);
    } catch {
        mount.innerHTML = '<nav class="navbar container"><a class="logo" href="index.html#top">Amina<span>.</span></a></nav>';
    }

    setupMenuToggle();
};

const skillBars = document.querySelectorAll('.skill');
const runBars = () => {
    skillBars.forEach((skill) => {
        const level = skill.dataset.level || 0;
        const fill = skill.querySelector('.track span');
        if (fill) fill.style.width = `${level}%`;
    });
};

const skillSection = document.querySelector('#skills');
if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                runBars();
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillSection);
}

const hero = document.querySelector('.hero');
const heroTrail = document.querySelector('.hero-trail');

if (hero && heroTrail) {
    hero.addEventListener('mousemove', (event) => {
        const bounds = hero.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        heroTrail.style.setProperty('--x', `${x}px`);
        heroTrail.style.setProperty('--y', `${y}px`);
    });
}

loadSharedHeader();
