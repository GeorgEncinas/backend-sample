import express from 'express'
import { checkLogin } from "../middleware/login";
import { mdJWT } from '../middleware/verifyToken'
import { User } from "../index"
import { UserSQL } from "../sequelize";
import { sign, decode, verify } from '../services/jwtService'


console.log('DB_USER as', process.env.DB_USER)

console.log(process.env.ENVIRONMENT)

const example = express()

// example.get("/", (req, response) => {
//     response.status(200).json({
//         msg: 'ok'
//     })
// });


const login = {
    user: 'Alvaro',
    password: '@#@#.r3r3r2r'
}

const array = [
    "string",
    false,
    {
        sub_id: 5
    }
]

example.post('/info/login', async (req, res) => {
    try {
        if (
            login.user === req.body.user &&
            login.password === req.body.password
        )
            res.status(200).send(await sign({password: req.body.password, user: req.body.user}))
        else
            res.status(403).json({ msg: 'Invalid username or password' })
    } catch (e) {
        console.error(e)
        res.status(409).json({ msg: 'Error in sing', e })
    }
})


example.get('/info/:id', async (req, res, next) => {
    const token = req.get('X-Token')
    if (token)
        try {
            const decoded = await verify(token)
            console.dir({ decoded }, { colors: true })
            next()
        } catch (err) {
            console.log('token catch> ', token)
            if (err.name === 'TokenExpiredError')
                res.status(401).json({ msg: err.message })
            else
                res.status(401).json({ msg: 'Invalid token' })

        }
    else {
        res.status(401).json({ msg: 'Invalid token' })
    }
}, (req, res) => {
    const { subId } = req.query
    const echo = req.query.echo
    const echo2 = req.query.echo2
    const echo3 = req.query.echo3
    const element = array[req.params.id]

    res.status(200).json({
        msg: 'ok',
        element,
        subId,
        echo,
        echo2,
        echo3
    })
})

example.post('/info/login', async (req, res) => {
    try {
        if (
            login.user === req.body.user &&
            login.password === req.body.password
        )
            res.status(200).send(await sign({password: req.body.password}))
        else
            res.status(403).json({ msg: 'Invalid username or password' })
    } catch (e) {
        console.error(e)
        res.status(409).json({ msg: 'Error in sing', e })
    }
})

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
                    console.dir(response.sql)
                    sign({password: response.sql.password})
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