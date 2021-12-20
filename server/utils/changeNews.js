const { parsePost, parseLinks, getPosts } = require('./parsePost')
const { config } = require("../config")
const fs = require("fs")

const arrayType = {
    'riaNews': {
        links: "https://ria.ru",
        path: ".content div[data-section=2]",
    },
    'rtNews': {
        links: "https://russian.rt.com",
        path: ".layout__rows .rows_wide:nth-child(-n+3)",
    },
    'tassNews': {
        links: "https://tass.ru",
        path: "main.container section",
    },
}

const saveResult = (json) => {

    fs.writeFile('result.json', json, (err) => {
        if (err) console.log('not saved')
    })
}

const changeNews = (type) => {

    parseLinks(arrayType[type])
        // parseLinks("https://ria.ru", ".content div[data-section=2]")
        // parseLinks("https://russian.rt.com", ".layout__rows .rows_wide:nth-child(-n+3)")
        // parseLinks("https://tass.ru", "main.container section")
        .then(links => {
            getPosts(links).then(posts => saveResult(JSON.stringify(posts)))
            // getPosts(links).then(posts => console.log(posts))
        }).catch(e => console.log(e))
}

export default changeNews