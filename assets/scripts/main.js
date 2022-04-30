const parallax = document.getElementById('parallax');
const parallaxImg = document.getElementById('parallax-img')
const cards = document.querySelectorAll('.card-1');
const h1 = document.querySelector('h1');
const growingLines = document.querySelectorAll('.growing-line');

window.addEventListener('scroll', () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = `${offset * 1.1}px`;
    parallaxImg.style.transform = `translateY(-${offset * .6}px)`
});

//observers

const observerCard = new IntersectionObserver( 
    entries => {
        entries.forEach(entry => {
            const cardChildren = entry.target.querySelectorAll('.card-interescting');
            cardChildren.forEach(child => {
                child.classList.toggle('show-card__child', entry.isIntersecting);
            })
            if(entry.isIntersecting) observerCard.unobserve(entry.target)
        })
    },
    {
        threshold: .5,
    })

cards.forEach(card => {
    observerCard.observe(card);
})

const observerHeading = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('show-heading', entry.isIntersecting);
            if(entry.isIntersecting) observerHeading.unobserve(entry.target)
        })
    },
    {
        
    }
)

observerHeading.observe(h1);

const observerLines = new IntersectionObserver( entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('show-lines', entry.isIntersecting);
        if(entry.isIntersecting) observerLines.unobserve(entry.target);
    })
}, {
    threshold: 1,
})

growingLines.forEach(line => {
    observerLines.observe(line);
})