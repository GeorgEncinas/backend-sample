import express from "express";
import { StudentSQL, CourseSQL, InscriptionSQL } from "../sequelize";

const course = express.Router()

course.post('/course', (req, res, next) => {
    const { body } = req
    CourseSQL.create(body)
        .then(courseCreated => {
            res.status(200).json(courseCreated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
