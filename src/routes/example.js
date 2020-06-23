import express from 'express'
import { checkLogin } from "../middleware/login";
import { mdJWT } from '../middleware/verifyToken'
import { User } from "../index"
import { UserSQL } from "../sequelize";
import { sign, decode } from '../services/jwtService'

var async = require('async');
console.log(process.env.ENVIRONMENT)

const example = express()

example.get("/", (req, response) => {
    response.status(200).json({
        msg: 'ok'
    })
});

example.get("/info", mdJWT, (req, response) => {
    response.status(200).json({
        msg: 'ok'
    })
});

// middleware
example.post("/", checkLogin, (req, res) => {
    const { body, params } = req
    console.log('body :>> ', body)
    console.log('params :>> ', params)
    res.status(200).send(body)
});

example.post("/user/singup", (req, res) => {
    const { body } = req
    console.dir({
        info: `'body :>>`,
        body
    }, { colors: true })

    if (body) {
        const { email, password } = body
        if (email && password) {
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
            ])
                .then(() => {
                    const { newUser } = response.noSql
                    response.msg = 'User created'
                    sign(newUser)
                        .then(token => {
                            response.token = token
                            res.status(201).send(response)
                        })
                })
                .catch(err => {
                    console.warn(err)
                    res.status(500).send({ msg: 'Error found in save this user' })
                })
        } else {
            res.status(400).send({ msg: 'No found singup data' })
        }

    }
    else {
        res.status(400).send({ msg: 'No found singup data' })
    }
});

example.post("/user/withArray", (req, res) => {
    const { body } = req
    console.dir({
        info: `'body :>>`,
        body
    }, { colors: true })
    let response = []
    async.each(body, (user,callback)=>{
        response.push(user)
        callback();
    },(err)=>{
        console.log("fin")
        // if(err)
        //     res.status(500).send({ msg: 'Error found in save this user' })
        // else
        //     res.status(201).send(response)
    })

    // let response = body.map(user => {
    // Promise.all([

    // ])
    // if (user) {
    //         const { email, password } = user
    //         if (email && password) {
    //             let response = {}
    //             Promise.all([
    //                 UserSQL.create(body)
    //                     .then(userCreated => {
    //                         response.sql = userCreated
    //                         return userCreated
    //                     }),
    //                 new User(body).save()
    //                     .then(newUser => {
    //                         response.noSql = newUser
    //                         return newUser
    //                     })
    //             ])
    //                 .then(() => {
    //                     const { newUser } = response.noSql
    //                     response.msg = 'User created'
    //                     sign(newUser)
    //                         .then(token => {
    //                             response.token = token
    //                             res.status(201).send(response)
    //                         })
    //                 })
    //                 .catch(err => {
    //                     console.warn(err)
    //                     res.status(500).send({ msg: 'Error found in save this user' })
    //                 })
    //         } else {
    //             res.status(400).send({ msg: 'No found singup data' })
    //         }

    // }
    // else {
    //     res.status(400).send({ msg: 'No found singup data' })
    // }

   
});

example.post("/user/login", (req, res) => {
    const { body } = req
    console.log('body :>> ', body)
    if (body) {
        const { email, password } = body
        if (email && password) {
            User.findOne({ email, password }).exec((err, userFound) => {
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


export { example }