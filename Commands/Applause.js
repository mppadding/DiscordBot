"use strict";

var Command = require('./Command.js')

class Applause extends Command {
    constructor(Bot) {
        super(Bot, 'applause')
    }
    
    execute(message, args) {
        message.reply('Clap clap clap')
    }
    
    get help() {
        return {
           usage: 'applause',
           short: 'Replies with clap clap clap',
           description: 'Replies with clap clap clap'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = Applause