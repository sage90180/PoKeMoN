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
  }
}

module.exports = prizeController
