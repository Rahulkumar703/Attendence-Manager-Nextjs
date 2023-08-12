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
}, { timestamps: true })

const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);
export default Subject;