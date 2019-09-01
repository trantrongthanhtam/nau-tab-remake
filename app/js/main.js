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
//select setting and close button
const settingEl = document.querySelector('#settings-btn');
const settingModalEl = document.querySelector('#settings-modal');
const settingCloseBtnEl = document.querySelector('#settings-close-btn');
const bodyEl = document.querySelector('body');

//clicked settings button
settingEl.addEventListener('click', (event) => {
    event.stopPropagation();
    settingModalEl.classList.toggle('modal--show');
})
//clicked close modal button
settingCloseBtnEl.addEventListener('click', (event) => {
    settingModalEl.classList.remove('modal--show');
})

//clicked outside of modal menu to collapse it
bodyEl.addEventListener('click', event => {
    console.log(event.target.closest('.modal'));
    if (settingModalEl.classList.contains('modal--show') == true) {
        if (event.target.closest('.modal') == null) {
            settingModalEl.classList.remove('modal--show');
        }
    }
})

//render quicklinks in nau-tab
const quickLinksEl = document.querySelector('#quicklinks');

quicklinks.forEach(element => {
    const liEl = document.createElement('li');
    const aEl = document.createElement('a');
    liEl.className = "quick-links__li";
    aEl.className = "quick-links__link mdi";
    liEl.id = element.id;
    aEl.href = element.url;
    aEl.title = element.title;
    if (element.id === 'thanhnien' || element.id === 'vnexpress' || element.id === 'tuoitre') {
        aEl.classList.add('quick-links__link--fw');
        const spanEl = document.createElement('span');
        spanEl.className = "u-serif-text";
        spanEl.textContent = element.id === 'thanhnien' ? "Tn" : element.id === 'vnexpress' ? "vE" : "tt";
        aEl.appendChild(spanEl);
    } else aEl.classList.add(element.icon);
    liEl.appendChild(aEl);
    quickLinksEl.appendChild(liEl);
});


