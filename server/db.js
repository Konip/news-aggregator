let dbLinks = new Set()
const dbPosts = new Map()

function resetDB() {
    dbLinks = new Set()
}

let min = 60000

setInterval(() => {
    console.log('resetDB');
    resetDB()
    console.log(dbLinks);
}, min * 1)

module.exports = {
    dbLinks
}