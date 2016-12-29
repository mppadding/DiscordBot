/* List of command files to use */
var commands = [
    './Applause.js',
    './Cat.js',
    './Congrats.js',
    './Counter.js',
    './Disconnect.js',
    './Dog.js',
    './Doge.js',
    './Emoji.js',
    './Help.js',
    './Message.js',
    './MMR.js',
    './Ping.js',
    './Quote.js',
    './Redo.js',
    './Senpai.js',
    './TTS.js',
]

module.exports = function(Bot) {
    /* Debug information */
    Bot.logger.debug("Initializing " + commands.length + " commands")
    
    /* Loop over all commands */
    for(var x = 0; x < commands.length; x++) {
        /* Require and construct the command */
        var command = new (require(commands[x]))(Bot)
        
        /* Debug information */
        Bot.logger.debug("Initializing command " + command.command)
    }
}