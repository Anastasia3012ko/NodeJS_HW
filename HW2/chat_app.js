const EventEmitter = require('events')
const emitter = new EventEmitter()

function sendMessage(emitter, userName, userMessage) {
  emitter.emit('message', userName, userMessage)
}

emitter.on('message', (userName, userMessage) => {
  console.log(`${userName}: ${userMessage}`)
})

sendMessage(emitter, 'Anna', 'I work')
sendMessage(emitter, 'Ivan', 'I learn')
