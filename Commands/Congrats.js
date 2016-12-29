"use strict";

var Command = require('./Command.js')

class Congrats extends Command {
    constructor(Bot) {
        super(Bot, 'congrats')
    }
    
    execute(message, args) {
        message.reply('Congratu-fucking-lations')
    }
    
    get help() {
        return {
           usage: 'congrats',
           short: 'Replies with congratu-fucking-lations',
           description: 'Replies with congratu-fucking-lations.'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
    
    get channels() {
        return []
    }
}

module.exports = Congrats