const fs = require('fs')
const path = require('path')

const { logError } = require('./loggers')

exports.readFile = (file) => {
    try {
        let data = fs.readFileSync(file)
        return data
    } catch (err) {
        logError(`${err.code} - ${err.path}`)
        exit(0)
    }
}

exports.parseJSON = (file, data) => {
    try {
        let websites = JSON.parse(data)
        return websites
    } catch (err) {
        logError(`Error while parsing file "${file}"!`)
        exit(0)
    }
}

exports.isJSONFile = (file) => {
    return path.extname(file) === '.json'
}

exports.isEmpty = (data) => {
    return data.length === 0
}

exports.writeToFile = async (file, content) => {
    await fs.writeFile(file, JSON.stringify(content), err => {
        if (err) {
            logError(`Couldn't write to file "${file}"`)
            exit(0)
        }
    })
}

exports.isDirectory = (path) => {
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory()
}

function exit(code) {
    process.exit(code)
}