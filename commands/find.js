// helpers
const { logMessage, logError, logSuccess, logWarning } = require('../helpers/loggers')
const { readFile, parseJSON, isJSONFile, isEmpty } = require('../helpers/files')

function find({file, url}) {

    if (!isJSONFile(file)) {
        logError(`File "${file}" isn't a JSON file!`)
        return
    }

    let rawData = readFile(file)
    let websites = parseJSON(file, rawData)

    if (isEmpty(websites)) {
        logError(`File "${file}" contains no websites to check!`)
        return
    }

    logMessage(`---- Searching ${file} for url: ${url} ----\n`)

    let found = websites.find(website => website.url == url);

    (found) ? logSuccess(`Found`) : logWarning('Not found')
}

module.exports = find