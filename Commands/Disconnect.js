var Command = require('./Command.js')

class Disconnect extends Command {
    constructor(Bot) {
        super(Bot, 'disconnect')
    }
    
    execute(message, args) {
        message.reply('Cya guys!').then(msg => msg.client.destroy())
    }
    
    get help() {
        return {
            usage: 'disconnect',
            short: 'Disconnects the bot',
            description: 'Disconnects the bot'
        }
    }
    
    get permissions() {
        return ['Admin']
    }
}

module.exports = Disconnect