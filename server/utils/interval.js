const state = require('../state/state')
const { parseLinks, getPosts } = require('../utils/parser')

const RIA = 'https://ria.ru'
const RT = 'https://russian.rt.com'
const TASS = 'https://tass.ru'


function resetDB() {
    state.reset()
}

let min = 60000
let h = 3600000


function interval() {

    setInterval(() => {

        Promise.all([
            parseLinks(TASS, "main.container section")
                .then(links => {
                    getPosts(links)
                        .then(posts => state.setPosts(posts))
                }).catch(e => {
                    console.log(e)
                }),

            parseLinks(RT, ".layout__rows .rows__flex")
                .then(links => {
                    getPosts(links)
                        .then(posts => state.setPosts(posts))
                }).catch(e => {
                    console.log(e)
                }),

            parseLinks(RIA, ".content div[data-section=2]")
                .then(links => {
                    getPosts(links)
                        .then(posts => state.setPosts(posts))
                }).catch(e => {
                    console.log(e)
                })
        ])

    }, min * 5);

    setInterval(() => {

        console.log('resetDB');
        resetDB()
        console.log(state.posts);
    }, h * 24)
}

module.exports = { interval }