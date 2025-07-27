const fs = require('fs')

fs.writeFile('info.txt', 'Node.js is awesome!', 'utf-8', err => {
    if(err) {
        console.log('Error writing file: ', err)
        return
    }
    console.log('File created and info recorded')
    fs.readFile('info.txt', 'utf-8', (err, data) => {
    if(err) {
        console.log('Error reading file: ', err)
        return
    }
    console.log('Info from file: ', data)
})
})
