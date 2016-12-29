"use strict";

var Command = require('./Command.js')
var request = require('request');

class Cat extends Command {
    constructor(Bot) {
        super(Bot, 'cat')
    }
    
    execute(message, args) {
        var bot = this.bot
        request('http://random.cat/meow', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                message.reply(json['file'])
            } else {
                message.reply(bot.getConfig().language.error_occured)
            }
        })
    }
    
    get help() {
        return {
           usage: 'cat',
           short: 'Dem catz',
           description: 'Shows random picture of cats'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
    
    get channels() {
        return 'CHANNELS:3'
    }
}

module.exports = Cat