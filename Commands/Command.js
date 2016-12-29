class Command {
    constructor(Bot, Usage) {
        this.bot = Bot;
        this.command = Usage
        
        this.bot.addCommand(this.command, this)
    }
    
    execute(message, args) {
        
    }
    
    get help() {
        
    }
    
    get permissions() {
        
    }
}

module.exports = Command