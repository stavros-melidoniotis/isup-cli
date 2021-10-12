const inquirer = require('inquirer')

const { logError, logSuccess } = require('../helpers/loggers')
const { readFile, parseJSON, isJSONFile, isEmpty, writeToFile } = require('../helpers/files')

function rmKeywords({file, keywords}) {

    if (!isJSONFile(file)) {
        logError(`File "${file}" isn't a JSON file!`)
        return
    }

    (async () => {
        let answer = await inquirer.prompt([{
            type: "confirm",
            name: "continueDeletion",
            message: `This is an irreversible action. Are you sure you want to proceed?`
        }])

        if (answer.continueDeletion) {
            let rawData = readFile(file)
            let websites = parseJSON(file, rawData)

            if (isEmpty(websites)) {
                logError(`File "${file}" contains no websites to check!`)
                return
            }

            keywords = keywords.split(" ")

            // Splitting keywords based on space (" ") may result to some empty values 
            // e.g. if the user adds many spaces between the keywords
            keywords = removeEmptiesFromArray(keywords)

            let cleanedWebsites = removeEntriesWithKeywords(websites, keywords)
            let entriesAffected = websites.length - cleanedWebsites.length

            if (entriesAffected !== 0)
                writeToFile(file, cleanedWebsites)

            logSuccess(`${websites.length - cleanedWebsites.length} entries removed from "${file}"`)
        }

        return
    })()
}

function removeEmptiesFromArray(array) {
    return array.filter(value => value !== "")
}

function removeEntriesWithKeywords(array, keywords) {
    return array.filter(element => element.keywords.every(element => !keywords.includes(element)))
}

module.exports = rmKeywords