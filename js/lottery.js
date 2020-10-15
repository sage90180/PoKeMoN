var prizeList = [{
  title: '再接再厲',
  amount: null,
  img: '<img src="/imgs/b.png" alt="">'
},
{
  title: '頭獎：卡比獸',
  amount: 1,
  img: '<img src="/imgs/1.png" alt="">'
},
{
  title: '二獎：皮卡丘',
  amount: 2,
  img: '<img src="/imgs/2.png" alt="">'
},
{
  title: '三獎：妙蛙花',
  amount: 3,
  img: '<img src="/imgs/3.png" alt="">'
},
{
  title: '四獎：傑尼龜',
  amount: 4,
  img: '<img src="/imgs/4.png" alt="">'
},
{
  title: '五獎：小火龍',
  amount: 5,
  img: '<img src="/imgs/5.png" alt="">'
},
{
  title: '六獎：可達鴨',
  amount: 6,
  img: '<img src="/imgs/6.png" alt="">'
},
{
  title: '七獎：百變怪',
  amount: 7,
  img: '<img src="/imgs/7.png" alt="">'
}
]


const prizeText = document.querySelector('#prizeText')
const prizeImg = document.querySelector('#prizeImg')
const playBtn = document.querySelector('#play')
const stopBtn = document.querySelector('#stop')
const changeImg = document.querySelector('#changeImg')
const probability = 30
const allArr = getTotalArr(probability)
var prizeAmount = prizeList.length -1
var prizeTotal = prizeTotal(prizeAmount)
var prizeNumber = getPrizeNumber(prizeTotal)
var prize
var timer
playBtn.onclick = playfun; //開始
stopBtn.onclick = stopfun; //停止


function getTotalArr(n) {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i)
  }
  return arr
}

function prizeTotal(n) {
  let num = 0 
  for(let i = 0 ; i <= n; i++){
    num += i
  }
  return num
}

// 取得兌獎號
function getPrizeNumber(n) {
  let arr = []
  for (let i = 0; i < n; i++) {
    let random = Math.floor(Math.random() * (probability - i))
    arr.push(allArr[random])
    allArr.splice(random, 1)
  }
  return arr
}

function playfun() {
  clearInterval(timer);
  timer = setInterval(function () {
    let random = Math.floor(Math.random() * probability)
    let img = Math.floor(Math.random()*7)
    changeImg.innerHTML = `<img src="/imgs/${img}.png" alt="">`
    prizeText.innerHTML = '?'
    prize = random
  }, 50)
  prizeText.style.fontSize = '120px'
  prizeImg.style.opacity = 0
  playBtn.classList.add('active')
}

function stopfun() {
  clearInterval(timer);
  displayPrize(prize)
  changeImg.innerHTML = ''
  prizeText.style.fontSize = '30px'
  prizeImg.style.opacity = 1
  playBtn.classList.remove('active')
}


// 每個獎項總和
function getEachePrizeTotal(n) {
  let total = 0
  for (let i = 0; i < n; i++) {
    total += prizeList[i+1].amount
  }
  return total
}

// 顯示獎項
function displayPrize(n) {
  var index = prizeNumber.indexOf(n)
  if (index === -1) {
    prizeText.innerHTML = '再接再厲'
    return prizeImg.innerHTML = `<img src="/imgs/b.png" alt="">`
  }
  for (let i = 1; i <= prizeAmount; i ++) {
    if (index < getEachePrizeTotal(i)) {
      prizeText.innerHTML = prizeList[i].title
      return prizeImg.innerHTML = prizeList[i].img
    }
  }
}