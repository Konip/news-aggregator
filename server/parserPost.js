const unirest = require("unirest")
const cheerio = require("cheerio")



const delay = ms => new Promise(r => setTimeout(r, ms))

// const parserPost = (url, elems) => {
//     return new Promise((resolve, reject) => {
//         unirest
//             .get(url)
//             .end(({ body }) => {

//                 const $ = cheerio.load(body)
//                 const title = $(elems.title).text().trim()
//                 // const image = $(elems.image).attr('src')
//                 // const text = $(elems.text).text().trim()

//                 const post = {
//                     title: title,
//                     // image: image,
//                     // text: text,
//                 }
//             })
//         resolve(post)
//     })

// }

const parserPost = (url, elems) => {
    unirest
        .get(url)
        .end(response => {

            const body = response.body
            const $ = cheerio.load(body)
            const title = $(elems.title).text().trim()
            const image = $(elems.image).attr('src')
            const text = $(elems.text).text().trim()

            const post = {
                title: title,
                image: image,
                text: text,
            }
            console.log(post)
        })


}
const parseLinks = (url, className) => {
    unirest
        .get(url)
        .end(({ body }) => {

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
                    links.push(`${url}`+($(e).attr("href")))
                        count++
                })
            }
        
            console.log(links)
            console.log(count)

        })
}

module.exports = { parserPost, parseLinks }
