"use strict";

var Command = require('./Command.js')
var request = require('request');

class Doge extends Command {
    constructor(Bot) {
        super(Bot, 'doge')
    }
    
    execute(message, args) {
        var Config = this.bot.config
        message.reply(Config.language.image_loading).then(function(msg) {
            request('https://www.reddit.com/r/SuperShibe/random/.json', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(body);
                    
                    msg.edit(json[0].data.children[0].data.preview.images[0].source.url); 
                } else {
                    msg.edit(Config.language.error_occured)
                }
            })
        })
    }
    
    get help() {
        return {
           usage: 'doge',
           short: 'DOGE',
           description: 'DOGE'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
    
    get channels() {
        return 'CHANNELS:3'
    }
}

module.exports = Doge