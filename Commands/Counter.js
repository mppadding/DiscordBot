"use strict";

var Command = require('./Command.js')
var request = require('request');

var alias = {
    'mundo': 'drmundo',
    'kench': 'tahmkench',
    'tahm': 'tahmkench',
    'aurelion': 'aurelionsol',
    'liss': 'lissandra',
    'heca': 'hecarim',
    'sej': 'sejuani',
    'wu': 'wukong',
    'morde': 'mordekaiser',
    'luc': 'lucian',
    'kha': 'khazix',
    'naut': 'nautilus',
    'vik': 'viktor',
    'voli': 'volibear',
    'shyv': 'shyvana',
    'xer': 'xerath',
    'ori': 'orianna',
    'leo': 'leona',
    'lee': 'leesin',
    'noc': 'nocturne',
    'jarvan': 'jarvaniv',
    'j4': 'jarvaniv',
    'cait': 'caitlyn',
    'cass': 'cassiopeia',
    'lb': 'leblanc',
    'ali': 'alistar',
    'blitz': 'blitzcrank',
    'cho': 'chogath',
    'eve': 'evelynn',
    'ez': 'ezreal',
    'fiddle': 'fiddlesticks',
    'gp': 'gangplank',
    'heimer': 'heimerdinger',
    'kass': 'kassadin',
    'kog': 'kogmaw',
    'malp': 'malphite',
    'malz': 'malzahar',
    'yi': 'masteryi',
    'mf': 'missfortune',
    'morg': 'morgana',
    'nid': 'nidalee',
    'panth': 'pantheon',
    'tris': 'tristana',
    'tryn': 'tryndamere',
    'tf': 'twistedfate',
    'vei': 'veigar',
    'vlad': 'vladimir',
    'ww': 'warwick',
    'xin': 'xinzhao',
    'kata': 'katarina',
}

class Counter extends Command {
    constructor(Bot) {
        super(Bot, 'counter')
    }
    
    execute(message, args) {
        var Config = this.bot.config
        if(args.length < 2) {
            Config.language.command_invalid_arguments.replace('{command}', 'counter').replace('atleast 1')
        } else {
            var champion = args.slice(1).join('')
            
            if(alias[champion] != undefined)
                champion = alias[champion]
            
            request('http://api.championselect.net/champion/' + champion + '/matchups?limit=10&orderBy=score&order=-1&page=1', function (error, response, body) {
              if (!error && response.statusCode == 200) {
                var json = JSON.parse(body)
                
                var counters = []
                var strong = []
                
                /* Loop over all weak picks, only add 5 and dont add duplicates */
                json['counter']['data'].some(function(item) {
                    var champ = item['matchupChampKey'];
                    champ = champ[0].toUpperCase() + champ.slice(1);
                    
                    if(counters.indexOf(champ) === -1)
                      counters.push(champ);
                    
                    return counters.length === 5;
                });
                
                /* Loop over all strong picks, only add 5 and dont add duplicates */
                json['strongpick']['data'].some(function(item) {
                    var champ = item['matchupChampKey'];
                    champ = champ[0].toUpperCase() + champ.slice(1);
                    
                    if(strong.indexOf(champ) === -1)
                      strong.push(champ);
                    
                    return strong.length === 5;
                });
                
                counters = counters.join(', ');
                strong = strong.join(', ');
                
                /* Capitalize champion name */
                champion = champion.charAt(0).toUpperCase() + champion.slice(1);

                message.reply('\n'
                    + Config.language.counter_weak_against.replace('{champion}', champion)
                      .replace('{weak}', counters) + '\n'
                    + Config.language.counter_strong_against.replace('{champion}', champion)
                      .replace('{strong}', strong))
              }
            })
        }
    }
    
    get help() {
        return {
           usage: 'counter <champion>',
           short: 'Shows champions counter',
           description: 'Shows champions counter'
        }
    }
    
    get permissions() {
        return ['@everyone']
    }
    
    get channels() {
        return 'CHANNELS:3'
    }
}

module.exports = Counter