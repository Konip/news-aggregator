const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { parseLinks, getPosts } = require('./utils/parser')


const app = express()
const PORT = 5000

const RIA = 'https://ria.ru'
const RT = 'https://russian.rt.com'
const TASS = 'https://tass.ru'


// parseLinks("https://ria.ru", ".content div[data-section=2]")
// parseLinks("https://russian.rt.com", ".layout__rows .rows_wide:nth-child(-n+3)")

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.get('/tass', (req, res) => {
    parseLinks(TASS, "main.container section")
        .then(links => {
            getPosts(links, TASS)
                .then(posts => res.send(posts))
        }).catch(e => console.log(e))
})

app.get('/rt', (req, res) => {
    parseLinks(RT, ".layout__rows .rows__flex")
    // parseLinks(RT, ".layout__rows .rows_wide:nth-child(-n+3)")
        .then(links => {
            getPosts(links, RT)
                .then(posts => res.send(posts))
        }).catch(e => console.log(e))
})

app.get('/ria', (req, res) => {
    parseLinks(RIA, ".content div[data-section=2]")
    // parseLinks(RT, ".layout__rows .rows_wide:nth-child(-n+3)")
        .then(links => {
            getPosts(links, RIA)
                .then(posts => res.send(posts))
        }).catch(e => console.log(e))
})

app.listen(PORT, () => console.log(`Server start ${PORT}`))