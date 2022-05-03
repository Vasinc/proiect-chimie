const nav = document.querySelector('nav');
const ul = document.querySelector('ul');
const links = nav.querySelectorAll('a');
const home = document.getElementById('home');

console.log(links)


window.addEventListener('scroll', () => {
    if(window.pageYOffset > nav.clientHeight && window.innerWidth > 800) {
        nav.style.position = 'fixed';
        nav.style.background = `orange`;
        links.forEach(link => {
            link.style.color = 'white';
        })
        home.style.float = 'left';
        ul.style.float = 'right';
    } else {
        nav.style.position = 'initial';
        nav.style.background = `white`;
        links.forEach(link => {
            link.style.color = 'black';
        })
        home.style.float = 'none';
        ul.style.float = 'none';
    }
})