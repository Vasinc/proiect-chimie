const slots = document.querySelectorAll(".slot-item");
const spinBtn = document.querySelector('.spin-btn');
const decreaseBet = document.querySelector('.decrease-bet');
const increaseBet = document.querySelector('.increase-bet');
const playBackdrop = document.querySelector('.play-backdrop');
const resetUI = document.querySelector('.reset-confirm');
const confirmResetBtn = document.querySelector('.reset-confirm__btn');
const declineResetBtn = document.querySelector('.reset-decline__btn');
const resetBtn = document.querySelector('.reset-btn');

const SLOTS_ASSETS = ['orange', 'lemon', 'cherry', 'plum', 'melon', 'bell', 'bar', 'seven'];

let moneyVal = parseInt(document.querySelector('.money').textContent);
let betVal = parseInt(document.querySelector('.bet-val').textContent);
let isSpinning = false;
let randomSpins;
let auto_slots;
let midVals;
let prvSlot = [0, 0, 0];
let prvSlot1 = [0, 0, 0];
let prvSlot2 = [0, 0, 0];

spinBtn.style.background = `rgb(255, 0, 0)`;

moneyVal = 1000;
updateMoney();
betVal = 10;
updateBet();

function updateMoney() {
    document.querySelector('.money').textContent = moneyVal;
};

function updateBet() {
    document.querySelector('.bet-val').textContent = betVal;
}

window.onload = function () {
    if (localStorage.getItem('Money')) {
        moneyVal = localStorage.getItem('Money');
        updateMoney();
    }
    if (localStorage.getItem('betValue')) {
        betVal = localStorage.getItem('betValue');
        updateBet();
    }
}


function changeSlots () {
    for(let i=0; i<3; i++) {
        if (i == 0) {
            rndNum = Math.trunc(Math.random() * SLOTS_ASSETS.length);
            prvSlot.unshift(rndNum);
            prvSlot.pop;
            slots[i].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot[2]]}_slots.jpg')`;
        } else if ( i == 1 ) {
            rndNum = Math.trunc(Math.random() * SLOTS_ASSETS.length);
            prvSlot1.unshift(rndNum);
            prvSlot1.pop;
            slots[i].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot1[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot1[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot1[2]]}_slots.jpg')`;
        } else {
            rndNum = Math.trunc(Math.random() * SLOTS_ASSETS.length);
            prvSlot2.unshift(rndNum);
            prvSlot2.pop;
            slots[i].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot2[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot2[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot2[2]]}_slots.jpg')`;
        }
    }
    randomSpins = randomSpins - 1;
    spinBtn.removeEventListener('click', spinSlots);
    spinBtn.style.background = 'grey';
    spinBtn.style.cursor = 'not-allowed';
    if (randomSpins == 0) {
        midVals = [prvSlot[1], prvSlot1[1], prvSlot2[1]];
        console.log(midVals);
        moneyVal = moneyVal - betVal;
        updateMoney();
        console.log(moneyVal);
        for(let i=0; i<1; i++) {
            console.log(midVals[i]);
            console.log(midVals[i+1]);
            console.log(midVals[i+2]);
            if ( midVals[i] == midVals[i+1] && midVals[i+1] == midVals[i+2]) {
                switch (midVals[i]) {
                    case 0:
                        moneyVal = moneyVal + betVal * 20;
                        updateMoney();
                        break;
                    case 1:
                        moneyVal = moneyVal + betVal * 30;
                        updateMoney();
                        break;
                    case 2:
                        moneyVal = moneyVal + betVal * 50;
                        updateMoney();
                        break;
                    case 3:
                        moneyVal = moneyVal + betVal * 70;
                        updateMoney();
                        break;
                    case 4:
                        moneyVal = moneyVal + betVal * 85;
                        updateMoney();
                        break;
                    case 5:
                        moneyVal = moneyVal + betVal * 100;
                        updateMoney();
                        break;
                    case 6:
                        moneyVal = moneyVal + betVal * 150;
                        updateMoney();
                        break;
                    case 7:
                        moneyVal = moneyVal + betVal * 300;
                        updateMoney();
                        break;
                }
                console.log('se repeta de trei ori')
            } else if (  midVals[i] == midVals[i+1] || midVals[i] == midVals[i+2] || midVals[i+1] == midVals[i+2] ) {
                moneyVal = moneyVal + betVal * 2;
                updateMoney();
                console.log('se repeta de doua ori');
            } else {
                console.log('nu se repeta deloc')
            }
        }
        console.log(moneyVal);
        console.log('----------------------')
        clearInterval(auto_slots);
        auto_slots = null;
        isSpinning = false;
        spinBtn.addEventListener('click', spinSlots);
        spinBtn.style.background = `rgb(255, 0, 0)`;
        spinBtn.style.cursor = 'pointer';
        localStorage.setItem('Money', moneyVal);
    }
}

function spinSlots () {
        randomSpins = Math.trunc(Math.random() * 15 + 7);
    if( isSpinning == false && (moneyVal - betVal) >= 0) {
        isSpinning = true;
        auto_slots = setInterval(changeSlots, 150);
    } else {
        return;
    }
}

spinBtn.addEventListener('click', spinSlots)
decreaseBet.addEventListener('click', event => {
    const decrementValue = parseInt(event.target.className);
    if (decrementValue && spinBtn.style.background == 'rgb(255, 0, 0)') {
        if( (betVal - decrementValue) < 1) {
            return;
        }
        betVal = betVal - decrementValue;
        updateBet();
        localStorage.setItem('betValue', betVal);
    }
})
increaseBet.addEventListener('click', event => {
    const incrementValue = parseInt(event.target.className);
    if (incrementValue && spinBtn.style.background == `rgb(255, 0, 0)`) {
        betVal = betVal + incrementValue;
        updateBet();
        localStorage.setItem('betValue', betVal);
    }
})

resetBtn.addEventListener('click', () => {
    playBackdrop.classList.add('display-block');
    resetUI.classList.add('display-flex')
    document.body.style.overflow = 'hidden';
    playBackdrop.scrollIntoView();
})

playBackdrop.addEventListener('click', () => {
    playBackdrop.classList.remove('display-block');
    resetUI.classList.remove('display-flex');
    document.body.style.overflow = 'visible';
})

declineResetBtn.addEventListener('click', () => {
    playBackdrop.classList.remove('display-block');
    resetUI.classList.remove('display-flex');
    document.body.style.overflow = 'visible';
})

confirmResetBtn.addEventListener('click', () => {
    playBackdrop.classList.remove('display-block');
    resetUI.classList.remove('display-flex');
    document.body.style.overflow = 'visible';
    moneyVal = 1000;
    betVal = 10;
    updateMoney();
    updateBet();
    localStorage.removeItem('Money');
    localStorage.removeItem('betValue');
})
