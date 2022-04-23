const desk = document.querySelector('.desk');
const showTimeButton = document.querySelector('.desk-buttons__show-time');
const showDateButton = document.querySelector('.desk-buttons__show-date');
const showStopwatchButton = document.querySelector('.desk-buttons__show-stop');

let showTime, stopwatch;
let hours,
    minutes,
    seconds,
    date,
    stat;

const deskOfCells = document.createElement('div');
deskOfCells.className = 'desk__cells';
addCellsTo(deskOfCells,200);

const deskForSecods = document.createElement('div');
deskForSecods.className = 'desk__seconds';
addCellsTo(deskForSecods,88);

const dotsH1 = document.createElement('div');
addDotsTo(dotsH1,'h1',40);

const dotsH2 = document.createElement('div');
addDotsTo(dotsH2,'h2',40);

const dotsM1 = document.createElement('div');
addDotsTo(dotsM1,'m1',40);

const dotsM2 = document.createElement('div');
addDotsTo(dotsM2,'m2',40);

const dotsP = document.createElement('div');
addDotsTo(dotsP,'points',2);
dotsP.id = 'not-blinking';

const dotsS1 = document.createElement('div');
addDotsTo(dotsS1,'s1',40);

const dotsS2 = document.createElement('div');
addDotsTo(dotsS2,'s2',40);


// start TIME after loading page
startShowingTime();
stat = 'watch';
showTime = setInterval(() => {
    startShowingTime();
}, 1000);

// ==== <LISTENERS>
showTimeButton.addEventListener('click', () => {
    if (stat !== "watch") {
        removeStopwatchConrols();
        startShowingTime();
        stat = 'watch';
        showTime = setInterval(() => {
            startShowingTime();
        }, 1000);
    }
});

showDateButton.addEventListener('click', () => {
    if (stat !== 'date') {
        stat = 'date';
        pauseStopwatch();
        stopShowingTime();
        removeStopwatchConrols();
        showDate();
    }
});

showStopwatchButton.addEventListener('click', (event) => {
    if (stat !== 'stopwatch') {
        stat = 'stopwatch';
        stopShowingTime();
        resetStopwatch();
        event.target.classList.add('on');
        document.querySelector('.stopwatch-controls').classList.add('on');
        document.querySelector('.stopwatch-controls__start').style.opacity = '1';
        document.querySelector('.stopwatch-controls__pause').style.opacity = '1';
    }
});

document.querySelector('.stopwatch-controls__start').addEventListener('click',(event) => {
    if (stat !== 'stopwatchStarted') {
        stat = 'stopwatchStarted';
        startStopwatch();
        stopwatch = setInterval(() => {
            startStopwatch();
        }, 1000);
        event.target.style.opacity = '0.6';
        document.querySelector('.stopwatch-controls__pause').style.opacity = '1';
    }
});

document.querySelector('.stopwatch-controls__pause').addEventListener('click', (event => {
    pauseStopwatch();
    document.querySelector('.stopwatch-controls__start').style.opacity = '1';
    event.target.style.opacity = '0.6';
}));

document.querySelector('.stopwatch-controls__reset').addEventListener('click', () => {
    if (stat !== 'stopwatchReset') {
        stat = 'stopwatchReset';
        pauseStopwatch();
        resetStopwatch();
        document.querySelector('.stopwatch-controls__start').style.opacity = '1';
        document.querySelector('.stopwatch-controls__pause').style.opacity = '1';
    }
});
// ===== </LISTENERS>

// ===== <FUNCTIONS>
function startShowingTime() {
    desk.classList.add('second-show');
    date = new Date();
    seconds = String(date.getSeconds());
    minutes = String(date.getMinutes());
    hours = String(date.getHours());
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    dotsH1.id = `num${hours[0]}`;
    dotsH2.id = `num${hours[1]}`;
    dotsM1.id = `num${minutes[0]}`;
    dotsM2.id = `num${minutes[1]}`;
    dotsS1.id = `num${seconds[0]}`;
    dotsS2.id = `num${seconds[1]}`;
    dotsP.id = 'blinking';
}

function showDate() {

    desk.classList.add('second-show');
    stopShowingTime();
    pauseStopwatch();
    date = new Date();
    day = String(date.getDate());
    mounth = String(date.getMonth() + 1);
    year = String(date.getFullYear());
    if (day < 10) {
        day = "0" + day;
    }
    if (mounth < 10) {
        mounth = "0" + mounth;
    }
    dotsH1.id = `num${day[0]}`;
    dotsH2.id = `num${day[1]}`;
    dotsM1.id = `num${mounth[0]}`;
    dotsM2.id = `num${mounth[1]}`;
    dotsS1.id = `num${year[2]}`;
    dotsS2.id = `num${year[3]}`;
    dotsP.id = 'date';
}

function removeStopwatchConrols() {
    if (document.querySelector('.stopwatch-controls').classList.contains('on')){
        document.querySelector('.stopwatch-controls').classList.remove('on');
    }
}

function resetStopwatch() {
    stopShowingTime();
    dotsH1.id = `num0`;
    dotsH2.id = `num0`;
    dotsM1.id = `num0`;
    dotsM2.id = `num0`;
    dotsS1.id = `num0`;
    dotsS2.id = `num0`;
    dotsP.id = 'not-blinking';
    desk.classList.remove('second-show');
}

function stopShowingTime() {
    clearInterval(showTime);
    showTime = null; 
}

function addCellsTo(block,count){
    for(let i = 1; i < count + 1; i++) {
        const cell = document.createElement('div');
        cell.className = 'desk__cell';
        block.append(cell);
    }
    desk.append(block);
}

function addDotsTo(block,cls,count) {
    block.className = `dots ${cls}`;
    for (let i = 1; i < count+1; i++) {
        const dot = document.createElement('div');
        dot.className = `dots__dot dot-${i}`;
        block.appendChild(dot);
    }
    if (block.classList.contains('s1') || block.classList.contains('s2')) {
        deskForSecods.prepend(block);
    } else {
        desk.prepend(block);
    }
}

function startStopwatch() {
    dotsP.id = 'blinking';
    const currentTimeS2 = Number(dotsM2.id[3]);
    const currentTimeS1 = Number(dotsM1.id[3]);
    const currentTimeM2 = Number(dotsH2.id[3]);
    const currentTimeM1 = Number(dotsH1.id[3]);
    if (currentTimeS2 === 9) {
        dotsM2.id = `num0`;
        if (currentTimeS1 === 5) {
            dotsM1.id = `num0`;
            if (currentTimeM2 === 9) {
                dotsH2.id = `num0`;
                if (currentTimeM1 === 5) {
                    dotsH1.id = `num0`;
                } else {
                    dotsH1.id = `num${1 + currentTimeM1}`;
                }
            } else {
                dotsH2.id = `num${1 + currentTimeM2}`;
            }
        } else {
            dotsM1.id = `num${1 + currentTimeS1}`;
        }
    } else {
        dotsM2.id = `num${1 + currentTimeS2}`;
    }
}

function pauseStopwatch() {
    if (stat !== 'stopwatchPaused') {
        stat = 'stopwatchPaused';
        clearInterval(stopwatch);
        stopwatch = null;
        dotsP.id = 'not-blinking';
    }
}

// </FUNCTIONS>
