const axios = require('axios')
const https = require('https')

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
});

const { logMessage, logError, logResult } = require('../helpers/loggers')
const { readFile, parseJSON, isJSONFile, isEmpty } = require('../helpers/files')

function check({timeout, file, filter}) {

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

    if (filter) {
        let filteredWebsites = [];
        let keywords = filter.split(" ");

        // Splitting keywords based on space (" ") may result to some empty values 
        // e.g. if the user adds many spaces between the keywords
        keywords = removeEmptiesFromArray(keywords)

        websites.forEach(website => {
            let websiteKeywords = website.keywords;

            if (haveCommonKeywords(websiteKeywords, keywords))
                filteredWebsites.push(website)
        })

        if (isEmpty(filteredWebsites)) {
            logError(`Didn't find any websites with keywords [${keywords}]`)
            return
        }

        websites = Array.from(filteredWebsites)
    }

    logMessage(`----- Starting isup command. (File: ${file}, Timeout: ${timeout}ms) -----\n`)

    websites.forEach(website => {
        if (!website.url || !website.nicename) return

        let keywords = website.keywords || []
        let editedKeywords = keywords.map(keyword => `[${keyword}]`)

        editedKeywords = editedKeywords.join('');

        // JSON containing all required info for the logging process
        let to_log = {
            "status": "",
            "name": website.nicename,
            "url": website.url,
            "keywords": editedKeywords,
            "response": ""
        };

        (async () => {
            try {
                let response = await axiosInstance.get(website.url, { timeout: timeout });

                to_log.status = 'OK'
                to_log.response = response
                logResult(to_log);
            } catch (err) {
                switch (err.code) {
                    case 'ECONNABORTED':
                        to_log.status = 'TIMEOUT'
                        logResult(to_log)
                        break
                    case 'ENOTFOUND':
                        to_log.status = 'NOT_FOUND'
                        logResult(to_log)
                        break
                    case 'ECONNREFUSED':
                        to_log.status = 'CONN_REFUSED'
                        logResult(to_log)
                        break
                    default:
                        to_log.status = 'DOWN'
                        to_log.response = err
                        logResult(to_log)
                }
            }
        })();
    })
}

function removeEmptiesFromArray(array) {
    return array.filter(value => value !== "")
}

function haveCommonKeywords(websiteKeywords, filterKeywords) {
    return websiteKeywords.some(keyword => filterKeywords.includes(keyword))
}

module.exports = check