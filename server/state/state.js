class State {
    constructor() {
        this._links = new Set()
        this._posts = []
    }

    setLinks = (el) => {
        this._links.add(el)
    };

    setPosts = (el) => {
        if (this._posts.length > 11) {
            this._posts = [...el, ...this._posts.slice(0, this._posts.length - el.length)]
        } else {
            this._posts = [...this._posts, ...el]
        }
    };

    check = (el) => {
        return this._links.has(el)
    };

    reset = () => {
        this._links.clear()
        this._posts = []
    }

    get links() {
        return this._links
    };

    get posts() {
        return this._posts
    };
}

module.exports = new State()