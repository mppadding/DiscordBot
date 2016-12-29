var config =
{
    // Discord login token
    token: "<INSERT_TOKEN_HERE>",
    
    // Commands are prepended with this token
    command_token: "!",
    
    // Method of logging
    // logging: "console",
    // logging: "file",
    logging: "console",
    
    // Where should we log our data to? If it contains '<>', a new log will be created every day
    // log_file: "log<>.txt"
    log_file: "log.txt",
    
    // Language file to use
    language: require('../Lang/English.lang.js'),
    
    // Maximum entries in the help command
    help_max_entries: 10,
    
    // Maximum entries in the emoji list command
    emoji_max_entries: 10,
    
    // Maximum number of characters to display in the emoji list command, if exceeds shows "too long"
    emoji_max_characters: 50,
}

module.exports = config;