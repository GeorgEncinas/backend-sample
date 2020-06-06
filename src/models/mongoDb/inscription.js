import { Schema, model } from 'mongoose'

const InscriptionSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    year: Number
})

export default model('Inscription', InscriptionSchema)
