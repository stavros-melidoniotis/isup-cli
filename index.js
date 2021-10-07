#! /usr/bin/env node

const { program } = require('commander')

// commmands
const check = require('./commands/check')
const find = require('./commands/find')
const add = require('./commands/add')


/**
 * TODOs
 * 
 * 1) check cmd: filter by keywords
 * 2) rm cmd: implement cmd that deletes single entry or all entries with keyword
 * 3) rm duplicates cmd: remove all duplicates from list
 * 
 */



program
    .command('check')
    .description('Checks website(s) status')
    .option('-t, --timeout <timeout>', 'Timeout value in ms.', '5000')
    .requiredOption('--file <filepath>', 'The json file path containing the websites to check.')
    .action(check)

program
    .command('find')
    .description('Checks if a website is already inside the JSON list.')
    .requiredOption('--file <filepath>', 'The json file path containing the websites to check.')
    .requiredOption('--url <url>', 'The url of the website to search for.')
    .action(find)

program
    .command('add')
    .description('Add a new website inside the JSON list.')
    .requiredOption('--file <filepath>', 'The json file path containing the websites.')
    .action(add)

program.parse()