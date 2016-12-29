"use strict";

var Command = require('./Command.js')
var JsonDB = require('node-json-db');
var Database = undefined

class Quote extends Command {
    constructor(Bot) {
        super(Bot, 'quote')
        
        /* Setup our database */
        try {
          Database = new JsonDB("database/quote", true, true);
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
            try {
              Database.push("/" + args[2] + '[]', args.slice(3).join(' '));
              Database.save();
            } catch(err) {
              console.log(err)
            }
            
            message.reply(this.bot.config.language.quote_saved.replace('{name}', args[2]))
        } else {
            var array = []
            try {
              array = Database.getData("/" + args[1]);
            } catch(error) {
              
            }
            
            if(array.length == 0)
                message.reply("No quote found for " + args[1]);
            else
                message.reply(args[1] + ': "' + array[Math.floor(Math.random() * array.length)] + '"')
        }
    }
    
    get help() {
        return {
           usage: 'quote <function> [args]',
           short: 'Handles quotes',
           description: 'Handles quotes.\n`quote add <name> <quote>`: Adds quote.\n`quote <name>` Shows random quote from <name>.\n'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = Quote