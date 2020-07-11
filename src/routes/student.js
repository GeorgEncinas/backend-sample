import express from "express";
import fs from 'fs'
import { StudentSQL, CourseSQL, InscriptionSQL } from "../sequelize";
import { mdUploadImage } from "../services/uploadService";

const student = express.Router()

student.get('/info', (req, res, next) => {
    const { body } = req
    StudentSQL.findOne(body)
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

student.post('/upload-image/:userId', mdUploadImage, (req, res) => {
    console.dir(req.files)
    const { userId } = req.params
    const { path: image } = req.files.image
    StudentSQL.findByPk(userId)
        .then(async (studentFound) => {
            try {
                await studentFound.update({ image })
            } catch (error) {
                fs.unlinkSync(image)
                res.status(501).json({ msg: 'Image not uploaded and not saved' })
            }
            res.status(201).json({ msg: 'Image uploaded', student: studentFound })
        })
        .catch((err) => {
            console.warn(err)
            res.status(500).json({ msg: 'Image not uploaded' })
        })
})

student.get('/info/:studentId', (req, res, next) => {
    const { studentId: id } = req.params
    StudentSQL.findOne({
        where: { id },
        attributes: ['id', 'email', StudentSQL.sequelize.literal("(select 51+30) as nota")],
        include: {
            model: CourseSQL,
            attributes: ['name'],
            as: 'courses',
            through: {
                attributes: ['year']
            },
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

student.post('/course', (req, res, next) => {
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
    console.dir(InscriptionSQL, { colors: true })
    InscriptionSQL.create(body)
        .then(studentCreated => {
            res.status(200).json(studentCreated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

export default student