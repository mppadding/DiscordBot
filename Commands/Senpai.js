"use strict";

var Command = require('./Command.js')

class Senpai extends Command {
    constructor(Bot) {
        super(Bot, 'senpai')
    }
    
    execute(message, args) {
        message.reply('I NOTICED YOU, KOHAI!')
    }
    
    get help() {
        return {
           usage: 'senpai',
           short: 'SENPAI NOTICE ME',
           description: 'SENPAI NOTICE ME'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
    
    get channels() {
        return 'CHANNELS:3'
    }
}

module.exports = Senpai