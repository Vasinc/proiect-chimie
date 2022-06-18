const slots = document.querySelectorAll(".slot-item");
const spinBtn = document.querySelector('.spin-btn');

const COLORS = ['red', 'blue', 'cyan', 'green', 'pink', 'magenta', 'purple', 'yellow', 'brown']

let isSpinning = false;
let randomSpins;
let auto_slots;
let prvColors = [0, 0, 0];
let prvColors1 = [0, 0, 0];
let prvColors2 = [0, 0, 0];


function changeSlots () {
    for(let i=0; i<3; i++) {
        if (i == 0) {
            rndNum = Math.trunc(Math.random() * COLORS.length);
            prvColors.unshift(rndNum);
            prvColors.pop;
            slots[i].style.background = COLORS[prvColors[0]];
            slots[i + 3].style.background = COLORS[prvColors[1]];
            slots[i + 6].style.background = COLORS[prvColors[2]];
        } else if ( i == 1 ) {
            rndNum = Math.trunc(Math.random() * COLORS.length);
            prvColors1.unshift(rndNum);
            prvColors1.pop;
            slots[i].style.background = COLORS[prvColors1[0]];
            slots[i + 3].style.background = COLORS[prvColors1[1]];
            slots[i + 6].style.background = COLORS[prvColors1[2]];
        } else {
            rndNum = Math.trunc(Math.random() * COLORS.length);
            prvColors2.unshift(rndNum);
            prvColors2.pop;
            slots[i].style.background = COLORS[prvColors2[0]];
            slots[i + 3].style.background = COLORS[prvColors2[1]];
            slots[i + 6].style.background = COLORS[prvColors2[2]];
        }
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
        console.log(prvColors[1]);
        console.log(prvColors1[1]);
        console.log(prvColors2[1]);
    }
}

function spinSlots () {
        randomSpins = Math.trunc(Math.random() * 15 + 7);
    if( isSpinning == false ) {
        isSpinning = true;
        auto_slots = setInterval(changeSlots, 350);
    } else {
        return;
    }
}

spinBtn.addEventListener('click', spinSlots)
