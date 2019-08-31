// Update time watch and greetings
const clockEl = document.querySelector('#clock');
const greetingEl = document.querySelector('#greeting-text');
setInterval(() => {
    let nowTime = new Date();
    let nowHour = nowTime.getHours();
    let strHour = '' + nowHour;
    let nowMinute = nowTime.getMinutes();
    let strMinute = '' + nowMinute;
    clockEl.textContent = strHour.padStart(2, "0") + ":" + strMinute.padStart(2, "0");
    // check when is the time
    if ((nowHour >= 21) || (nowHour < 5)) {
        greetingEl.textContent = "Good night, sleep well!"
    } else if (nowHour < 12) {
        greetingEl.textContent = "Good morning, beautiful!"
    } else if (nowHour < 18) {
        greetingEl.textContent = "Good afternoon!"
    } else {
        greetingEl.textContent = "Good evening, handsome!"
    }
}, 1000
);

// Quote randomly pick from outside source
const quotetextEl = document.querySelector(".quotes__text");
const quoteauthorEl = document.querySelector(".quotes__author");
let pickquote = Math.floor(Math.random() * quotesEN.length);

quotetextEl.textContent = quotesEN[pickquote][0];
quoteauthorEl.textContent = quotesEN[pickquote][1];

// open and close modal setting
const settingEl = document.querySelector('#settings-btn');
const settingModalEl = document.querySelector('#settings-modal');
const settingCloseBtnEl = document.querySelector('#settings-close-btn');
const bodyEl = document.querySelector('body');
settingEl.addEventListener('click', (event) => {
    event.stopPropagation();
    settingModalEl.classList.toggle('modal--show');
})

settingCloseBtnEl.addEventListener('click', (event) => {
    event.stopPropagation();
    settingModalEl.classList.remove('modal--show');
})

bodyEl.addEventListener('click', event => {
    console.log(event.target.closest('.modal'));
    if (settingModalEl.classList.contains('modal--show') == true) {
        if (event.target.closest('.modal') == null) {
            settingModalEl.classList.remove('modal--show');
        }
    }
})



