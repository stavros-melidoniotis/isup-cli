const path = require('path')

const { logError, logSuccess } = require('../helpers/loggers')
const { isDirectory, writeToFile } = require('../helpers/files')

function makeJson({output}) {
    output = output || path.join(__dirname, '..')

    if (!isDirectory(output)) {
        logError(`"${output}" isn't a directory!`)
        return
    }

    let filename = 'websites-sample.json'
    let sampleWebsites = [
        {
            "nicename": "Facebook",
            "url": "https://www.facebook.com",
            "keywords": ["Social"]
        },
        {
            "nicename": "Amazon",
            "url": "https://www.amazon.com",
            "keywords": ["DEV"]
        }
    ];

    output = path.join(output, filename);

    writeToFile(output, sampleWebsites)

    logSuccess(`JSON created at "${output}!"`)
}

module.exports = makeJson