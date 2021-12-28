const config = {
    'https://ria.ru': {
        request: '',
        title: '.article__header h1',
        image: '.photoview__open img',
        text: ".article__body",
        news:'РИА Новости',
        tag1:'div class="article__text',
        tag2:'div',
        time:'.article__info-date a'
    },
    'https://tass.ru': {
        request: '',
        title: '.news-header__title',
        image: '.text-include-photo__img',
        text: '.text-content',
        news:'ТАСС',
        tag1:'p',
        tag2:'p',
        time:'text-block p'
    },
    'https://russian.rt.com': {
        request:'',
        title: '.article.article_article-page h1',
        image: '.article__cover-image',
        text: '.article__text.article__text_article-page.js-mediator-article',
        news:'RT на русском',
        tag1:'p',
        tag2:'p',
        time:'.date'
    },
}


module.exports = {
    config
}