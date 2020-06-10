import express from 'express'

import { Sequelize, UserSQL } from "./sequelize";
import studentRotes from './routes/student'
import mStudent from './routes/mongoStudent'
import bluebird from "bluebird";
import { example as exampleRoute } from './routes/example'

const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

Promise = bluebird;

// getting-started.js MongoDb
import mongoose from 'mongoose'
mongoose.Promise = bluebird
const schema = 'sample'
const urlDb = `mongodb://localhost/${schema}`;
mongoose.connect(urlDb, { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        unique: true // Unique index. If you specify `unique: true`
        // specifying `index: true` is optional if you do `unique: true`
    },
    name: String,
    password: String
});

export var User = mongoose.model('User', userSchema);

const app = express()
const handler = () => {
    console.log('http://localhost:9090')
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// routes
app.use('/student', studentRotes);
app.use('/v2/student', mStudent);

// app.use(function (req, res, next) {
//     res.status(404).send('Sorry cant find that!');
// });

app.use(exampleRoute)

emitter.on('sequelizeReady',()=>{
    app.listen(9090, handler)
})

module.exports = emitter;
