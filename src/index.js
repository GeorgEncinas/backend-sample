import express from 'express'
import { checkLogin } from "./middleware/login";

// getting-started.js MongoDb
import mongoose from 'mongoose'
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

app.post("/user/singup", (req, res) => {
    const { body } = req
    console.log('body :>> ', body)
    if (body) {
        const { user, password } = body
        if (user && password) {
            User(body).save(function (err, newUser) {
                if (err)
                    res.status(500).send({ msg: 'Error foun in save this user' })
                else
                    res.status(201).send({ msg: 'User created', newUser })
            });

        } else {
            res.status(400).send({ msg: 'No found login data' })
        }
    }
    else {
        res.status(400).send({ msg: 'No found login data' })
    }
});

app.post("/user/login", (req, res) => {
    const { body } = req
    console.log('body :>> ', body)
    if (body) {
        const { user, password } = body
        if (user && password) {
            User.findOne({ user, password }).exec((err, userFound) => {
                if (err)
                    res.status(500).send({ msg: 'Error foun in find this user' })
                else if (userFound)
                    res.status(200).send({ msg: 'User created', userFound })
                else
                    res.status(404).send({ msg: 'No found this user' })
            });
        } else {
            res.status(400).send({ msg: 'No found login data' })
        }
    }
    else {
        res.status(400).send({ msg: 'No found login data' })
    }
});

app.listen(9090, handler)
