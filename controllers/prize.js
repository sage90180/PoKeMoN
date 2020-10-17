const db = require('../models')
const Prize = db.Prize
const User = db.User
const prizeController = {
  handleAdd: (req, res, next) => {
    const {UserId} = req.session
    const {prize} = req.body
    const {title} = req.body
    const {amount} = req.body
    const {url} = req.body
    if(!prize || !title || !amount || !url){
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    Prize.create({
      prize,
      title,
      amount,
      UserId,
      url,
    }).then(()=>{
      req.flash('errorMessage', '新增成功！')
      return res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  dispalyAdmin: (req, res) => {
    const {username} = req.session
    if(!username){
      req.flash('errorMessage', '請先登入。')
      return res.render('login')
    }
    Prize.findAll({
      include: User,
      where:{
        delete: null
      }
    }).then(prizes => {
      res.render('admin',{
        prizes
      })
    })
  },  
  dispalyIndex: (req, res) => {
    Prize.findAll({
      raw: true,
      include: User,
      where:{
        delete: null
      }
    }).then(prizes => {
      res.render('index',{
        prizes
      })
    })
  },
  update: (req, res, next) => {
    const {prize} = req.body
    const {title} = req.body
    const {amount} = req.body
    const {url} = req.body
    if(!prize || !title || !amount || !url){
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    Prize.findOne({
      where:{
        id: req.params.id,
      }
    }).then(prizes => {
      return prizes.update({
        prize,
        title,
        amount,
        url
      })
    }).then(() => {
      return next()
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  delete: (req, res, next) => {
    const {username} = req.session
    if(!username){
      return next()
    }
    Prize.findOne({
      where:{
        id: req.params.id,
      }
    }).then( prizes =>{
      prizes.update({
        delete: '1'
      })
    }).then(()=>{
      req.flash('errorMessage', '刪除成功！')
      return res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handlelottery: (req, res, next, ) => {
    Prize.findAll({
      raw: true,
      include: User,
      where:{
        delete: null
      }
    }).then(prizes => {
      const probability = prizes[0]["User.probability"]
      const probabilityArr = GetProbabilityArr(probability)
      const yourNumber = Math.floor(Math.random() * probability)

      const allPrize = prizes.length -1 // 獎項
      const sumOfPrize = getSumOfPrize(prizes)// 所有獎項合

      const allLuckyNumber = getAllLuckyNumber(sumOfPrize) // 中獎號

      const yourPrize = compareNumber(yourNumber) //兌獎
      
      // 所有數字陣列
      function GetProbabilityArr(n) {
        let arr = []
        for (let i = 0; i < n; i++) {
          arr.push(i)
        }
        return arr
      }

      // 所有獎項總和
      function getSumOfPrize(arr) {
        let sum = 0
        for(let i=0;i<arr.length;i++){
          sum += Number(arr[i].amount)
        }
        return sum
      }


      // 抽獎囉~抽出所有中獎號碼
      function getAllLuckyNumber(n) {
        let arr = []
        for (let i = 0; i <= n; i++) {
          let random = Math.floor(Math.random() * (probability - i))
          arr.push(probabilityArr[random])
          probabilityArr.splice(random, 1)
        }
        return arr
      }

      // // 每個獎項總和
      function getEachePrize(n) {
        let sum = 0
        for (let i = 0; i < n; i++) {
          sum += Number(prizes[i+1].amount)
        }
        return sum
      }

      // 兌獎囉~
      function compareNumber(n) {
        let obj = {
          title: '',
          url: ''
        }
        var index = allLuckyNumber.indexOf(n)
        console.log('順序：'+index)
        if (index === -1) {
          obj.title = prizes[0].title
          obj.url = prizes[0].url
          return obj
        }
        for (let i = 1; i <= allPrize; i ++) {
          if (index < getEachePrize(i)) {
            obj.title = prizes[i].title
            obj.url = prizes[i].url
            return obj
          }
        }
        obj.title = prizes[0].title
        obj.url = prizes[0].url
        return obj
      }
      console.log('你的號碼：'+yourNumber)
      console.log(allLuckyNumber)
      console.log(yourPrize)
      return res.render('lottery',{
        prizes,
        yourPrize
      })
    })
  }
}

module.exports = prizeController
