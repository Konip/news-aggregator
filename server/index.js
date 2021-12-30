const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { parseLinks, getPosts } = require('./utils/parser')

const app = express()
const PORT = 5000

const RIA = 'https://ria.ru'
const RT = 'https://russian.rt.com'
const TASS = 'https://tass.ru'

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.get('/tass', (req, res) => {
    parseLinks(TASS, "main.container section")
        .then(links => {
            getPosts(links)
                .then(posts => res.send(posts))
        }).catch(e => {
            res.send([])
            console.log(e)
        })
})

app.get('/rt', (req, res) => {
    parseLinks(RT, ".layout__rows .rows__flex")
        .then(links => {
            getPosts(links)
                .then(posts => res.send(posts))
        }).catch(e => {
            res.send([])
            console.log(e)
        })
})

app.get('/ria', (req, res) => {
    parseLinks(RIA, ".content div[data-section=2]")
        .then(links => {
            getPosts(links)
                .then(posts => res.send(posts))
        }).catch(e => {
            res.send([])
            console.log(e)
        })
})


app.listen(PORT, () => console.log(`Server start ${PORT}`))