#! /usr/bin/env node

const { program } = require('commander')

// commmands
const check = require('./commands/check')
const find = require('./commands/find')
const add = require('./commands/add')
const makeJson = require('./commands/make-json')
const rmDuplicates = require('./commands/rm-duplicates')
const rmKeywords = require('./commands/rm-keywords')

// isup check
program
    .command('check')
    .description('Checks website(s) status')
    .option('-t, --timeout <timeout>', 'Timeout value in ms.', '5000')
    .option('--filter <keywords>', 'Filter websites by keywords (e.g. "Dev, Client")')
    .requiredOption('--file <filepath>', 'The JSON file containing the websites to check.')
    .action(check)

// isup make-json
program
    .command('make-json')
    .description('Creates a "websites-sample.json" file with the correct layout that other commands can use')
    .option('-o, --output <path>', 'Where to save the JSON file')
    .action(makeJson)

// isup find
program
    .command('find')
    .description('Checks if a website is already inside the JSON file.')
    .requiredOption('--file <filepath>', 'The JSON file to check.')
    .requiredOption('--url <url>', 'The url of the website to search for.')
    .action(find)

// isup add
program
    .command('add')
    .description('Add a new website inside the JSON file.')
    .requiredOption('--file <filepath>', 'The JSON file to save the website.')
    .action(add)

// isup rm-duplicates
program
    .command('rm-duplicates')
    .description('Removes duplicate entries from the JSON file.')
    .requiredOption('--file <filepath>', 'The JSON file to search for duplicates.')
    .action(rmDuplicates)

// isup rm-keywords
program
    .command('rm-keywords')
    .description('Removes all websites with specified keywords from the JSON file.')
    .requiredOption('--file <filepath>', 'The JSON file containing the websites.')
    .requiredOption('-k, --keywords <keywords>', 'The keywords to remove.')
    .action(rmKeywords)

program.parse()