const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'myFolder')

fs.mkdir(dirPath, error => {
    if(error) {
        console.error('Error: ', error)
        return
    }
    console.log('Folder "myFolder" created')
    fs.rmdir(dirPath, error => {
    if(error) {
        console.error('Error: ', error)
        return
    }
    console.log('Folder "myFolder" deleted')
})
})
