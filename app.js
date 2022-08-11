//global variables
const cells = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-2");
const logsRight = document.querySelectorAll(".log-1");
const lilyBottom = document.querySelectorAll(".lily-1");
const lilyTop = document.querySelectorAll(".lily-2");
const timeLeft = document.querySelector("#time-left");
const result = document.querySelector("#result");
const result2 = document.querySelector("#result2");
const startBtn = document.querySelector("#button");
const snake = document.querySelectorAll('.snake');
document.getElementById("win").style.display = "none";
document.getElementById("lose").style.display = "none";
const width = 9;
let currentIndex = 76;
let currentTime = 30;
let timerId;

//moving the frog forward, left, right and back with wasd
//may come back and add arrow keys
function moveFrog(e) {
    cells[currentIndex].classList.remove("frog");
    switch (e.key) {
    case 'w':
    if (currentIndex - width >= 0) currentIndex -= width;
        break;
    case 'a':
    if (currentIndex % width !== 0) currentIndex -= 1;
        break;
    case 's':
        if (currentIndex + width < width * width) currentIndex += width;
        break;
    case 'd':
    if (currentIndex % width < width - 1) currentIndex += 1;
        break;
}
    cells[currentIndex].classList.add("frog");
    lose();
    win();
}
//move cells across the screen, removing cells and replacing into the next cell to appear to be moving across the screen. some to the left, some right (lilypad, logs) 
function autoMove() {
    lilyBottom.forEach(lilyBot => moveLilyBottom(lilyBot));
    lilyTop.forEach(lilyTp => moveLilyTop(lilyTp));
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    snake.forEach(s => snakeHunt(s));
}
//snakes moving across the screen
function snakeHunt(s) {
    switch(true) {
        case s.classList.contains('s5'):
        s.classList.remove('s5')
        s.classList.add('s4')
        break
        case s.classList.contains('s4'):
        s.classList.remove('s4')
        s.classList.add('s3')
        break
        case s.classList.contains('s3'):
        s.classList.remove('s3')
        s.classList.add('s2')
        break
        case s.classList.contains('s2'):
        s.classList.remove('s2')
        s.classList.add('s1')
        break
        case s.classList.contains('s1'):
        s.classList.remove('s1')
        s.classList.add('s5')
        break
    }
}
//making the lily pads switch cells to appear to be moving across the screen
//bottom row lilypads. 1 lilypad = 1 cell
function moveLilyBottom(lilyBot) {
    switch(true) {
        case lilyBot.classList.contains('p1') :
        lilyBot.classList.remove('p1')
        lilyBot.classList.add('p2')
        break
        case lilyBot.classList.contains('p2') :
        lilyBot.classList.remove('p2')
        lilyBot.classList.add('p3')
        break
        case lilyBot.classList.contains('p3') :
        lilyBot.classList.remove('p3')
        lilyBot.classList.add('p1')
        break
    }
}
//top row lily pads
function moveLilyTop(lilyTp) {
    switch(true) {
        case lilyTp.classList.contains('p3') :
        lilyTp.classList.remove('p3')
        lilyTp.classList.add('p2')
        break
        case lilyTp.classList.contains('p2') :
        lilyTp.classList.remove('p2')
        lilyTp.classList.add('p1')
        break
        case lilyTp.classList.contains('p1') :
        lilyTp.classList.remove('p1')
        lilyTp.classList.add('p3')
        break
    }
}
//making the log pieces switch divs to appear to be moving
function moveLogLeft(logLeft) {
switch (true) {
    case logLeft.classList.contains("l1"):
        logLeft.classList.remove("l1");
        logLeft.classList.add("l2");
    break;
    case logLeft.classList.contains("l2"):
        logLeft.classList.remove("l2");
        logLeft.classList.add("l3");
    break;
    case logLeft.classList.contains("l3"):
        logLeft.classList.remove("l3");
        logLeft.classList.add("l4");
    break;
    case logLeft.classList.contains("l4"):
        logLeft.classList.remove("l4");
        logLeft.classList.add("l5");
    break;
    case logLeft.classList.contains("l5"):
        logLeft.classList.remove("l5");
        logLeft.classList.add("l1");
        break;
}
}
function moveLogRight(logRight) {
switch (true) {
    case logRight.classList.contains("l1"):
        logRight.classList.remove("l1");
        logRight.classList.add("l5");
    break;
    case logRight.classList.contains("l2"):
        logRight.classList.remove("l2");
        logRight.classList.add("l1");
    break;
    case logRight.classList.contains("l3"):
        logRight.classList.remove("l3");
        logRight.classList.add("l2");
    break;
    case logRight.classList.contains("l4"):
        logRight.classList.remove("l4");
        logRight.classList.add("l3");
    break;
    case logRight.classList.contains("l5"):
        logRight.classList.remove("l5");
        logRight.classList.add("l4");
    break;
}
}
//rules for frog to win
function win() {
if (cells[4].classList.contains("frog") || cells[1].classList.contains("frog") || cells[7].classList.contains("frog")){
    result2.innerHTML="<img src=\'images/win.png' width= 400px>";
    document.getElementById("rules").style.display = "none";
    cells[currentIndex].classList.remove("frog");
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
}
}
//rules for frog to lose
function lose() {
    if (
    currentTime === 0 ||
    cells[currentIndex].classList.contains("p1") ||
    cells[currentIndex].classList.contains("l1") ||
    cells[currentIndex].classList.contains("l2") ||
    cells[currentIndex].classList.contains("l3") ||
    cells[currentIndex].classList.contains("s1") ||
    cells[currentIndex].classList.contains("s2")
){
    result2.innerHTML="<img src=\'images/lose.png' width= 400px>";
    document.getElementById("rules").style.display = "none";
    cells[currentIndex].classList.remove("frog");
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
}
}
//autoMove and timer
function movePieces() {
    currentTime--;
    timeLeft.textContent = currentTime;
    autoMove();
    lose();
} 
//start button
startBtn.addEventListener("click", () => {
    if (timerId) {
    clearInterval(timerId);
    result2.innerHTML="<img src=\'images/start2.png' width= 300px>";
} else {
    timerId = setInterval(movePieces, 1000);
    document.addEventListener("keyup", moveFrog);
}
});

