const { parsePost, parseLinks, getPosts } = require('./parsePost')
const { elems } = require("./configs")
const fs = require("fs")

const saveResult = (json) => {

    fs.writeFile('result.json', json, (err) => {
        if (err) console.log('not saved')
    })
}
parseLinks("https://ria.ru", ".content div[data-section=2]")
// parseLinks("https://russian.rt.com", ".layout__rows .rows_wide:nth-child(-n+3)")

// parseLinks("https://tass.ru", "main.container section")
    .then(links => {
        getPosts(links).then(posts => saveResult(JSON.stringify(posts)))
        // getPosts(links).then(posts => console.log(posts))
    }).catch(e => console.log(e))
