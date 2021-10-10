const inquirer = require('inquirer')

// helper functions
const { logMessage, logError, logSuccess, logWarning } = require('../helpers/loggers')
const { readFile, parseJSON, isJSONFile, isEmpty, writeToFile } = require('../helpers/files')
const { checkIfEmpty, checkIfEmptyAndValidUrl, isCommaSeparated } = require('../helpers/prompt-validators')

const FOR_URL = 0
const FOR_NAME = 1
const FOR_KEYWORDS = 2

const questions = [
    {
        type: "input",
        name: "url",
        message: "Website url (e.g. https://google.com):",
        validate: checkIfEmptyAndValidUrl
    },
    {
        type: "input",
        name: "name",
        message: "Website name (can be anything you like, short and simple suggested):",
        validate: checkIfEmpty
    },
    {
        type: "input",
        name: "keywords",
        message: "Keywords: (Comma separated, Optional)",
        validate: isCommaSeparated
    }
];

function add({file}) {

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

    logMessage('Please provide the following information: (Ctrl/CMD + C at anytime to cancel)\n');

    (async () => {
        const answerForURL = await inquirer.prompt([questions[FOR_URL]]);
        const {url} = answerForURL

        if (websiteAlreadyExists(websites, url)) {
            logWarning(`Item ${url} already in list! Skipping...`)
            return
        }

        const answerForName = await inquirer.prompt([questions[FOR_NAME]]);
        const {name} = answerForName

        const answerForKeywords = await inquirer.prompt([questions[FOR_KEYWORDS]]);
        let {keywords} = answerForKeywords

        keywords = keywords
                    .trim() // remove whitespace from start and end
                    .replace(/ /g, '') // remove all spaces
                    .split(',') // split by comma


        websites.push({
            "nicename": name, 
            "url": url, 
            "keywords": keywords.filter(value => value !== "")
        })

        await writeToFile(file, websites);
        logSuccess(`Website "${name}" added to "${file}"!`)
    })()
}

function websiteAlreadyExists(websites, url) {
    return websites.find(website => website.url == url)
}

module.exports = add