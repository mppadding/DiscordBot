# DiscordBot

DiscordBot is a framework for easily creating a discord bot. Internally it uses
[Discord.js](https://github.com/hydrabolt/discord.js) by [Hydrabolt](https://github.com/hydrabolt) and [Node.js](https://nodejs.org/en/).
DiscordBot is easy to use and easy to extend.

## Table of Contents
* [Install](#install)
* [Documentation](#documentation)
    * [Main File](#main-file)
    * [Event Handlers](#event-handlers)
    * [Commands](#commands)
    * [Permissions](#permissions)
    * [Language](#language)
* [Examples](#examples)
    * [Example Main](#example-main)
    * [Example Config](#example-config)
    * [Example Language](#example-language)
    * [Example Command](#example-command)

## Install
Installing DiscordBot is easy. Clone the repository using ```git clone https://github.com/pukkertje/DiscordBot.git```.
When cloning is finished, run ```install_dependencies.sh```, this will install all
required dependencies for DiscordBot. Now you're set to create new commands.

## Documentation
### Main file
To create a DiscordBot do the following:
```javascript
var Config = require('./config.js')

/* Require and construct the bot using the given config file */
var bot = new (require('./Bot.js'))(Config);

/* Initialize the event handlers, to correctly pass events.
 * Do this last, because the ready event can call before it the event listener is
 * initialized */
bot.initBaseEventHandlers()
```
This will create a basic bot without commands.
### Event Handlers
You can create event handlers by using ```addEventHandler(event, callback)```.
This requires a event and a callback function. The events are listed in ```./Constants/Events.js```
For example, to add a message handler to respond to "ping":
```javascript
bot.addEventHandler(Events.Message, function(msg) {
    if(msg.content.toLowerCase().startsWith('ping')) {
        msg.reply('Pong!');
    }
})
```

### Commands
To create commands, you need to create a new class which extends ```./Commands/Command.js```
In this class, call ```super(bot, usage)``` in the constructor, where usage is a string how to use it
such as 'help'.
The ```execute(message, args)``` will be called when someone has typed the command, message will contain
a instance of [Message](https://discord.js.org/#/docs/main/master/class/Message).
Args is a string array of supplied arguments, where args[0] equal to the command usage is.
The help function is called by the help command. It expects either undefined or a object containing the following (example):
```javascript
{
   usage: 'help [command/page]',
   short: 'Shows help for command',
   description: 'Shows help for all commands if [command] is not supplied. \nShows help for specific command if [command] is supplied.'
}
```
The usage is show in ```help``` and ```help <command>```. Short is used for the ```help```, this is a short description of the command.
Description is a full description of the command, it is shown when ```help <command>``` is called.

### Permissions
DiscordBot also supports permission based commands. Permissions are handled internally by DiscordBot
based on the ranks of users. To use permissions, use the ```get permissions()``` function. This needs to return an array of permissions.
To enable a command for all users, use ```['@everyone']```.
Example of permissions:
```javascript
...
get permissions() {
    return ['Admin']
}
...
```

### Language
This framework is not limited to English only. It uses a different javascript file to
have other languages. This file can be accessed by using ```Config.language```

To change this file, change ```language``` in the config file.
The language file is a object where key equals the translation, it uses parameters
for some commands. These parameters are in the form of ```{parameter}``` and should not be changed.

## Examples
In ```./examples``` is a example method of creating the bot. ```basic.js``` contains
the code to make the bot and ```config.js``` is the config file for said bot.

### Example Main
```javascript
/* To be run in './' */
var Events = require('./Constants/Events.js')
var Config = require('./config.js')
var Channels = require('./Constants/Channels.js')
var Initialization = require('./Commands/Initialization.js')

/* Require and construct the bot using the given config file */
var bot = new (require('./Bot.js'))(Config);

/* Call the initialization method, this will initialize all commands and register
 * in the bot class */
Initialization(bot)

/* Send a help message on first connect */
bot.addEventHandler(Events.BotReady, function(first_time) {
    if(first_time)
        bot.sendMessage(Channels.general, 'Hello! The command token to use is ' + Config.command_token + '\nIf you need help, use `' + Config.command_token + 'help`')
})

/* Send a help message when asked for it */
bot.addEventHandler(Events.Message, function(msg) {
    if(msg.content.toLowerCase().startsWith('help me bronzy')) {
        msg.reply('\nHello! The command token to use is ' + Config.command_token + '\nIf you need help, use `' + Config.command_token + 'help`')
    }
})

/* Initialize the event handlers, to correctly pass events.
 * Do this last, because the ready event can call before it the event listener is
 * initialized */
bot.initBaseEventHandlers()
```
### Example Config
```javascript
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
```
### Example Language
```javascript
var lang_en =
{
    /* Command language */
    command_not_found: "Command {command} not found.",
    command_no_permissions: "You do not have permissions to use this command",
    command_invalid_arguments: "Invalid amount of arguments. Command '{command}' requires {arguments} arguments",
    
    /* Help language */
    help_header: "Command: `{command}`",
    help_description: "Description: {description}",
    help_usage: "Usage: `{usage}`",
    
    channel_not_found: "Channel '{channel}' not found.",
    
    counter_weak_against: "{champion} is weak against {weak}",
    counter_strong_against: "{champion} is strong against {strong}",
    
    error_occured: "An error occured. Please try again later.",
    
    //image_loading: "https://media.giphy.com/media/xJCaPc70BUMgg/giphy.gif",
    image_loading: "https://s-media-cache-ak0.pinimg.com/originals/aa/51/bd/aa51bd72926e11f7006369f6d211a668.gif",
    
    mmr: "{player}'s MMR is {mmr}",
    
    emoji_saved: 'Emoji {emoji} saved.',
    quote_saved: 'Quote for {name} saved.'
}

module.exports = lang_en;
```
### Example Command
```javascript
"use strict";

var Command = require('./Command.js')

class Ping extends Command {
    constructor(Bot) {
        super(Bot, 'ping')
    }
    
    execute(message, args) {
        message.reply('Pong!')
    }
    
    get help() {
        return {
           usage: 'ping',
           short: 'Test command. Replies with pong',
           description: 'Test command. Replies with pong'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = Ping
```