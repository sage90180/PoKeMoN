const prizeText = document.querySelector('#prizeText')
const prizeImg = document.querySelector('#prizeImg')
const playBtn = document.querySelector('#play')
const stopBtn = document.querySelector('#stop')
const total = 10000
const allArr = getTotalArr(total)
var prize
var timer
var first = 1
var second = 2
var third = 3
var fourth = 4
var fifth = 5
var sixth = 6
var seventh = 7
var prizeNumber = getPrizeNumber(first + second + third + fourth)
playBtn.onclick = playfun; //開始
stopBtn.onclick = stopfun; //停止

function getTotalArr(total) {
  let arr = []
  for (let i = 0; i < total; i++) {
    arr.push(i)
  }
  return arr
}

// 取得兌獎號
function getPrizeNumber(n) {
  let arr = []
  for (let i = 0; i < n; i++) {
    let random = Math.floor(Math.random() * (total - i))
    arr.push(allArr[random])
    allArr.splice(random, 1)
  }
  return arr
}


function playfun() {
  clearInterval(timer);
  timer = setInterval(function () {
    let random = Math.floor(Math.random() * total)
    prizeText.innerHTML = random;
    prize = random
  }, 10)
  prizeText.style.fontSize = '120px'
  prizeImg.style.opacity = 0
  playBtn.style.background = '#FABE00';
  playBtn.style.color = '#592D00';
}

function stopfun() {
  clearInterval(timer);
  getPrize(prize)
  prizeText.style.fontSize = '30px'
  prizeImg.style.opacity = 1
  playBtn.style.background = '#004D95';
  playBtn.style.color = '#FEFAE0';
}

function getPrize(n) {
  var index = prizeNumber.indexOf(n)
  if (index === -1) {
    prizeText.innerHTML = '再接再厲'
    return prizeImg.innerHTML = `<img src="imgs/b.png" alt="">`
  }
  if (index < first) {
    prizeText.innerHTML = '頭獎：卡比獸'
    prizeImg.innerHTML = `<img src="imgs/1.png" alt="">`
  }
  if (index < (first + second)) {
    prizeText.innerHTML = '二獎：皮卡丘'
    return prizeImg.innerHTML = `<img src="imgs/2.png" alt="">`
  }
  if (index < (first + second + third)) {
    prizeText.innerHTML = '三獎：妙蛙花'
    return prizeImg.innerHTML = `<img src="imgs/3.png" alt="">`
  }
  if (index < (first + second + third + fourth)) {
    prizeText.innerHTML = '四獎：傑尼龜'
    return prizeImg.innerHTML = `<img src="imgs/4.png" alt="">`
  }
  if (index < (first + second + third + fourth + fifth )) {
    prizeText.innerHTML = '五獎：小火龍'
    return prizeImg.innerHTML = `<img src="imgs/5.png" alt="">`
  }
  if (index < (first + second + third + fourth + fifth + sixth)) {
    prizeText.innerHTML = '六獎：可達鴨'
    return prizeImg.innerHTML = `<img src="imgs/6.png" alt="">`
  }
  if (index < (first + second + third + fourth + fifth + sixth + seventh)) {
    prizeText.innerHTML = '五獎：百變怪'
    return prizeImg.innerHTML = `<img src="imgs/7.png" alt="">`
  }
}