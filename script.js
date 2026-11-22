// let title = document.querySelector(".title")

// setTimeout(() => {
//     title.innerHTML = "Пройшло 2 секунди"
// }, 2000);

// let btn = document.querySelector(".save")
// let text = document.querySelector(".toast")

// btn.addEventListener("click", ()=>{
//     text.classList.add("show")
//     setTimeout(() => {
//          text.classList.remove("show")
//     }, 3000);
        

// })

// let clock = document.querySelector(".clock")
// let seconds = 0
// setInterval(() => {
//     clock.innerHTML= new Date().toLocaleTimeString("uk-UA")
// }, 1000);


const field = document.querySelector("#field");
const target = document.querySelector("#target");
const overlay = document.querySelector("#overlay");
const overlaytext = document.querySelector("#overlayText");
const startBtn = document.querySelector("#startBtn");


const scoreText = document.querySelector("#score");
const missesText = document.querySelector("#misses");
const TimeText = document.querySelector("#time");
const reactionText = document.querySelector("#reaction");
const bestText= document.querySelector("#best");


let score = 0
let game_time = 20
let JUMP_SPEED = 1000
let misses = 0

let timeLeft = game_time
let gameTimer = null
let jumpTimer = null

let apperTime = 0
let fastest = 0
let best = localStorage.getItem("reactionBest") || 0 
bestText.innerHTML = best


function startGame(){
    score = 0
    misses=0
    timeLeft = game_time
    fastest = 0
    reactionText.innerHTML = "-"
    scoreText.innerHTML = score
    missesText.innerHTML  = misses
    TimeText.innerHTML = timeLeft
    overlay.classList.add("hidden")
    target.classList.remove("hidden")
    moveTarget()

    gameTimer = setInterval(tick, 1000)
    jumpTimer = setInterval(autoJump, JUMP_SPEED)
}

    
function hitTarget(){
    const  reaction = Date.now() - apperTime
    reactionText.innerHTML = `${reaction} мс`
    if (fastest == 0 || reaction < fastest)
    score++
    scoreText.innerHTML = score
    clearInterval(jumpTimer)
    moveTarget()
    jumpTimer = setInterval(autoJump, JUMP_SPEED)
}

function randomNumber(min,max){
    return Math.floor(Math.random() * (max-min + 1)) + min     
}

function moveTarget(){
    let size = target.offsetWidth
    let maxX = field.clientWidth - size
    let maxY = field.clientHeight - size
    target.style.top = randomNumber(0,maxY) + "px"
    target.style.left = randomNumber(0,maxX) + "px"
    apperTime = Date.now()
}



function tick() {
    timeLeft--
    TimeText.innerHTML = timeLeft
    if (timeLeft == 0) {
        endGame()
    }
}


function endGame(){
    clearInterval(gameTimer)
    target.classList.add("hidden")

    overlaytext.innerHTML = `Час вийшов! Влучень:${score}`
    if(fastest > 0) {
        overlaytext.innerHTML += `НАйшвидша реакція: ${fastest}мс`
    }
    if (score > best){
        best = score
        localStorage.setItem("reactionBest", best)
        bestText.innerHTML = best
        overlaytext.innerHTML += "НОвий рекорд"
    }
    startBtn.innerHTML = "Ще раз"
    overlay.classList.remove("hidden")
}

function autoJump() {
    misses++
    missesText.innerHTML = misses
    moveTarget()
}

startBtn.addEventListener("click", startGame)
target.addEventListener("click", hitTarget)