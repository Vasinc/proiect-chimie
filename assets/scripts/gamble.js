// i know that the code is very bad and repeats a ton.. maybe when i'll have more experience i'll recheck this project

const slots = document.querySelectorAll(".slot-item");
const spinBtn = document.querySelector('.spin-btn');
const decreaseBet = document.querySelector('.decrease-bet');
const increaseBet = document.querySelector('.increase-bet');
const playBackdrop = document.querySelector('.play-backdrop');
const resetUI = document.querySelector('.reset-confirm');
const confirmResetBtn = document.querySelector('.reset-confirm__btn');
const declineResetBtn = document.querySelector('.reset-decline__btn');
const resetBtn = document.querySelector('.reset-btn');
const shopBtn = document.querySelector('.shop-btn');
const closeShopBtn = document.querySelector('.close-shop__button');
const shop = document.querySelector('.shop');
const upgrades = document.querySelectorAll('.upgrade');
const upgradesInfo = document.querySelectorAll('.upgrade-level-info');
const starsSection = document.querySelector('.stars-section');
const infoBtn = document.querySelector('.info-btn');
const infoSection = document.querySelector('.main-info-section');

const SLOTS_ASSETS = ['orange', 'lemon', 'cherry', 'plum', 'melon', 'bell', 'bar', 'seven'];

let moneyVal = parseInt(document.querySelector('.money').textContent);
let betVal = parseInt(document.querySelector('.bet-val').textContent);
let multiplier = parseInt(document.querySelector('.multiplier-multiply').textContent);
let sevenChance = parseInt(document.querySelector('.seven-chance').textContent);
let doubleChance = parseInt(document.querySelector('.double-chance').textContent);
let spinFaster = parseInt(document.querySelector('.spin-faster').textContent);
let sevensLeft = parseInt(document.querySelector('.row-seven-left').textContent);
let isSpinning = false;
let randomSpins;
let auto_slots;
let midVals;
let prvSlot = [0, 0, 0];
let prvSlot1 = [0, 0, 0];
let prvSlot2 = [0, 0, 0];
let upgradesLevel = [0, 0, 0, 0];
let upgradesCost = [1000, 99999999, 500, 2500];

spinBtn.style.background = `rgb(255, 0, 0)`;


moneyVal = 1000;
updateMoney();
betVal = 10;
updateBet();

function updateMoney() {
    document.querySelectorAll('.money').forEach(money => {
        money.textContent = moneyVal;
    });
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
        betVal = parseInt(localStorage.getItem('betValue'));
        updateBet();
    }
    if (localStorage.getItem('upgrLevels')) {
        upgradesLevel = JSON.parse(localStorage.getItem('upgrLevels'));
        for(let i=0; i<upgrades.length; i++){
            upgrades[i].querySelector('.upgrade-level').textContent = upgradesLevel[i];
            upgradesInfo[i].textContent = upgradesLevel[i];
        }
        multiplier = (1 + (upgradesLevel[0] * 0.05)).toFixed(2);
        document.querySelector('.multiplier-multiply').textContent = multiplier;

        doubleChance = doubleChance + (upgradesLevel[2] * 2)
        document.querySelector('.double-chance').textContent = doubleChance;

        spinFaster = upgradesLevel[3] * 10
        document.querySelector('.spin-faster').textContent = spinFaster;
    }
    if (localStorage.getItem('upgrCosts')) {
        upgradesCost = JSON.parse(localStorage.getItem('upgrCosts'));
        for(let i=0; i<upgrades.length; i++){
            upgrades[i].querySelector('.upgrade-price').textContent = upgradesCost[i];
        }
    }
    if(localStorage.getItem('stars')) {
        starsSection.textContent = JSON.parse(localStorage.getItem('stars'));
    }
    upgrades.forEach(upgrade => {
        if (upgrade.querySelector('.upgrade-price').textContent == 'MAXED') {
            upgrade.querySelector('.buy-upgrade__button').style.background = 'rgb(255, 0, 0)';
            upgrade.querySelector('.buy-upgrade__button').style.cursor = 'not-allowed'
        }
    })
    if(localStorage.getItem('sevens')){
        sevensLeft = parseInt(localStorage.getItem('sevens'));
        document.querySelector('.row-seven-left').textContent = sevensLeft;
    }
}

function changeSlots () {
    for(let i=0; i<3; i++) {
        if (i == 0) {
            rndNum = Math.trunc(Math.random() * (SLOTS_ASSETS.length));
            prvSlot.unshift(rndNum);
            prvSlot.pop;
            slots[i].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot[2]]}_slots.jpg')`;
        } else if ( i == 1 ) {
            rndNum = Math.trunc(Math.random() * (SLOTS_ASSETS.length));
            prvSlot1.unshift(rndNum);
            prvSlot1.pop;
            slots[i].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot1[0]]}_slots.jpg')`;
            slots[i + 3].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot1[1]]}_slots.jpg')`;
            slots[i + 6].style.backgroundImage = `url('./assets/slots_assets/${SLOTS_ASSETS[prvSlot1[2]]}_slots.jpg')`;
        } else {
            rndNum = Math.trunc(Math.random() * (SLOTS_ASSETS.length));
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
        let doubleBet = 1;
        midVals = [prvSlot[1], prvSlot1[1], prvSlot2[1]];
        console.log(midVals);
        let rndDoubleChance = Math.floor(Math.random() * 100)
        console.log(`rndNum: ${rndDoubleChance}`);
        if(doubleChance >= rndDoubleChance) {
            doubleBet = 2;
        } else {
            doubleBet = 1;
        }
        for(let i=0; i<1; i++) {
            console.log(midVals[i]);
            console.log(midVals[i+1]);
            console.log(midVals[i+2]);
            if ( midVals[i] == midVals[i+1] && midVals[i+1] == midVals[i+2]) {
                switch (midVals[i]) {
                    case 0:
                        moneyVal = moneyVal + (betVal * 20)*multiplier * doubleBet;
                        updateMoney();
                        break;
                    case 1:
                        moneyVal = moneyVal + (betVal * 30)*multiplier * doubleBet;
                        updateMoney();
                        break;
                    case 2:
                        moneyVal = moneyVal + (betVal * 50)*multiplier * doubleBet;
                        updateMoney();
                        break;
                    case 3:
                        moneyVal = moneyVal + (betVal * 70)*multiplier * doubleBet;
                        updateMoney();
                        break;
                    case 4:
                        moneyVal = moneyVal + (betVal * 85)*multiplier * doubleBet;
                        updateMoney();
                        break;
                    case 5:
                        moneyVal = moneyVal + (betVal * 100)*multiplier * doubleBet;
                        updateMoney();
                        break;
                    case 6:
                        moneyVal = moneyVal + (betVal * 150)*multiplier * doubleBet;
                        updateMoney();
                        break;
                    case 7:
                        moneyVal = moneyVal + (betVal * 300)*multiplier * doubleBet;
                        updateMoney();
                        if (sevensLeft == 1) {
                            sevensLeft = sevensLeft - 1;
                            document.querySelector('.row-seven-left').textContent = sevensLeft;
                            starsSection.textContent = `${starsSection.textContent} ???`
                            localStorage.setItem('stars', JSON.stringify(starsSection.textContent));
                        }
                        if(sevensLeft >= 1) {
                            sevensLeft = sevensLeft - 1;
                            document.querySelector('.row-seven-left').textContent = sevensLeft;
                            console.log('succes');
                        }
                        localStorage.setItem('sevens', sevensLeft);
                        break;
                }
                console.log('se repeta de trei ori')
            } else if (  midVals[i] == midVals[i+1] || midVals[i] == midVals[i+2] || midVals[i+1] == midVals[i+2] ) {
                moneyVal = moneyVal + (betVal * 2)*multiplier * doubleBet;
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
        auto_slots = setInterval(changeSlots, 150 - (7.5 * upgradesLevel[3]));
        moneyVal = moneyVal - betVal;
        updateMoney();
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
    shop.classList.remove('display-block');
    infoSection.classList.remove('display-block');
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
    upgradesLevel = [0, 0, 0, 0];
    for(let i=0; i<upgrades.length; i++){
        upgrades[i].querySelector('.upgrade-level').textContent = upgradesLevel[i];
        upgradesInfo[i].textContent = upgradesLevel[i];
    }
    upgradesCost = [1000, 99999999, 500, 2500];
    for(let i=0; i<upgrades.length; i++){
        upgrades[i].querySelector('.upgrade-price').textContent = upgradesCost[i];
    }

    multiplier = (1 + (upgradesLevel[0] * 0.05)).toFixed(2);
    document.querySelector('.multiplier-multiply').textContent = multiplier;

    doubleChance = (upgradesLevel[2] * 2)
    document.querySelector('.double-chance').textContent = doubleChance;

    spinFaster = upgradesLevel[3] * 10
    document.querySelector('.spin-faster').textContent = spinFaster;

    updateMoney();
    updateBet();
    localStorage.removeItem('Money');
    localStorage.removeItem('betValue');
    localStorage.removeItem('stars');
    localStorage.removeItem('sevens');
    localStorage.removeItem('upgrCosts');
    localStorage.removeItem('upgrLevels');
})

shopBtn.addEventListener('click', () => {
    playBackdrop.classList.add('display-block');
    shop.classList.add('display-block');
    document.body.style.overflow = 'hidden';
    playBackdrop.scrollIntoView();
})

closeShopBtn.addEventListener('click', () => {
    playBackdrop.classList.remove('display-block');
    shop.classList.remove('display-block');
    document.body.style.overflow = 'visible';
})

shop.addEventListener('click', event => {
    if (event.target.className == 'buy-upgrade__button' || event.target.className == 'upgrade-price') {
        const buyUpgrade = event.target;
        let upgradeLevel = (event.target.className == 'buy-upgrade__button') ? parseInt(event.target.previousElementSibling.previousElementSibling.querySelector('.upgrade-level').textContent) : parseInt(event.target.parentElement.previousElementSibling.previousElementSibling.querySelector('.upgrade-level').textContent);
        const upgradeMaxLevel = (event.target.className == 'buy-upgrade__button') ? parseInt(event.target.previousElementSibling.previousElementSibling.querySelector('.upgrade-max-level').textContent) : parseInt(event.target.parentElement.previousElementSibling.previousElementSibling.querySelector('.upgrade-max-level').textContent);
        let upgradePrice = (event.target.className == 'buy-upgrade__button') ? parseInt(buyUpgrade.querySelector(".upgrade-price").textContent) : parseInt(event.target.textContent);
        // check if u can upgrade or not
        if (moneyVal < upgradePrice ||  upgradeLevel >= upgradeMaxLevel) return;
        moneyVal = moneyVal - upgradePrice;
        updateMoney();
        localStorage.setItem('Money', moneyVal);
        if (upgradeLevel == upgradeMaxLevel - 1) {
            starsSection.textContent = `${starsSection.textContent} ???`
            localStorage.setItem('stars', JSON.stringify(starsSection.textContent));
        }
        upgradeLevel = Math.trunc(upgradeLevel + 1);
        upgradePrice = upgradePrice + Math.trunc(upgradePrice * (5 / upgradeMaxLevel));
        if(upgradeLevel == upgradeMaxLevel) {
            if(buyUpgrade.className == 'buy-upgrade__button') {
                buyUpgrade.style.background = 'rgb(255, 0, 0)';
                buyUpgrade.style.cursor = 'not-allowed'
            } else {
                buyUpgrade.parentNode.style.background = 'rgb(255, 0, 0)';
                buyUpgrade.parentNode.style.cursor = 'not-allowed';
            }
            upgradePrice = 'MAXED';
        }
        for(let i=0; i<upgrades.length; i++) {
            if (upgrades[i] == event.target.parentNode || upgrades[i] == event.target.parentNode.parentNode) {
                upgradesLevel[i] = upgradeLevel;
                upgradesInfo[i].textContent = upgradeLevel;
                upgradesCost[i] = upgradePrice;
                localStorage.setItem('upgrLevels', JSON.stringify(upgradesLevel));
                localStorage.setItem('upgrCosts', JSON.stringify(upgradesCost));
            }
        }
        //update INFO SECTION 
        multiplier = (1 + (upgradesLevel[0] * 0.05)).toFixed(2);
        document.querySelector('.multiplier-multiply').textContent = multiplier;

        doubleChance = upgradesLevel[2] * 2
        document.querySelector('.double-chance').textContent = doubleChance;

        spinFaster = upgradesLevel[3] * 10
        document.querySelector('.spin-faster').textContent = spinFaster;
        // update UI
        if (event.target.className == 'buy-upgrade__button') {
            event.target.previousElementSibling.previousElementSibling.querySelector('.upgrade-level').textContent = upgradeLevel;
            buyUpgrade.querySelector(".upgrade-price").textContent = upgradePrice;
        } else { 
            event.target.parentElement.previousElementSibling.previousElementSibling.querySelector('.upgrade-level').textContent = upgradeLevel;
            buyUpgrade.textContent = upgradePrice;
        }
        console.log(`Upgrade level is: ${upgradeLevel} / ${upgradeMaxLevel} and the next upgrade is ${upgradePrice}$`);
        console.log(upgradesLevel);
        console.log(upgradesCost);
    } else {
        return;
    }
});

infoBtn.addEventListener('click', () => {
    playBackdrop.classList.add('display-block');
    infoSection.classList.add('display-block');
    document.body.style.overflow = 'hidden';
    playBackdrop.scrollIntoView();
})