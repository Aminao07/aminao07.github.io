const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });
}

const skillBars = document.querySelectorAll('.skill');
const runBars = () => {
    skillBars.forEach((skill) => {
        const level = skill.dataset.level || 0;
        const fill = skill.querySelector('.track span');
        if (fill) fill.style.width = `${level}%`;
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            runBars();
            observer.disconnect();
        }
    });
}, { threshold: 0.2 });

const skillSection = document.querySelector('#skills');
if (skillSection) observer.observe(skillSection);
