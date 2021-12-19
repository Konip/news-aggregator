const elems = {
    'https://ria.ru': {
        title: '.article__header h1',
        image: '.photoview__open img',
        text: '.article__text',
    },
     'https://tass.ru': {
        title: '.news-header__title',
        image: '.text-include-photo__img',
        text: '.text-block p',
    },
    'https://russian.rt.com': {
        title: '.article.article_article-page h1',
        image: '.article__cover-image',
        text: '.article__text.article__text_article-page.js-mediator-article p',
    },
}

module.exports = {
    elems: elems,
}