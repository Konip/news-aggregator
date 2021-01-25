const unirest = require("unirest")
const cheerio = require("cheerio")

const delay = ms => new Promise(r => setTimeout(r, ms))

const parserPost = (url, elems) => {
    return new Promise((resolve, reject) => {
        unirest
            .get(url)
            .end(({ body }) => {

                const $ = cheerio.load(body)
                const title = $(elems.title).text().trim()
                const image = $(elems.image).attr('src')
                const text = $(elems.text).text().trim()

                const post = {
                    title: title,
                    image: image,
                    text: text,
                }
            })
        resolve(post)
    })

}
const parseLinks = (url, className) => {
    unirest
        .get(url)
        .end(({ body }) => {

            const $ = cheerio.load(body)
            let links = []
            let count = []
            // $(className).find("data-section:nth-child(n)").find("a").each((_, e) => {
            $(className).find("a").each((_, e) => {
                if ($(e).attr("href").indexOf(url) >= 0) {
                    links.push($(e).attr("href"))
                    count++
                }
            })
            console.log(links)
            console.log(count)

        })
}

module.exports = { parserPost, parseLinks }
