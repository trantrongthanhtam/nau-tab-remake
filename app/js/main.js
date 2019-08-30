// Update time watch and greetings
const clockEl = document.querySelector('#clock');
const greetingEl = document.querySelector('#greeting-text');
setInterval(() => {
    let nowTime = new Date();
    let nowHour = nowTime.getHours();
    let strHour = '' + nowHour;
    clockEl.textContent = strHour.padStart(2, "0") + ":" + nowTime.getMinutes();
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

