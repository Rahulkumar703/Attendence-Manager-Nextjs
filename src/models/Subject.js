import mongoose from "mongoose";

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Subject name."],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Please enter Subject Code."],
        trim: true,
        unique: true
    },
    semester: {
        type: Number,
        required: [true, "Please enter Subject Semester."],
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter Subject Branch"],
        ref: "department",
        trim: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "faculty",
        trim: true,
    }
}, { timestamps: true })

const Subject = mongoose.models.subject || mongoose.model('subject', SubjectSchema);
export default Subject;