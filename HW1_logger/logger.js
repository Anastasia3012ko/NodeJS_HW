const fs = require('fs').promises

async function logMessage (message) {
    try {
       const logMessage = `${message}\n`
       await fs.appendFile('log.txt', logMessage) 
       console.log('Message recorded in file')
    }catch(error) {
        console.error('Error writing to file: ', error)
    }

}

module.exports = logMessage