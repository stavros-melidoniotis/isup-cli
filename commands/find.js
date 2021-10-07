const fs = require('fs')

const { logGeneric, logError, logSuccess, logWarning } = require('../helpers/loggers')

function find({file, url}) {
    try {
        var rawData = fs.readFileSync(file)
    } catch (err) {
        logError(`${err.code} - ${err.path}`)
        return;
    }

    let websites = JSON.parse(rawData)

    if (!websites) {
        logError('Incorrect JSON structure')
        return;
    }

    logGeneric(`---- Searching ${file} for url: ${url} ----\n`)

    let found = websites.find(website => website.url == url);

    (found) ? logSuccess(`Found`) : logWarning('Not found')
}

module.exports = find