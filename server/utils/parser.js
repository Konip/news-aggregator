const unirest = require("unirest")
const cheerio = require("cheerio")
const { config } = require("../config")
const { translit } = require('../utils/translit')

let id = 0
const parsePost = (url, config) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {

            const $ = cheerio.load(body)
            const title = $(config.title).text().trim()
            const image = $(config.image).attr('src')
            // const text = $(config.text).text().trim()
            const text = $(config.text).html()
            console.log(text);

            if (!isNaN(text)) return reject({ error: 'empty' })

            let tag1 = config.tag1
            let tag2 = config.tag2

            let req = new RegExp(`<${tag1}(.|\n)*?>(.|\n)*?<\/${tag2}>`, 'g')
            let str = text.match(req)
                .join('')
                .replace(/div/g, 'p')


            console.log(str);

            const post = {
                id,
                newspaper: config.news,
                translit: translit(title),
                title,
                image,
                text: str,
            }

            id++

            post.title && image && text
                ? resolve(post)
                : reject({ error: 'empty' })
        })
    })
}

const parseLinks = (url, className, i = 20) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {
            const $ = cheerio.load(body)

            let links = new Set()

            $(className).find("a").each((_, e) => {

                let atr = $(e).attr("href")

                if (atr.includes('https://')) {
                    if (0 < i) {
                        links.add($(e).attr("href"))
                        i--
                    }
                }
                else if (atr.match(/[0-9]/g)) {
                    if (0 < i) {
                        links.add(`${url}` + ($(e).attr("href")))
                        i--
                    }
                }
            })
            console.log(links)
            console.log(links.length)
            if (!links.size) reject({ error: 'empty' })
            resolve([...links])
        })
    })
}

const getPosts = async (links, newspaper) => {

    let posts = []

    for (let i = 0; i < links.length; i++) {
        const post = await parsePost(links[i], config[newspaper])
            .then(post => post).catch(e => console.log(e))

        if (post) posts.push(post)
        // await delay(1000)
    }
    return new Promise((resolve, reject) => {
        resolve(posts)
    })
}
module.exports = { parsePost, parseLinks, getPosts }
