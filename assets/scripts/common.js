const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('nav');
const backdrop = document.querySelector('.backdrop');


function toggleMenu() {
    nav.classList.toggle('display-flex');
    backdrop.classList.toggle('display-block');
    document.body.classList.toggle('overflow-hidden');
}

burgerMenu.addEventListener('click', () => {
    toggleMenu();
    nav.scrollIntoView();
});
backdrop.addEventListener('click', toggleMenu);

window.addEventListener('resize', () => {
    if (window.innerWidth > 800 && backdrop.classList.contains('display-block')) {
        toggleMenu();
    }
})

