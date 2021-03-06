const unirest = require("unirest")
const cheerio = require("cheerio")
const { elems } = require("./configs")

const delay = ms => new Promise(r => setTimeout(r, ms))

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
            // console.log(post)
            console.log(post.title.length)
            // console.log(typeof post)
            post.title && image && text
                ? resolve(post)
                : reject({ error: 'empty' })
        })
    })
}
const parseLinks = (url, className, i = 10) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {
            const $ = cheerio.load(body)

            let links = []
            let count = []

            $(className).find("a").each((_, e) => {

                if ($(e).attr("href").includes('https://')) {
                    if (count < i) {
                        links.push($(e).attr("href"))
                        count++
                    }
                }
                else {
                   
                        if (count < i) {
                            links.push(`${url}` + ($(e).attr("href")))
                            count++
                        }
                }
            })
            console.log(links)
            console.log(count)

            resolve(links)
            if (!links.length) reject({ error: 'empty' })
        })
    })
}
const getPosts = async (links) => {

    let posts = []

    for (let index = 0; index < links.length; index++) {
        const post = await parsePost(links[index], elems.riaNews)
            .then(post => post).catch(e => console.log(e))

        console.log(post)
        if (post) posts.push(post)
        // await delay(1000)
    }
    return new Promise((resolve, reject) => {
        resolve(posts)
    })
}
module.exports = { parsePost, parseLinks, getPosts }
