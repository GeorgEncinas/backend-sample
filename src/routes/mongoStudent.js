import express from "express";
import { Student, Course, Inscription } from "../models/mongoDb";
import mongoose from 'mongoose'

const mStudent = express.Router()

mStudent.get('/info', (req, res, next) => {
    const { body } = req
    Student.findById(body)
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

mStudent.get('/info/:studentId', (req, res, next) => {
    const { studentId: id } = req.params
    Student.findOne({
        _id: id
    })
        .populate({
            path: 'courses',
            populate: {
                path: 'inscription'
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

mStudent.post('/singup', (req, res, next) => {
    const { body } = req
    Student.create(body)
        .then(studentCreated => {
            res.status(200).json(studentCreated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

mStudent.post('/curse', (req, res, next) => {
    const { body } = req
    Course.create(body)
        .then(studentCreated => {
            res.status(200).json(studentCreated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

mStudent.post('/inscription', (req, res, next) => {
    const { body } = req
    Promise.all([
        Inscription.create(body),
        Student.updateOne({
            _id: req.body.student
        }, {
            $addToSet: {
                courses:
                    mongoose.Types.ObjectId(req.body.course)
            }
        })
    ])
        .then(studentCreated => {
            console.log(studentCreated)
            res.status(200).json(studentCreated[0])
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
})

export default mStudent