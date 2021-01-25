const { parsePost, parseLinks, fetchLinks } = require('./parsePost')
const { elems } = require("./configs")


// parseLinks("https://ria.ru/", "#content")
// parseLinks("https://russian.rt.com", ".rows__flex")
// parseLinks("https://tass.ru", ".container")

// const URL = "https://ria.ru/"

parseLinks("https://russian.rt.com", ".rows__flex")
    .then(links => {
        fetchLinks(links).then(post => console.log("ok"))
    }).catch(e => console.log(e))

// parsePost('https://tass.ru/kosmos/10537195', elems.tassNews)