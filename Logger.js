const Config = require('./config.js')
var fs = require('fs');

function init() {
    /* Make sure a known logging method is defined in the config */
    if(!(Config.logging == 'file' || Config.logging == 'console' || Config.logging == 'both'))
        throw new Error('Unknown logging method in config. Method: ' + "'" + Config.logging + "'");
    
    /* Check if we want a variable log file or a standard one */
    if(Config.logging == 'file' || Config.logging == 'both') {
        if(Config.log_file.indexOf('<>') == -1) {
            logger.file = Config.log_file
        } else {
            var date = new Date();
            logger.file = Config.log_file.replace('<>', date.getFullYear() + date.getMonth() + date.getDate())
        }
    }
}

var logger = {
    /* File to write the log to */
    file: '',
    
    /* Returns a timestamp with format [HH:MM] */
    getTimeStamp: function() {
        var date = new Date()
        
        var hours = date.getHours()
        if(hours < 10) hours = '0' + hours
        
        var mins = date.getMinutes()
        if(mins < 10) mins = '0' + mins
        
        return '['+ hours + ':' + mins + ']'
    },
    
    /* Write a message to the log */
    write: function(message) {
        if(Config.logging == 'console') {
            console.log(message)
        } else if(Config.logging == 'file') {
            fs.appendFile(this.file, message + '\n', function (err) {
                console.log(err);
            });
        } else if(Config.logging == 'both') {
            console.log(message)
            fs.appendFile(this.file, message + '\n', function (err) {
                if(err != null)
                    console.log(err);
            });
        }
    },
    
    debug: function(message) {
        var mess = this.getTimeStamp() + ' DEBUG: ' + message
        this.write(mess)
    }
}

init()

module.exports = logger