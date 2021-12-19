const unirest = require("unirest")
const cheerio = require("cheerio")
const { elems } = require("./configs")

const parsePost = (url, elems) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body }) => {

            const $ = cheerio.load(body)
            const title = $(elems.title).text().trim()
            const image = $(elems.image).attr('src')
            const text = $(elems.text).text().trim()

            const post = {
                title,
                image,
                text,
            }
            // console.log(post)
     
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

            $(className).find("a").each((_, e) => {

                if ($(e).attr("href").includes('https://')) {
                    if (0 < i) {
                        links.push($(e).attr("href"))
                        i--
                    }
                }
                else {
                    if (0 < i) {
                        links.push(`${url}` + ($(e).attr("href")))
                        i--
                    }
                }
            })
            console.log(links)
            console.log(links.length)
            if (!links.length) reject({ error: 'empty' })
            resolve(links)
        })
    })
}

const getPosts = async (links, newsPaper) => {
    console.log(links);
    let posts = []

    for (let i = 0; i < links.length; i++) {
        const post = await parsePost(links[i], elems[newsPaper])
            .then(post => post).catch(e => console.log(e))

        if (post) posts.push(post)
        // await delay(1000)
    }
    return new Promise((resolve, reject) => {
        resolve(posts)
    })
}
module.exports = { parsePost, parseLinks, getPosts }
