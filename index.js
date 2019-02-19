const express = require('express')
const nunjuncks = require('nunjucks')

const app = express()
nunjuncks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('user')
})

const verificaPrenchimento = (req, res, next) => {
  if (req.query.idade != null) {
    return next()
  } else {
    return res.redirect('/')
  }
}

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?idade=${req.body.age}`)
  } else {
    return res.redirect(`/minor?idade=${req.body.age}`)
  }
})

app.get('/major', verificaPrenchimento, (req, res) => {
  return res.render('maior', { idade: req.query.idade })
})

app.get('/minor', verificaPrenchimento, (req, res) => {
  res.render('menor', { idade: req.query.idade })
})

app.listen(3000)
