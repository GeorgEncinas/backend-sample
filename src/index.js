import express from 'express'
import { checkLogin } from "./middleware/login";
import { Sequelize, UserSQL } from "./sequelize";
import studentRotes from './routes/student'
import bluebird from "bluebird";

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

var User = mongoose.model('User', userSchema);

const app = express()
const handler = () => {
    console.log('http://localhost:9090')
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// routes
app.use('/student', studentRotes);

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
    const { email, password } = body
    if ((body) && (email && password)){
        let response = {}
        Promise.all([
            UserSQL.create(body)
                .then(userCreated => {
                    response.sql = userCreated
                    return userCreated 
                }),
            new User(body).save()
                .then(newUser => {
                    response.noSql = newUser
                    return newUser
                })
                .catch(err => {
                    User.find({ user, password }).exec((err, usersFound) => {
                        if (err)
                            res.status(500).send({ msg: 'the data base is empty' })
                        else if (usersFound){
                                userFound = usersFound[usersFound.length-1]
                                console.log(userFound)
                            }
                        });
                })
        ])
        .then(() => {
            response.msg = 'User created'
            res.status(201).send(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send({ msg: 'Error found in save this user' })
        })
    }
    else {
        res.status(400).send({ msg: 'No found singup data' })
    }
});

app.post("/user/login", (req, res) => {
    const { body } = req
    const { user, password } = body
    console.log('body :>> ', body)
    if ((body)&&(user && password)) {
        User.findOne({ user, password }).exec((err, userFound) => {
            if (err)
                res.status(500).send({ msg: 'Error foun in find this user' })
            else if (userFound)
                    res.status(200).send({ msg: 'User created', userFound })
                else
                    res.status(404).send({ msg: 'No found this user' })
            });
    }
    else {
        res.status(400).send({ msg: 'No found login data' })
    }
});

app.listen(9090, handler)
