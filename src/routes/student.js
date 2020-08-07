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
    const { studentId: id } = req.params
    StudentSQL.findOne({
        where: { id },
        attributes: ['id', 'email', StudentSQL.sequelize.literal("(select 51+30) as nota")],
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
            console.error(err)
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
//another option
// student.post('/inscription', (req, res, next) => {
//     const { body } = req
//     console.log(body)
//     Promise.all([
//         StudentSQL.findByPk(body.student_id),
//         CourseSQL.findByPk(body.course_id)
//     ]).then(([student, course]) => 
//         InscriptionSQL.create({
//             year: body.year,
//             StudentId: student.dataValues.id,
//             CourseId: course.dataValues.id
//         }).then(courseCreated => {
//             res.status(200).json(courseCreated)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
//     )
    
// })

export default student