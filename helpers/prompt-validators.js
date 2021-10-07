exports.checkIfEmpty = (value) => {
    return (value.length == 0) ? "Can't be empty" : true
}

exports.isCommaSeparated = (value) => {
    let trimmed = value.trim().replace(/ /g, '')
    let splitted = trimmed.split(',')

    return (splitted.length == 1 && splitted[0] !== value) ? "E.g \"Dev, Client, Wordpress \"" : true
}