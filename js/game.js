// Global Variables
let canvas;
let world;
let keyboard = new Keyboard();
let isGamePaused = true;
let intervalIds = [];
let isFullscreenOn = false;
let mobileDevice;
let isSoundMuted = false;
let endBossX;


/**
 * The function `setStoppableInterval` creates a setInterval that can be stopped by storing the
 * interval ID in an array.
 * @param fn - The `fn` parameter is a function that will be executed repeatedly at the specified time
 * interval.
 * @param time - The time parameter represents the interval time in milliseconds at which the function
 * fn will be executed.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}



/**
 * The `init` function initializes the game by creating the level, setting up the world, and checking
 * if the user is on a mobile device.
 */
function init() {
    canvas = document.getElementById('canvas');
    createLevel();
    world = new World(canvas, keyboard);
    world.character.chickenSpeed = 0.15 + Math.random() * 0.5;
    isGamePaused = false;
    showInfo('add');
    checkMobileUser();
    bindBtsPressEvents();
    if (!detectPhoneUser()) { document.getElementById('fullscreenBtn').classList.remove('d-none'); }
    else { document.getElementById('fullscreenBtn').classList.add('d-none'); }
    showCanvasAfterLoseOrWin();
}



/**
 * The function "showCanvasAfterLoseOrWin" removes the "d-none" class from the canvas element and adds
 * it to the buttons, loseScreen, and mainMenu elements.
 */
function showCanvasAfterLoseOrWin() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('buttons').classList.add('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('mainMenu').classList.add('d-none');
}



/**
 * The function toggles fullscreen mode for the element with the id 'mainWindow'.
 */
function onFullscreen() {
    let full = document.getElementById('mainWindow');
    if (!isFullscreenOn) { enterFullscreen(full); }
    else { exitFullscreen(); }
}



/**
 * The function exitFullscreen() is used to exit fullscreen mode in a web browser.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */ document.msExitFullscreen(); }
    isFullscreenOn = false;
    document.getElementById('canvas').classList.remove('fullscreen');
}



/**
 * The function enters fullscreen mode for the specified element.
 * @param elem - The "elem" parameter is the element that you want to enter fullscreen mode. This can
 * be any valid HTML element, such as a div, video, or canvas element.
 */
function enterFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */ elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */ elem.msRequestFullscreen(); }
    isFullscreenOn = true;
    document.getElementById('canvas').classList.add('fullscreen');
}



/* The code snippet is adding an event listener to the document object for the "keydown" event. When a
key is pressed down, the function inside the event listener is executed. */
document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.code == 'Space') {
        keyboard.SPACE = true;
    }
    if (e.key == 'a' || e.key == 'A') {
        keyboard.A = true;
    }
    if (e.key == 'd' || e.key == 'D') {
        keyboard.D = true;
    }
    if (e.key == 'f' || e.key == 'F') {
        keyboard.F = true;
    }
    if (e.key == 'p' || e.key == 'P') {
        keyboard.P = true;
    }
});



/**
 * The function onMainMenu hides certain elements, stops a sound, clears intervals, and sets a variable
 * to false.
 */
function onMainMenu() {
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('mainMenu').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('buttons').classList.remove('d-none');
    document.getElementById('fullscreenBtn').classList.add('d-none');
    walking_sound.pause();

    this.isDeath = false;
    intervalIds.forEach(clearInterval);
    onPause('add');
}



/* The code snippet is adding an event listener to the document object for the "keyup" event. When a
key is released, the function inside the event listener is executed. */
document.addEventListener('keyup', (e) => {

    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.code == 'Space') {
        keyboard.SPACE = false;
    }
    if (e.key == 'a' || e.key == 'A') {
        keyboard.A = false;
    }
    if (e.key == 'd' || e.key == 'D') {
        keyboard.D = false;
    }
    if (e.key == 'f' || e.key == 'F') {
        keyboard.F = false;
    }
    if (e.key == 'p' || e.key == 'P') {
        keyboard.P = false;
    }
});



/**
 * The function toggles the visibility of an element with the ID 'infoLayer' by adding or removing the
 * 'd-none' class.
 * @param param - The parameter "param" is a string that represents the class name to be added or
 * removed from the element with the id "infoLayer".
 */
function showInfo(param) {
    document.getElementById('infoLayer').classList[param]('d-none');
}



/**
 * The function `onPause` toggles the visibility of the pause menu element and updates the
 * `isGamePaused` variable accordingly.
 * @param param - The parameter "param" is a string that determines the action to be performed. It can
 * have two possible values: "add" or "remove".
 */
function onPause(param) {
    document.getElementById('pauseMenu').classList[param]('d-none');
    if (param == 'add') {
        isGamePaused = false;
    }
}



/* The code snippet is adding an event listener to the window object for the "resize" event. When the
window is resized, the function inside the event listener is executed. */
window.addEventListener("resize", function () {
    if (this.window.matchMedia("(max-width: 500px)").matches) {
        this.document.getElementById('mobileWarning').classList.remove('d-none');
    } else if (this.window.matchMedia("(min-width: 501px)").matches) { this.document.getElementById('mobileWarning').classList.add('d-none'); }
    if (this.window.matchMedia("(max-height: 450px)").matches) {
        this.document.getElementById('mobileInterface').classList.remove('d-none');
        document.getElementById('pcFullscreen').classList.add('d-none');
        document.getElementById('fullscreenBtn').classList.add('d-none');
        document.getElementById('upperInfo').classList.add('d-none');
    } else {this.document.getElementById('mobileInterface').classList.add('d-none'); document.getElementById('pcFullscreen').classList.remove('d-none');
        document.getElementById('upperInfo').classList.remove('d-none');
    } if (this.window.matchMedia("(min-height: 450px)").matches && detectPhoneUser()) { document.getElementById('fullscreenBtn').classList.remove('d-none'); }
});



/**
 * The function toggles the mute state of the sound and updates the image of a mute button accordingly.
 */
function onMute() {
    if (!isSoundMuted) {
        isSoundMuted = true;
        document.getElementById('muteImg').src = "mobile-imgs/btn-mute.png";
    }
    else if (isSoundMuted) {
        isSoundMuted = false;
        document.getElementById('muteImg').src = "mobile-imgs/unmute.png";
    }
}



/**
 * The function checks if the user is using a mobile device and shows or hides the mobile interface
 * accordingly.
 */
function checkMobileUser() {
    if (detectPhoneUser()) { document.getElementById('mobileInterface').classList.remove('d-none') }
    else { document.getElementById('mobileInterface').classList.add('d-none') }
}



/**
 * The function detects if the user is using a mobile device by checking the user agent string.
 * @returns a boolean value indicating whether the user is using a mobile device or not.
 */
function detectPhoneUser() {
    mobileDevice = false;
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        mobileDevice = true;
    }
    return mobileDevice;
}



//Mobile Button Events
/**
 * The function binds touch events to specific buttons and updates the keyboard object accordingly.
 */
function bindBtsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.F = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.F = false;
    });
    document.getElementById('btnPause').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.P = true;
    });
    document.getElementById('btnPause').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.P = false;
    });
}