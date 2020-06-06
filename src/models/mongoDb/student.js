import { Schema, model } from 'mongoose'

const StudentSchema = new Schema({
    name: String,
    email: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
})

export default model('Student', StudentSchema)
