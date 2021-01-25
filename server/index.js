const { parserPost, parseLinks } = require('./parserPost')
const elems = require("./configs")

// parserPost('https://ria.ru/20210123/amerika-1594213838.html', elems.elems.riaNews)

// cell cell-main-photo
// cell-list__item-link color-font-hover-only

// #content > div:nth-child(3) > div.section__cell > div.section__content > div:nth-child(1) > div:nth-child(5) > div > div > div > div > div.cell-list__list > div:nth-child(1) > a
// "#content > div.section > div.section__cell > div.section__content > div.floor > div.floor__cell > div.floor__cell-size > div.floor__cell-shape > div.floor__cell-content > div.cell > div.cell-list__list > div:nth-child(n) > a"

parseLinks("https://ria.ru/", "#content")
