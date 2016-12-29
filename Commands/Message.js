"use strict";

var Command = require('./Command.js')
var Channels = require('../Constants/Channels.js')

class Message extends Command {
    constructor(Bot) {
        super(Bot, 'message')
    }
    
    execute(message, args) {
        if(args.length < 3) {
            message.reply(this.bot.config.language.command_invalid_arguments.replace('{command}', 'message').replace('{arguments}', 'atleast 2'))
        } else {
            var mess = args.slice(2)
            var channel = args[1]
            
            if(Channels[channel] == undefined) {
                message.reply(this.bot.config.language.channel_not_found.replace('{channel}', channel))
            } else {
                this.bot.sendMessage(Channels[channel], mess.join(' '))
            }
        }
    }
    
    get help() {
        return {
           usage: 'message <channel> <message>',
           short: 'Sends a message to <channel>',
           description: 'Sends a message to <channel>. <channel> is defined in /bot/Constants/Channels.js; These words map to a channel.'
        }
    }
    
    get permissions() {
        return ['Admin']
    }
}

module.exports = Message