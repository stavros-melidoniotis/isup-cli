const fs = require('fs')
const axios = require('axios')

const { logGeneric, logError, logResult } = require('../helpers/loggers')

function check({timeout, file}) {
    try {
        var rawData = fs.readFileSync(file)
    } catch (err) {
        logError(`ERROR: ${err.code} - ${err.path}`)
        return;
    }

    let websites = JSON.parse(rawData)

    if (!websites) {
        logError('ERROR: Incorrect JSON structure')
        return;
    }

    logGeneric(`----- Starting isup command. (File: ${file}, Timeout: ${timeout}ms) -----\n`)

    websites.forEach(website => {
        if (!website.url || !website.nicename) return

        let keywords = (website.keywords) ? website.keywords : []
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
                let response = await axios.get(website.url, { timeout: timeout });

                to_log.status = 'OK'
                to_log.response = response
                logResult(to_log);
            } catch (err) {
                // console.log(err)

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

module.exports = check