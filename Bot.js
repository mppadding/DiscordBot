const Discord = require('discord.js')
const Events = require('./Constants/Events.js')
const Logger = require('./Logger.js')

/* Bot class */
class Bot {
    /*
    * @param {Object} [config] Configuration file for the bot
    */
    constructor(Config) {
        this.config = Config
        
        /* Setup our commands */
        this.commands = {}
        
        /* Copy our logger */
        this.logger = Logger;
        
        this.logger.debug('==== Initializing Bot ====')
        
        /* Setup our event handlers */
        this.eventHandlers = {}
        
        /* Create a new discord client */
        this.bot = new Discord.Client();
        
        /* Login our bot to discord */
        this.bot.login(this.config.token);
    }
    
    getConfig() {
        return this.config
    }
    
    callEvent(event, args) {
        if(Array.isArray(this.eventHandlers[event])) {
            for(var x = 0; x < this.eventHandlers[event].length; x++) {
                this.eventHandlers[event][x](args)
            }
        }
    }
    
    sendMessage(channel, message, tts) {
        if(tts == true)
            return this.bot.channels.get(channel).sendMessage(message, { tts:"true" });
        else
            return this.bot.channels.get(channel).sendMessage(message);
    }
    
    addEventHandler(event, callback) {
        if(Array.isArray(this.eventHandlers[event]))
            this.eventHandlers[event].push(callback)
        else
            this.eventHandlers[event] = [callback]
    }
    
    addCommand(usage, command) {
        this.commands[usage] = command;
    }
    
    getCommands() {
        return this.commands
    }
    
    getCommand(command) {
        return this.commands[command]
    }
    
    handleCommand(message) {
        var args = message.content.split(' ')
        
        this.logger.debug('Handling command ' + args[0])
        
        if(this.commands[args[0]] == undefined) {
            //message.reply(this.config.language.command_not_found.replace('{command}', args[0]))
        } else {
            /* Command to run */
            var command = this.commands[args[0]]
            
            /* Does the user have permission */
            var perm = false
            
            /* List of permissions for this command */
            var permissions = command.permissions
            
            /* Make sure this command is sent in a guild channel */
            if(message.member != null) {
                /* Loop over every role from this member */
                message.member.roles.every(function(key) {
                    /* Does the user have permissions? */
                    if(permissions.indexOf(key.name) != -1 || key.name == 'Admin') {
                        perm = true;
                    }
                        
                    return true;
                })
            }
            
            if(perm)
                command.execute(message, args)
            else
                message.reply(this.config.language.command_no_permissions)
        }
    }
    
    initBaseEventHandlers() {
        /* Handle on ready event */
        this.bot.on('ready', () => {
            Logger.debug('==== Bot Initialized ====')
            if(!this.ready_once) this.ready_once = true;
            
            this.callEvent(Events.BotReady, this.ready_once)
        });
        
        /* Handle debug event */
        this.bot.on('debug', debug => {
            this.callEvent(Events.BotDebug, debug)
        });
        
        /* Handle disconnect event */
        this.bot.on('disconnect', () => {
            this.callEvent(Events.BotDisconnect)
        });
        
        /* Handle on error event */
        this.bot.on('error', error => {
            this.callEvent(Events.BotError, error)
        });
        
        /* Handle reconnecting event */
        this.bot.on('reconnecting', () => {
            this.callEvent(Events.BotReconnecting)
        });
        
        /* Handle on warning event */
        this.bot.on('warn', warning => {
            this.callEvent(Events.BotWarning, warning)
        });
        
        /* Handle message events */
        this.bot.on('message', message => {
            this.callEvent(Events.Message, message)
            
            /* Check if the message is a command, if it is, remove the command_token
               And handle the command */
            if(message.content.startsWith(this.config.command_token)) {
                var mess = message
                mess.content = mess.content.slice(this.config.command_token.length)
                this.handleCommand(mess)
                this.callEvent(Events.Command, mess)
            }
        });

    }
    
    getBot() {
        return this.bot
    }
}

module.exports = Bot;