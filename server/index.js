const express = require('express')
const fs = require("fs")
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const { parsePost, parseLinks, getPosts } = require('./parsePost')
const { elems } = require("./configs")

const app = express()

// const newsPaper = {
//     'RIA':'https://ria.ru',
//     'RT': 'https://russian.rt.com',
//     'TASS':'https://tass.ru'
// }
const PORT = 5000
const RIA = 'https://ria.ru'
const RT = 'https://russian.rt.com'
const TASS = 'https://tass.ru'

const p = path.join(__dirname, '..', 'client', 'src', 'result.json')

const saveResult = (json) => {
    // console.log(json);
    fs.writeFile(p, json, (err) => {
        if (err) console.log('not saved')
    })
}


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
            // .then(posts => saveResult(JSON.stringify(posts)))
        }).catch(e => console.log(e))
})
app.get('/rt', (req, res) => {
    parseLinks(RT, ".layout__rows .rows_wide:nth-child(-n+3)")
        .then(links => {
            getPosts(links, RT)
                .then(posts => res.send(posts))
            //     .then(posts => saveResult(JSON.stringify(posts)))
        }).catch(e => console.log(e))
})

app.listen(PORT, () => console.log(`Server start ${PORT}`))