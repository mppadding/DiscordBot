"use strict";

var Command = require('./Command.js')

class Help extends Command {
    constructor(Bot) {
        super(Bot, 'help')
    }
    
    execute(message, args) {
        var Config = this.bot.config
        if(args.length == 1) {
            var commands = this.bot.getCommands()
            var keys = Object.keys(commands)
            var length = keys.length
            var reply = "\n**Help page 1 out of " + Math.ceil(length / Config.help_max_entries) + "**\n```"
            
            if(length > Config.help_max_entries)
                length = Config.help_max_entries
            
            /* Sort keys */
            keys.sort();
            
            for (var x = 0; x < length; x++) {
              var key = keys[x];
              
              /* If help is undefined, don't index it */
              if(commands[key].help == undefined)
                continue;
              
              reply += Config.command_token + key + ": " + commands[key].help.short
              
              if(x < length - 1)
                reply += '\n'
            }
            
            reply += '```'
            
            message.reply(reply)
        } else if(args.length == 2) {
            if(isNaN(args[1])) {
                var command = this.bot.getCommand(args[1])
                
                if(command == undefined || command.help == undefined)
                    message.reply(Config.language.command_not_found.replace('{command}', args[1]))
                else {
                    var help = command.help
                    message.reply('\n'
                        + Config.language.help_header.replace('{command}', Config.command_token + args[1]) + '\n'
                        + Config.language.help_description.replace('{description}', help.description) + '\n'
                        + Config.language.help_usage.replace('{usage}', Config.command_token + help.usage)
                    )
                }
            } else {
                var commands = this.bot.getCommands()
                var keys = Object.keys(commands)
                var maxpages = Math.ceil(keys.length / Config.help_max_entries)
                var page = parseInt(args[1])
                
                if(page > maxpages)
                    page = maxpages
                
                var reply = "\n**Help page " + page + " out of " + maxpages + "**\n```"
                
                /* Sort keys */
                keys.sort();
                keys = keys.slice(Config.help_max_entries * (page - 1))
                
                var length = keys.length
                
                if(length > Config.help_max_entries)
                    length = Config.help_max_entries
                
                for (var x = 0; x < length; x++) {
                  var key = keys[x];
                  
                  /* If help is undefined, don't index it */
                  if(commands[key].help == undefined)
                    continue;
                  
                  reply += Config.command_token + key + ": " + commands[key].help.short
                  
                  if(x < length - 1)
                    reply += '\n'
                }
                
                reply += '```'
                
                message.reply(reply)
            }
        } else {
            message.reply(
                Config.language.command_invalid_arguments
                .replace('{command}', Config.command_token + 'help')
                .replace('{arguments}', '0-1'))
        }
    }
    
    get help() {
        return {
           usage: 'help [command/page]',
           short: 'Shows help for command',
           description: 'Shows help for all commands if [command] is not supplied. \nShows help for specific command if [command] is supplied.'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = Help