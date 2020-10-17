const imgs = document.querySelectorAll('.prize .lottery__prize-img img')

const prizeText = document.querySelector('#prizeText')
const prizeImg = document.querySelector('#prizeImg')
const changeImg = document.querySelector('#changeImg')
const playBtn = document.querySelector('#play')
// const stopBtn = document.querySelector('#stop')
var timer
playBtn.onclick = playfun; //開始
// stopBtn.onclick = stopfun; //停止


function playfun() {
  clearInterval(timer);
  timer = setInterval(function () {
    let img = Math.floor(Math.random()*imgs.length)
    changeImg.innerHTML = imgs[img].outerHTML
    prizeText.innerHTML = '?'
  }, 100)
  prizeText.style.fontSize = '120px'
  prizeImg.style.opacity = 0
  playBtn.classList.add('active')
}

// function stopfun() {
//   clearInterval(timer);
//   prizeText.style.fontSize = '30px'
//   prizeImg.style.opacity = 1
//   playBtn.classList.remove('active')
// }