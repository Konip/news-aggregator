const unirest = require("unirest")
const cheerio = require("cheerio")
const { elems } = require("./configs")

const delay = ms => new Promise(r => setTimeout(r, ms))

// const parsePost = (url, elems) => {
//     unirest
//         .get(url)
//         .end(response => {

//             const body = response.body
//             const $ = cheerio.load(body)
//             const title = $(elems.title).text().trim()
//             const image = $(elems.image).attr('src')
//             const text = $(elems.text).text().trim()

//             const post = {
//                 title: title,
//                 image: image,
//                 text: text,
//             }
//             console.log(post)
//         })
// }
const parsePost = (url, elems) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {

            const $ = cheerio.load(body)
            const title = $(elems.title).text().trim()
            const image = $(elems.image).attr('src')
            const text = $(elems.text).text().trim()

            const post = {
                title: title,
                image: image,
                text: text,
            }
            resolve(post)
        })
    })
}
const parseLinks = (url, className) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {
            const $ = cheerio.load(body)

            let links = []
            let count = []

            if (url == "https://ria.ru/") {
                $(className).find("a").each((_, e) => {
                    if ($(e).attr("href").indexOf(url) >= 0) {
                        links.push($(e).attr("href"))
                        count++
                    }
                })
            }
            else {
                $(className).find("a").each((_, e) => {
                    links.push(`${url}` + ($(e).attr("href")))
                    count++
                })
            }

            // console.log(links)
            // console.log(count)

            resolve(links)
            if (!links.length) reject({ error: 'empty' })
        })
    })
}
const fetchLinks = async (links) => {
    for (let index = 0; index < links.length; index++) {
        const post = await parsePost(links[index], elems.rtNews).then(post => post)
        console.log(post)
        await delay(1000)
    }
}
module.exports = { parsePost, parseLinks, fetchLinks }
