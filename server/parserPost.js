const unirest = require("unirest")
const cheerio = require("cheerio")
// import unirest from "unirest"
// import cheerio from "cheerio"

  const parserPost = (url, elems) => {
    unirest
        .get(url)
        .end(({body}) => {

            
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
// export default parserPost
module.exports = parserPost