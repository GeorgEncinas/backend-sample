import { Schema, model } from 'mongoose'

const InscriptionSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    year: Number
})

InscriptionSchema.index({ student: 1, course: 1 }, { unique: true });

export default model('Inscription', InscriptionSchema)
