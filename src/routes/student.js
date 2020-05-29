import express from "express";
import { StudentSQL, CourseSQL, InscriptionSQL } from "../sequelize";

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

student.get('/info/:studentId', (req, res, next) => {
    const { studentId: StudentId } =  req.params
    StudentSQL.findOne({
        StudentId,
        include: {
            model: CourseSQL,
            as: 'courses'
        }
    })
        .then(studentFound => {
            if (studentFound)
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

student.post('/curse', (req, res, next) => {
    const { body } = req
    CourseSQL.create(body)
        .then(studentCreated => {
            res.status(200).json(studentCreated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

student.post('/inscription', (req, res, next) => {
    const { body } = req
    console.dir(InscriptionSQL, {colors: true})
    InscriptionSQL.create(body)
        .then(studentCreated => {
            res.status(200).json(studentCreated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

export default student