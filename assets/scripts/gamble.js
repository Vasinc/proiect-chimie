const slots = document.querySelectorAll(".slot-item");
const spinBtn = document.querySelector('.spin-btn');

const SLOTS_ASSETS = ['orange', 'lemon', 'cherry', 'plum', 'melon', 'bell', 'bar', 'seven'];

let isSpinning = false;
let randomSpins;
let auto_slots;
let prvSlot = [0, 0, 0];
let prvSlot1 = [0, 0, 0];
let prvSlot2 = [0, 0, 0];


function changeSlots () {
    for(let i=0; i<3; i++) {
        if (i == 0) {
            rndNum = Math.trunc(Math.random() * SLOTS_ASSETS.length);
            prvSlot.unshift(rndNum);
            prvSlot.pop;
            slots[i].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot[2]]}_slots.jpg')`;
        } else if ( i == 1 ) {
            rndNum = Math.trunc(Math.random() * SLOTS_ASSETS.length);
            prvSlot1.unshift(rndNum);
            prvSlot1.pop;
            slots[i].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot1[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot1[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot1[2]]}_slots.jpg')`;
        } else {
            rndNum = Math.trunc(Math.random() * SLOTS_ASSETS.length);
            prvSlot2.unshift(rndNum);
            prvSlot2.pop;
            slots[i].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot2[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot2[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('/assets/slots_assets/${SLOTS_ASSETS[prvSlot2[2]]}_slots.jpg')`;
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
