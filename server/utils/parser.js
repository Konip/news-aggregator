const unirest = require("unirest")
const cheerio = require("cheerio")
const { config } = require("../config")
const { translit } = require('../utils/translit')
const { dateFormatting } = require('../utils/time')
const state = require('../state/state')


const parsePost = (url, config) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {

            const $ = cheerio.load(body)
            const title = $(config.title).text().trim()
            const image = $(config.image).attr('src')
            const text = $(config.text).html()
            let time

            if (config.news === 'ТАСС') {
                let req = new RegExp('"article_publication_date".*GMT', 'g')
                let str = body.match(req)
                str = str.join().split(/"article_publication_date":"| GMT/g)[1]
                let date = str.slice(str.search(', ') + 1, -3)
                time = dateFormatting(date)
            } else {
                date = $(config.time).text().replace(/[\n\t]/g,'')
                time = dateFormatting(date, config.news)
            }
            // console.log(time);

            if (!isNaN(text)) return reject({ error: 'empty' })

            let tag1 = config.tag1
            let tag2 = config.tag2

            let req = new RegExp(`<${tag1}(.|\n)*?>(.|\n)*?<\/${tag2}>`, 'g')
            let str = text.match(req)

            if (str) {
                str = str.join('').replace(/div/g, 'p')
            }

            // console.log(str);

            const post = {
                newspaper: config.news,
                time,
                translit: translit(title),
                title,
                image,
                text: str,
            }

            post.title && image && text
                ? resolve(post)
                : reject({ error: 'empty' })
        })
    })
}

const parseLinks = (url, className, i = process.env.NUMBER_OF_POSTS) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {
            const $ = cheerio.load(body)

            let links = new Set()

            $(className).find("a").each((_, e) => {

                let atr = $(e).attr("href")

                if (atr.includes('https://')) {
                    if (0 < i && !state.check(atr)) {
                        state.setLinks(atr)
                        links.add(atr)
                    }
                }
                else if (atr.match(/[0-9]/g) && !atr.includes('#')) {
                    if (0 < i && !state.check(`${url}` + atr)) {
                        state.setLinks(`${url}` + atr)
                        links.add(`${url}` + atr)
                    }
                }
                i--
            })
            // console.log(links)
            // console.log(state.links)
            if (!links.size) reject({ error: 'empty' })
            resolve({ 'links': [...links], newspaper: url })
        })
    })
}

const getPosts = async (value) => {

    const { links, newspaper } = value
    let posts = []

    for (let i = 0; i < links.length; i++) {

        const post = await parsePost(links[i], config[newspaper])
            .then(post => post).catch(e => console.log(e))

        if (post) posts.push(post)

    }
    return new Promise((resolve, reject) => {
        resolve(posts)
    })
}



module.exports = { parsePost, parseLinks, getPosts }
