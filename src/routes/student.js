import express from "express";
import fs from 'fs'
import path from 'path'
import { StudentSQL, CourseSQL, InscriptionSQL } from "../sequelize";
import { mdUploadImage } from "../services/uploadService";
import { sign } from "../services/jwtService";
import { mdJWT } from "../middleware/verifyToken";

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
                res.status(201).json({ msg: 'Image uploaded', student: studentFound })
            } catch (error) {
                fs.unlinkSync(image)
                res.status(501).json({ msg: 'Image not uploaded and not saved' })
            }
        })
        .catch((err) => {
            console.warn(err)
            fs.unlinkSync(image)
            res.status(500).json({ msg: 'Image not uploaded' })
        })
})

  /* @swagger get
   * path: /get-image/:image
   * description: Return a image profile 
   * responses:
   *     404:
   *       description: "Image not found"
   *     200:
   *       description: "Its ok"
   */
student.get('/get-image/:image', mdJWT, (req, res)=>{
    const {image} = req.params
    const pathFile = `uploads/students/${image}`;
    if(fs.existsSync(pathFile))
        res.sendFile(path.resolve(`uploads/students/${image}`))
    else
        res.status(404).json({ msg: 'Image not found' })
})

student.get('/info/:studentId', (req, res, next) => {
    const { studentId: id } = req.params
    StudentSQL.findOne({
        where: { id },
        attributes: ['id', 'email', 'image'],
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

student.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const studentFound = await StudentSQL.findOne({email,password})
        if (studentFound)
            res.status(200).json({
                'X-Token': await sign({password: studentFound.password, email: studentFound.email})
            })
        else
            res.status(403).json({ msg: 'Invalid username or password' })
    } catch (e) {
        console.error(e)
        res.status(409).json({ msg: 'Error in sing', e })
    }
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