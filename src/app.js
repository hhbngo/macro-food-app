const path = require('path')
const hbs = require('hbs')
const express = require('express')
const getResults = require('./utils/macro')
const uniqid = require('uniqid')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Macro Calc'
    })
})

app.get('/macros', (req, res) => {
    const name = req.query.name
    const unit = req.query.unit
    const amount = parseInt(req.query.amount)

    getResults(name, unit, amount, (data) => {
        res.send(data)
    });
})

app.get('/id', (req, res) => {
    if (!req.query.key) {
        return res.redirect('/')
    }
    const first = req.query.key
    const id = `${first}-${uniqid.process()}`
    res.send({ id: id })
})

app.get('*', (req, res) => {
    res.redirect('/')
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})