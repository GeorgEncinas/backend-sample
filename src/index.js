import express from 'express'
import { checkLogin } from "./middleware/login";

// getting-started.js MongoDb
import mongoose from 'mongoose'
const schema = 'sample'
const urlDb = `mongodb://localhost/${schema}`;
mongoose.connect(urlDb, { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    user: String,
    name: String,
    password: String
});

var User = mongoose.model('User', userSchema);

const app = express()
const handler = () => {
    console.log('http://localhost:9090')
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(function (req, res, next) {
//     res.status(404).send('Sorry cant find that!');
// });

app.get("/", (req, response) => {
    response.status(200).json({
        msg: 'ok'
    })
});

// middleware
app.post("/", checkLogin, (req, res) => {
    const { body, params } = req
    console.log('body :>> ', body)
    console.log('params :>> ', params)
    res.status(200).send(body)
});

app.listen(9090, handler)
