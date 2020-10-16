const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = 5001

const userController = require('./controllers/user')
const prizeController = require('./controllers/prize')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.set('view engine', 'ejs')
app.use(express.static('public'))
// app.use('/css', express.static('css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/', prizeController.dispalyIndex)
app.get('/login', userController.login)
app.post('/admin', userController.handleLogin, redirectBack)
app.post('/probability', userController.updateProbability, redirectBack)
app.get('/admin', prizeController.dispalyAdmin)
app.post('/update/:id', prizeController.update, redirectBack)
app.post('/add', prizeController.handleAdd, redirectBack)
app.get('/delete/:id', prizeController.delete, redirectBack)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})