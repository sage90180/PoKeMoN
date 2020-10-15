const db = require('../models')
const User = db.User
const userController = {
  login: (req, res) => {
    res.render('login')
  },
  logout: (req, res) => {
    req.session.username = null
    res.redirect('/login')
  },
  handleLogin: (req, res, next) => {
    const {
      username,
      password
    } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    User.findOne({
      where:{
        username,
        password
      }
    }).then((user)=>{
      if (!user) {
        req.flash('errorMessage', '帳號/密碼錯誤喔！')
        return next()
      }
      req.session.username = user.username
      res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  }
}

module.exports = userController