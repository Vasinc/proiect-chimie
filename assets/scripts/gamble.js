const slots = document.querySelectorAll(".slot-item");
const spinBtn = document.querySelector('.spin-btn');

const COLORS = ['red', 'blue', 'cyan', 'green', 'pink', 'magenta', 'purple', 'yellow', 'brown']

let isSpinning = false;
let randomSpins;
let auto_slots;


function changeSlots () {
    for(let i=0; i<COLORS.length; i++) {
        const rndNum = Math.trunc(Math.random() * COLORS.length);
        slots[i].style.background = `${COLORS[rndNum]}`;
    }
    randomSpins = randomSpins - 1;
    spinBtn.removeEventListener('click', spinSlots);
    spinBtn.style.background = 'grey';
    spinBtn.style.cursor = 'not-allowed';
    if (randomSpins == 0) {
        clearInterval(auto_slots);
        auto_slots = null;
        isSpinning = false;
        spinBtn.addEventListener('click', spinSlots);
        spinBtn.style.background = 'red';
        spinBtn.style.cursor = 'pointer';
    }
}

function spinSlots () {
        randomSpins = Math.trunc(Math.random() * 15 + 7);
    if( isSpinning == false ) {
        isSpinning = true;
        auto_slots = setInterval(changeSlots, 100);
    } else {
        return;
    }
}

spinBtn.addEventListener('click', spinSlots)

