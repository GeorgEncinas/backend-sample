import express from "express";
import { StudentSQL } from "../sequelize";

const student = express.Router()

student.get('/info', (req, res, next) => {
    const { body } = req
    StudentSQL.findOne(body)
        .then(studentFound => {
            if(studentFound)
                res.status(200).json(studentFound)
            else
                res.status(404).json({ msg: 'No found student' })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

student.post('/singup', (req, res, next) => {
    const { body } = req
    StudentSQL.create(body)
        .then(studentCreated => {
            res.status(200).json(studentCreated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

export default student