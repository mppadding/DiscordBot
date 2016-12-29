"use strict";

var Command = require('./Command.js')
var JsonDB = require('node-json-db');
var Database = undefined

class Emoji extends Command {
    constructor(Bot) {
        super(Bot, 'emoji')
        
        /* Setup our database */
        try {
          Database = new JsonDB("database/emoji", true, true);
        } catch(err) {
          console.log(err)
        }
    }
    
    execute(message, args) {
        if(args.length < 2)
            return
            
        var method = args[1].toLowerCase()
        var Config = this.bot.config
        
        if(method == 'add') {
            Database.push("/" + args[2], args.slice(3).join(' '));
            Database.save();
            
            message.reply(this.bot.config.language.emoji_saved.replace('{emoji}', args[2]))
        } else if(method == 'list') {
            var emoji = Database.getData('/')
            if(args.length == 2) {
                var keys = Object.keys(emoji)
                var length = keys.length
                var reply = "\n**Emoji page 1 out of " + Math.ceil(length / Config.emoji_max_entries) + "**\n```"
                
                if(length > Config.emoji_max_entries)
                    length = Config.emoji_max_entries
                
                /* Sort keys */
                keys.sort();
                
                for (var x = 0; x < length; x++) {
                  var key = keys[x];
                  
                  var val = emoji[key]
                  if(val.length > Config.emoji_max_characters)
                    val = 'too long'
                  
                  reply += Config.command_token + key + ": " + val
                  
                  if(x < length - 1)
                    reply += '\n'
                }
                
                reply += '```'
                
                message.reply(reply)
            } else if(args.length == 3) {
                var keys = Object.keys(emoji)
                var maxpages = Math.ceil(keys.length / Config.emoji_max_entries)
                var page = parseInt(args[2])
                var reply = "\n**Emoji page " + page + " out of " + maxpages + "**\n```"
                

                
                /* Sort keys */
                keys.sort();
                keys = keys.slice(Config.emoji_max_entries * (page - 1))
                
                var length = keys.length
                
                if(length > Config.emoji_max_entries)
                    length = Config.emoji_max_entries
                
                for (var x = 0; x < length; x++) {
                  var key = keys[x];
                  
                  var val = emoji[key]
                  if(val.length > Config.emoji_max_characters)
                    val = 'too long'
                  
                  reply += Config.command_token + key + ": " + val
                  
                  if(x < length - 1)
                    reply += '\n'
                }
                
                reply += '```'
                
                message.reply(reply)
            }
        } else {
            var e = []
            var names = args.slice(1)
            
            try {
              names.forEach( function(name) { 
                e.push(Database.getData('/' + name));
              });
              
            } catch(err) {
              return "No emoji found.";
            }
            
            message.reply(e.join(' '))
        }
    }
    
    get help() {
        return {
           usage: 'emoji <function> [args]',
           short: 'Handles emojis',
           description: 'Handles emojis.\n`emoji add <name> <emoji...>`: Adds emoji\n`emoji list`: Shows a list of emojis, unfinished.\n`emoji <emoji...>` Shows emoji <emoji>.\n'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = Emoji