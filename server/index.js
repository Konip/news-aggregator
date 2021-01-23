// import parserPost from "./server/parserPost.js"
// import elems from "./configs"
const parserPost = require('./parserPost')
const elems = require("./configs")

parserPost('https://ria.ru/20210123/amerika-1594213838.html',elems.elems.riaNews)