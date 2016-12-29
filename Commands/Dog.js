"use strict";

var Command = require('./Command.js')
var request = require('request');

class Dog extends Command {
    constructor(Bot) {
        super(Bot, 'dog')
    }
    
    execute(message, args) {
        var sent = undefined
        var Config = this.bot.config
        message.reply(Config.language.image_loading).then(msg => sent = msg)
        
        request('https://reddit.com/r/dogpictures/random/.json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                if(sent == undefined)
                    message.reply(json[0].data.children[0].data.preview.images[0].source.url)
                else
                    sent.edit(json[0].data.children[0].data.preview.images[0].source.url); 
            } else {
                if(sent == undefined)
                    message.reply(Config.language.error_occured)
                else
                    sent.edit(Config.language.error_occured)
            }
        })
    }
    
    get help() {
        return {
           usage: 'dog',
           short: 'Dem dogs',
           description: 'Shows random picture of dogs'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = Dog