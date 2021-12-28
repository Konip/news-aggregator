function unix(time) {

    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    return (hours + ':' + minutes.substr(-2))
}

function dateFormatting(date, newspaper) {
    const abbreviation = {
        "Jan": "января",
        "Feb": "февраля",
        "Mar": "марта",
        "Apr": "апреля",
        "May": "мая",
        "Jun": "июня",
        "Jul": "июля",
        "Aug": "августа",
        "Sep": "сентября",
        "Oct": "октября",
        "Nov": "ноября",
        "Dec": "декабря",
    }
    const numbers = {
        "01": "января",
        "02": "февраля",
        "03": "марта",
        "04": "апреля",
        "05": "мая",
        "06": "июня",
        "07": "июля",
        "08": "августа",
        "09": "сентября",
        "10": "октября",
        "11": "ноября",
        "12": "декабря",
    }
    let month
    if (newspaper === 'РИА Новости') {
        month = date.split(' ').reverse()
        let number = month[0].split('.')
         number[1] = numbers[number[1]]
         number = number.join(' ')
         month[0] = number
         return month.join(' ')
    }
    month = date.split(' ')
    month[2] = abbreviation[month[2]]
    return month.join(' ')
}

module.exports = { dateFormatting } 