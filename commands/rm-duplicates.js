const inquirer = require('inquirer')

const { logError, logSuccess } = require('../helpers/loggers')
const { readFile, parseJSON, isJSONFile, isEmpty, writeToFile } = require('../helpers/files')

function rmDuplicates({file}) {

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

            const removeDuplicatesFromJSON = (array, property) => array.reduce((accumulator, currentValue) => {
                if (!accumulator.find(obj => obj[property] === currentValue[property])) {
                    accumulator.push(currentValue)
                }

                return accumulator
            }, [])
        

            let uniqueWebsites = removeDuplicatesFromJSON(websites, 'url')
            let entriesAffected = websites.length - uniqueWebsites.length

            if (entriesAffected !== 0)
                writeToFile(file, uniqueWebsites)

            logSuccess(`${websites.length - uniqueWebsites.length} duplicates removed from "${file}"`)
        }

        return
    })()
}

module.exports = rmDuplicates