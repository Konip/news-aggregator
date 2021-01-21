const unirest = require("unirest")
const cheerio = require("cheerio")

const elems = {
    riaNews: {
        title: '.article__header h1',
        image: '.photoview__open img',
        text: '.article__text',
    },
    rgNews: {
        title: '.b-material-head__row h1',
        image: '.b-material-img__img',
        text: '.b-material-wrapper__text p',
    },
    izNews: {
        title: '.m-t-10',
        image: '.big_photo__img link',
        text: '.text-article__inside div p',
    },
}
const riaNews = () => {
    unirest
        .get('https://ria.ru/20210120/politika-1593704640.html?in=t')
        .end(response => {

            const body = response.body
            const $ = cheerio.load(body)
            const title = $('.article__header h1').text().trim()
            const image = $('.article__article-image img').attr('src')
            const text = $('.article__text').text()
            // const views = $('.article__info-statistic .statistic__item m-views #text').text()


            const post = {
                title: title,
                image: image,
                text: text,
            }
            console.log(post)
        })
}
const rgNews = () => {
    unirest
        .get('https://rg.ru/2021/01/21/v-rossii-vernut-zapret-na-ekspluataciiu-transporta.html')
        .end(response => {

            const body = response.body
            const $ = cheerio.load(body)
            const title = $('.b-material-head__row h1').text()
            const image = $('.b-material-img__img').attr('src')
            const text = $('.b-material-wrapper__text p').text()


            const post = {
                title: title,
                image: image,
                text: text,
            }
        })
}
const izNews = () => {
    unirest
        .get('https://iz.ru/1114346/2021-01-21/ofitcer-vsu-porugalsia-s-ukrainskoi-blogershei-iz-za-rossii?utm_source=yxnews&utm_medium=desktop')
        .end(response => {

            const body = response.body
            const $ = cheerio.load(body)
            const title = $('.m-t-10').text().trim()
            const image = $('.big_photo__img link').attr('href')
            const text = $('.text-article__inside div p').text().trim()

            const post = {
                title: title,
                image: image,
                text: text,
            }

            console.log(post)
        })
}



const parserPost = (url, elems) => {
    unirest
        .get(url)
        .end(response => {

            const body = response.body
            const $ = cheerio.load(body)
            const title = $(elems.title).text().trim()
            if (url ==="https://iz.ru") {
                const image = $(elems.image).attr('href')
            }
            else {
                const image = $(elems.image).attr('src')
            }
            const text = $(elems.text).text().trim()

            const post = {
                title: title,
                image: image,
                text: text,
            }
            console.log(post)
        })


}

parserPost("https://iz.ru/1114624/2021-01-21/pelosi-zaiavila-o-gotovnosti-nachat-protcess-po-impichmentu-trampu", elems.izNews)