# isup-cli
A cli tool to quickly test whether websites are up and running. Works with `Windows`, `Mac` and `Linux`.

# Installation
Download the project locally and run `npm install -g` from inside the project's directory. 
You need to have Node.js installed (Download [here](https://nodejs.org/en/download/)).

# Usage
```
$ isup [options] [command]

Options:
  -h, --help               display help for command

Commands:
  check [options]          Checks website(s) status
  make-json [options]      Creates a "websites-sample.json" file with the
                           correct layout that other commands can use
  find [options]           Checks if a website is already inside the JSON file.
  add [options]            Add a new website inside the JSON file.
  rm-duplicates [options]  Removes duplicate entries from the JSON file.
  rm-keywords [options]    Removes all websites with specified keywords from
                           the JSON file.
  help [command]           display help for command
```

The JSON file must follow the structure below:
```
[
   {
     "nicename": "Google",
     "url": "https://google.com",
     "keywords": ["List", "of", "keywords"]
   },
   ...
]
```

# Examples

## Check the status of all the websites inside a .json file

``` 
$ isup check --file path/to/file 
```

![](https://i.imgur.com/I8JoQMf.png)

Options:
- `-t, --timeout <timeout>`: Specify another timeout value in ms (Default: 5000)
- `--filter <keywords>`: Check only the websites that match the provided keywords


## Add a new website inside the .json file

``` 
$ isup add --file path/to/file 
```

![](https://i.imgur.com/nrlowWU.png)


## Find if a website exists inside the .json file

``` 
$ isup find --file path/to/file --url <url to search>
```

![](https://i.imgur.com/MthoLOT.png)


## Create a sample .json file

``` 
$ isup make-json
```

![](https://i.imgur.com/9skSvBW.png)

Options:
- `-o, --output <path>`: Specify where the .json will be saved (Default: Directory of the isup command)


## Remove all duplicates from inside the .json file

``` 
$ isup rm-duplicates --file path/to/file
```

![](https://i.imgur.com/jljtKW2.png)


## Remove all websites with specific keywords from inside the .json file

``` 
$ isup rm-keywords --file path/to/file -k <keywords>
```

![](https://i.imgur.com/KUVnVme.png)

# Under the hood
- [Commander.js](https://www.npmjs.com/package/commander) - The complete solution for node.js command-line interfaces.
- [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling done right
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [Inquirer.js](https://www.npmjs.com/package/inquirer) - A collection of common interactive command line user interfaces.
