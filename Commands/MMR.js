"use strict";

var Command = require('./Command.js')
var Channels = require('../Constants/Channels.js')
var request = require('request');
var striptags = require('striptags')

class MMR extends Command {
    constructor(Bot) {
        super(Bot, 'mmr')
    }
    
    execute(message, args) {
        var Config = this.bot.config
        var player = args.slice(1).join(' ')
        request('http://euw.op.gg/summoner/ajax/mmr/summonerName=' + player, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = striptags(body).trim()
                var mmr = body.slice(0, body.indexOf('\n'))
                
                message.reply(Config.language.mmr.replace('{player}', player).replace('{mmr}', mmr)); 
            } else {
                message.reply(Config.language.error_occured)
            }
        })
    }
    
    get help() {
        return {
           usage: '!mmr <player>',
           short: 'Shows <player>\'s MMR',
           description: 'Shows <player>\'s MMR'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
}

module.exports = MMR