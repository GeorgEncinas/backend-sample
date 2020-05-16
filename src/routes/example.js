
import express from 'express'
import { checkLogin } from "../middleware/login";

const example = express()

example.get("/", (req, response) => {
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
    console.log('body :>> ', body)

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
                    response.msg = 'User created'
                    res.status(201).send(response)
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

example.post("/user/login", (req, res) => {
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


export { example }