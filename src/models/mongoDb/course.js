import { Schema, model } from 'mongoose'

const CourseSchema = new Schema({
    name: String,
    email: String,
    inscription: { type: Schema.Types.ObjectId, ref: 'Inscription' },
})

export default model('Course', CourseSchema)
