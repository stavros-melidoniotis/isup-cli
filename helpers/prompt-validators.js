const { isEmpty } = require('./files')

exports.checkIfEmpty = (value) => {
    return (isEmpty(value)) ? "Can't be empty" : true
}

exports.checkIfEmptyAndValidUrl = (value) => {
    let urlRegex = /(^https?:\/\/)([w]{3}.)?[a-zA-Z0-9-_+.]{2,256}\.[a-z]{2,5}(\/[a-zA-Z0-9-_+]{1,256}){0,256}$/g

    if (isEmpty(value))
        return "Can't be empty"

    return (value.match(urlRegex)) ? true : "Enter valid url"
}

exports.isCommaSeparated = (value) => {
    let trimmed = value.trim().replace(/ /g, '')
    let splitted = trimmed.split(',')

    return (splitted.length == 1 && splitted[0] !== value) ? "E.g \"Dev, Client, Wordpress \"" : true
}