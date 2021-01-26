const { parsePost, parseLinks, getPosts } = require('./parsePost')
const { elems } = require("./configs")
const fs = require("fs")

const saveResult = (json) => {

    fs.writeFile('result.json', json, (err) => {
        if (err) console.log('not saved')
    })
}
// parseLinks("https://ria.ru/", "#content")
// parseLinks("https://russian.rt.com", ".rows__flex")

parseLinks("https://tass.ru", ".container")
    .then(links => {
        getPosts(links).then(posts => saveResult(JSON.stringify(posts)))
        // getPosts(links).then(posts => console.log(posts))
    }).catch(e => console.log(e))

// parsePost('https://tass.ru/kosmos/10537195', elems.tassNews)
// parsePost('https://ria.ru/20210126/prikhodko-1594597292.html', elems.riaNews)