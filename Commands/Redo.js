"use strict";

var Command = require('./Command.js')
var Events = require('../Constants/Events.js')

class Redo extends Command {
    constructor(Bot) {
        super(Bot, 'redo')
        
        this.history = {}
        var self = this
        
        this.bot.addEventHandler(Events.Command, function(message) {
            if(message.content.startsWith('redo'))
                return
                
            self.history[message.author.id] = message.content
        })
    }
    
    execute(message, args) {
        var content = this.history[message.author.id]
        
        if(content == undefined) {
            message.reply('No command')
            return;
        }
        
        var mess = message
        
        mess.content = content
        
        this.bot.handleCommand(mess)
    }
    
    get help() {
        return {
           usage: 'redo',
           short: 'Redoes previous used command',
           description: 'Redoes previous used command'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = Redo