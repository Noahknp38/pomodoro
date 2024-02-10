const time = document.getElementById('time');
const clock = document.getElementById('clock');
const startBtn = document.getElementById('start-btn');
const statusText = document.getElementById('status-text');

let breakSwitch = true;
let btnActive = false;
let breakCount = 0;
let startCounter = 0;

function startPomodori() {
    if (breakSwitch == true) {

        if (btnActive == false) {

            if (startCounter != 1) {

                startCounter += 1;
                let audio = new Audio("/sounds/start-sound.mp3");
                audio.play();
            }

            let pomodoriTime = 25 * 60;

            let countdown = setInterval(function () {
                let minutes = Math.floor(pomodoriTime / 60);
                let seconds = pomodoriTime % 60;

                let formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

                time.innerHTML = formattedTime;
                pomodoriTime--;

                btnActive = true;
                statusText.classList.add('active')

                if (pomodoriTime < 0) {

                    btnActive = false;
                    breakCount += 1;
                    breakSwitch = false;

                    let audio = new Audio("/sounds/end-sound.mp3");
                    audio.play();

                    clearInterval(countdown);
                    statusText.classList.remove('active');

                    if (breakCount == 4) {
                        time.innerHTML = '15:00';
                        statusText.innerHTML = 'Long Break';
                    } else {
                        time.innerHTML = '05:00';
                        statusText.innerHTML = 'Break';
                    }
                }
            }, 1000);
        }
    } else {
        startBreak();
    }

}


function startBreak() {
    if (breakCount <= 3) {

        if (btnActive == false) {

            let breakTime = 5 * 60;

            let countdown = setInterval(function () {
                let minutes = Math.floor(breakTime / 60);
                let seconds = breakTime % 60;

                let formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

                time.innerHTML = formattedTime;
                breakTime--;

                btnActive = true;
                statusText.classList.add('active')

                if (breakTime < 0) {

                    btnActive = false;
                    statusText.innerHTML = 'Pomodori'
                    breakSwitch = true;

                    let audio = new Audio("/sounds/start-sound.mp3");
                    audio.play();

                    clearInterval(countdown);
                    statusText.classList.remove('active')
                    time.innerHTML = '25:00';
                    
                }
            }, 1000);
        }
    } else {
        time.innerHTML = '15:00';
        statusText.innerHTML = 'Long Break'
        startLongBreak();
    }
}


function startLongBreak() {

    if (btnActive == false) {

        let breakTime = 15 * 60;

        let countdown = setInterval(function () {
            let minutes = Math.floor(breakTime / 60);
            let seconds = breakTime % 60;

            let formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

            time.innerHTML = formattedTime;
            breakTime--;

            btnActive = true;

            if (breakTime < 0) {

                btnActive = false;
                breakSwitch = true;
                breakCount = 0;

                let audio = new Audio("/sounds/start-sound.mp3");
                audio.play();

                clearInterval(countdown);
                time.innerHTML = '25:00';
                statusText.innerHTML = 'Pomodori'
            }

        }, 1000);
    }
}