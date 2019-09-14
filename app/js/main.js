// Update time watch and greetings
const clockEl = document.querySelector('#clock');
const greetingEl = document.querySelector('#greeting-text');

setInterval(() => {
    let nowTime = new Date();
    let nowHour = nowTime.getHours();
    let strHour = '' + nowHour;
    let nowMinute = nowTime.getMinutes();
    let strMinute = '' + nowMinute;
    let nowSecond = nowTime.getSeconds();
    let strSecond = '' + nowSecond;
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
settingCloseBtnEl.addEventListener('click', () => {
    settingModalEl.classList.remove('modal--show');
})

//clicked outside of modal menu to collapse it
bodyEl.addEventListener('click', event => {
    if (settingModalEl.classList.contains('modal--show') == true) {
        if (event.target.closest('.modal') == null) {
            settingModalEl.classList.remove('modal--show');
        }
    }
})

//render quicklinks in nau-tab
const quickLinksEl = document.querySelector('#quicklinks');
quicklinks.forEach((element, index) => {
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
    } else { aEl.classList.add(element.icon); }
    liEl.appendChild(aEl);
    quickLinksEl.appendChild(liEl);
});

const formEl = document.querySelector('#settings-panel');
const settingQuicklinkEl = document.querySelectorAll('#setting-quicklinks input');
//saving data in setting panel
formEl.addEventListener('change', () => {
    const myData = Array.from(formEl.elements).reduce((data, input) => {
        if (input.type === 'radio') {
            data[input.name] = data[input.name] || (input.checked && input.value) || '';
        } else if (input.type === "checkbox") {
            data[input.dataset.linkId] = input.checked;
        }
        // else if (input.localName === "fieldset") {
        //     return data;
        // }
        return data;
    }, {});
    localStorage.setItem('user', JSON.stringify(myData));
    update();
});

// on Window loaded:
window.addEventListener('load', () => {
    update();
    if (localStorage.getItem('bg-backup') == null) {
        localStorage.setItem('bg-backup', `{"url":{"raw":"https://images.unsplash.com/photo-1555117746-a7c449e5d0ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzOTh9","full":"https://images.unsplash.com/photo-1555117746-a7c449e5d0ff?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQzOTh9","regular":"https://images.unsplash.com/photo-1555117746-a7c449e5d0ff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzOTh9","small":"https://images.unsplash.com/photo-1555117746-a7c449e5d0ff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQzOTh9","thumb":"https://images.unsplash.com/photo-1555117746-a7c449e5d0ff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQzOTh9","custom":"https://images.unsplash.com/photo-1555117746-a7c449e5d0ff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=crop&ixid=eyJhcHBfaWQiOjQzOTh9"},"author":"Ethan Dow","location":"SF Bay Area, CA"}`);
    }
    if (formEl[4].value !== "user") {
        changeBgImgOnCondition();
        console.log(formEl);
    }
});

function changeBgImgOnCondition() {
    const getBgInfo = localStorage.getItem('bg-info');
    if (getBgInfo && (timePass() < 3600000)) {
        setBgImg(getBgInfo);
    } else {
        let getBgBackupInfo = localStorage.getItem('bg-backup');
        setBgImg(getBgBackupInfo);
        localStorage.setItem('bg-info', getBgBackupInfo);
        fetchNewPhoto(new Date());
    }
}

function timePass() {
    const nowTime = new Date();
    const checkTime = localStorage.getItem('Last Time Open');
    let timeHasPass;
    if (checkTime) {
        timeHasPass = nowTime - checkTime;
    } else timeHasPass = 0;
    localStorage.setItem('Last Time Open', Date.parse(nowTime));
    return timeHasPass = 5000000;
}

function update() {
    //try to read localStorage
    let storedUser;
    try {
        storedUser = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        console.error(error);
    }
    //get list icon of quicklinks
    const quickLinksIconEl = document.querySelectorAll('#quicklinks li');
    for (const list of quickLinksIconEl) {
        let listId = list.id;
        const selectQuicklinkEl = document.querySelector(`#setting-quicklinks input[data-link-id = ${listId}]`);
        if ((storedUser != null) && (storedUser[listId] === true)) {
            list.classList.remove('u-hidden');
            selectQuicklinkEl.checked = true;
        } else {
            selectQuicklinkEl.checked = false;
            list.classList.add('u-hidden');
        }
    }
}

//fetch unsplash nau-tab background
const unsplashAPI = 'https://api.unsplash.com/photos/random';
const collectionsByPeriod = {
    day: [1507483],
    night: [4747434],
    dawn: [4748158],
    dusk: [4748158],
};

/**
 * Fetch Unplash random image
 *
 * @param {string} period Period of the day to change appropriate collection (day, night, dawn, dusk)
 * @return {Promise}        the request resolving promise object
 */


function queryString(params) {
    return Object.keys(params).map(k => {
        let val = params[k];
        // join array values with comma
        if (Array.isArray(val)) {
            val = val.join(',');
        }

        return `${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
    }).join('&');
}


function fetchUnsplash(period = 'day') {
    const params = {
        orientation: 'landscape',
        w: 1920,
        // my collection with curated photos, refer to https://unsplash.com/@trongthanh/collections
        collections: collectionsByPeriod[period] || collectionsByPeriod.day,
    };

    // NOTE: the client id belongs to Nau-Tab only, please request your own Application at Unsplash
    const requiredHeaders = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Client-ID 01334b1872fbd0bda3f4f3ba44f0693213cf06f682b81079f8adf802fb89993b',
    });

    const url = `${unsplashAPI}?${queryString(params)}`;
    console.log('fetch url:', url);
    const req = new Request(url, {
        method: 'GET',
        headers: requiredHeaders,
    });

    return fetch(req)
        .then(response => {
            console.log('response.status:', response.status);
            if (response.ok) {

                return response.json();

                // result will be JSON object
            }

            return response.json();
            // Even response is 4**, we still receive json object describe error
        })
        .catch(err => {
            console.log('Errors:', err);
            return err;
        });
}

function getDayPeriod(timeValue) {
    let time = timeValue;
    if (!(time instanceof Date)) {
        time = new Date(time);
    }
    const hours = time.getHours();

    if (hours < 5) {
        return 'night';
    } else if (hours < 7) {
        return 'dawn';
    } else if (hours < 18) {
        return 'day';
    } else if (hours < 20) {
        return 'dusk';
    }

    // else
    return 'night';
}
async function fetchNewPhoto(time) {
    // const period = getDayPeriod(1549029600000); // this value to test night time
    const period = getDayPeriod(time);
    const json = await fetchUnsplash(period);
    const bgInfo = {
        'url': json.urls,
        'author': json.user.name,
        'location': json.user.location,
    };
    localStorage.setItem('bg-backup', JSON.stringify(bgInfo));
}

function setBgImg(bginfo) {
    const bgInfoObj = JSON.parse(bginfo);
    const wallPaperEl = document.querySelector('#wallpaper');
    wallPaperEl.style.backgroundImage = `url(${bgInfoObj.url.regular})`;
    wallPaperEl.style.backgroundSize = `cover`;
}