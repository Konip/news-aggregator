const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { parseLinks, getPosts } = require('./utils/parser')
const { interval } = require('./utils/interval')
const state = require('./state/state')
const wakeDyno = require("woke-dyno");

const app = express()
const PORT = process.env.PORT

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

app.get('/all', (req, res) => {
    res.send(state.posts)
})

app.listen(PORT, () => {
    console.log(`Server start ${PORT}`)
   
    wakeDyno({
        url: process.env.DYNO_URL,  // url string
        interval: 60000 * 10, // interval in milliseconds (1 minute in this example)
        startNap: [21, 0, 0, 0], // the time to start nap in UTC, as [h, m, s, ms] (05:00 UTC in this example)
        endNap: [6, 0, 0, 0] // time to wake up again, in UTC (09:59:59.999 in this example)
    }).start(); 
})

interval()