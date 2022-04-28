const parallax = document.getElementById('parallax');
const parallaxImg = document.getElementById('parallax-img')

window.addEventListener('scroll', () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = `${offset * 1.1}px`;
    parallaxImg.style.transform = `translateY(-${offset * .6}px)`
});