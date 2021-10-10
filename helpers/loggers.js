const chalk = require('chalk')

const OK_ICON = '✅'
const DOWN_ICON = '❌'
const TIMEOUT_ICON = '⌛'
const WARNING_ICON = '⚠️'

exports.logMessage = function (message) {
    return console.log(chalk.magenta.bold(message))
}

exports.logError = function (message) {
    return console.log(chalk.red.bold(`isup-error: ${message} ${DOWN_ICON}`))
}

exports.logSuccess = function (message) {
    return console.log(chalk.green.bold(`isup-success: ${message} ${OK_ICON}`))
}

exports.logWarning = function (message) {
    return console.log(chalk.yellow.bold(`isup-warn: ${message} ${WARNING_ICON}`))
}

exports.logResult = function (result) {
    let baseConsoleLog = `${chalk.magenta(result.keywords)} ${chalk.cyan.bold(result.name)} ${chalk.cyan.dim("("+result.url+")")} ==> `;

    switch (result.status) {
        case 'OK':
            console.log(baseConsoleLog, chalk.green.bold(`UP (${result.response.status} ${result.response.statusText}) ${OK_ICON}`))
            break
        case 'DOWN':
            let res = result.response.request.res
            console.log(baseConsoleLog, chalk.red.bold(`DOWN (${res.statusCode} ${res.statusMessage}) ${DOWN_ICON}`))
            break
        case 'TIMEOUT':
            console.log(baseConsoleLog, chalk.yellow.bold(`TIMEOUT ${TIMEOUT_ICON}`))
            break
        case 'NOT_FOUND':
            console.log(baseConsoleLog, chalk.red.bold(`NOT FOUND ${DOWN_ICON}`))
            break
        case 'CONN_REFUSED':
        console.log(baseConsoleLog, chalk.red.bold(`CONNECTION REFUSED ${DOWN_ICON}`))
        break
    }

    return 
}
