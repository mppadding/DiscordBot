var Events = require('../Constants/Events.js')
var Config = require('./config.js')
var Channels = require('../Constants/Channels.js')
var Initialization = require('../Commands/Initialization.js')

/* Require and construct the bot using the given config file */
var bot = new (require('../Bot.js'))(Config);

/* Call the initialization method, this will initialize all commands and register
 * in the bot class */
Initialization(bot)

/* Send a help message on first connect */
bot.addEventHandler(Events.BotReady, function(first_time) {
    if(first_time)
        bot.sendMessage(Channels.general, 'Hello! The command token to use is ' + Config.command_token + '\nIf you need help, use `' + Config.command_token + 'help`')
})

/* Send a help message when asked for it */
bot.addEventHandler(Events.Message, function(msg) {
    if(msg.content.toLowerCase().startsWith('help me bot')) {
        msg.reply('\nHello! The command token to use is ' + Config.command_token + '\nIf you need help, use `' + Config.command_token + 'help`')
    }
})

/* Initialize the event handlers, to correctly pass events.
 * Do this last, because the ready event can call before it the event listener is
 * initialized */
bot.initBaseEventHandlers()