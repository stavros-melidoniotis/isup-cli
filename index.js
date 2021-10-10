#! /usr/bin/env node

const { program } = require('commander')

// commmands
const check = require('./commands/check')
const find = require('./commands/find')
const add = require('./commands/add')
const makeJson = require('./commands/make-json')


/**
 * TODOs
 * 
 * 2) rm cmd: implement cmd that deletes single entry or all entries with keyword
 * 3) rm duplicates cmd: remove all duplicates from list
 * 
 */


// isup check
program
    .command('check')
    .description('Checks website(s) status')
    .option('-t, --timeout <timeout>', 'Timeout value in ms.', '5000')
    .option('--filter <keywords>', 'Filter websites by keywords (e.g. "Dev, Client")')
    .requiredOption('--file <filepath>', 'The json file path containing the websites to check.')
    .action(check)

// isup make-json
program
    .command('make-json')
    .description('Creates a sample "websites.json" file with the correct layout that other commands can use')
    .option('-o, --output <path>', 'Where to save the JSON file')
    .action(makeJson)

// isup find
program
    .command('find')
    .description('Checks if a website is already inside the JSON list.')
    .requiredOption('--file <filepath>', 'The json file path containing the websites to check.')
    .requiredOption('--url <url>', 'The url of the website to search for.')
    .action(find)

// isup add
program
    .command('add')
    .description('Add a new website inside the JSON list.')
    .requiredOption('--file <filepath>', 'The json file path containing the websites.')
    .action(add)


program.parse()