const fs = require('fs')
const inquirer = require('inquirer')

const { logGeneric, logError, logSuccess, logWarning } = require('../helpers/loggers')
const { checkIfEmpty, isCommaSeparated } = require('../helpers/prompt-validators')

const FOR_URL = 0
const FOR_NAME = 1
const FOR_KEYWORDS = 2


// TODO: Add extra validations
const questions = [
    {
        type: "input",
        name: "url",
        message: "Website url (e.g. https://google.com):",
        validate: checkIfEmpty
        // TODO: url simple validation
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

    logGeneric('Please provide the following information: (Ctrl/⌘ + C at anytime to cancel)\n');

    (async () => {
        const answerForURL = await inquirer.prompt([questions[FOR_URL]]);
        const url = answerForURL.url

        if (websiteAlreadyExists(websites, url)) {
            logWarning(`Item ${url} already in list! Skipping...`)
            return
        }

        const answerForName = await inquirer.prompt([questions[FOR_NAME]]);
        const name = answerForName.name

        const answerForKeywords = await inquirer.prompt([questions[FOR_KEYWORDS]]);
        let keywords = answerForKeywords.keywords

        keywords = keywords
                    .trim() // remove whitespace from start and end
                    .replace(/ /g, '') // remove all spaces
                    .split(',') // split by comma


        // TODO: Handle empty keywords better
        websites.push({
            "nicename": name, 
            "url": url, 
            "keywords": (keywords) ? keywords : []
        })

        await writeToFile(file, websites);
        logSuccess(`Website ${name} added to ${file}!`)
    })()
}

async function writeToFile(file, content) {
    await fs.writeFile(file, JSON.stringify(content), err => {
        if (err) {
            console.error(err)
            return
        }
        
    })
}

function websiteAlreadyExists(websites, url) {
    return websites.find(website => website.url == url)
}

module.exports = add