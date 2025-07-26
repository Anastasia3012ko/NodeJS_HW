const logMessage = require('./logger'); 

(async () => {
  try {
    await logMessage('My first message to log file');
    await logMessage('My second message to log file');
    await logMessage('My third message to log file');
    await logMessage('My fourth message to log file');
  } catch (error) {
    console.error('Error while logging: ', error);
  }
})();
