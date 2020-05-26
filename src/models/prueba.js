

// to check connectivity
const db  = require('../../config/mysequelize')

db.authenticate()
    .then(()=> console.log('database connected'))
    .catch(err => console.log('Error: '+ err))

