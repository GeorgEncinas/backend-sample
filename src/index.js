import express from 'express'
import { listen } from "socket.io";
import http from "http";

import { Sequelize, UserSQL } from "./sequelize";
import studentRotes from './routes/student'
import mStudent from './routes/mongoStudent'
import bluebird from "bluebird";
import { example as exampleRoute } from './routes/example'
import cors from 'cors'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load('./doc/sample.yaml');
// const swaggerDocument = Lib.read('./src');

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

app.use('/api-docs', function(req, res, next){
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({
    origin: [
        'http://localhost:4200',
        'http://editor.swagger.io',
    ]
}))
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

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/www/index.html')
})

const server = http.createServer(app)
const io = listen(server)

const news = [
    { title: 'El backend esta siendo muy usado en la clase de postulantes', date: '25/7/2020' },
    { title: 'El backend esta siendo muy usado en la clase de postulantes', date: '25/7/2020' }
]

io.on("connection", (socket)=>{
    console.log("Connected")

    socket.emit('news', news)
})

server.listen(9090)
// app.listen(9090, handler)
