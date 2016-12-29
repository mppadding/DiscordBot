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
    
    get channels() {
        return 'CHANNELS:3'
    }
}

module.exports = Ping