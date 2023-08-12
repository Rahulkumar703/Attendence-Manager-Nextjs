import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Department name."],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Please enter Subject Code."],
        trim: true,
        unique: true
    },
}, { timestamps: true })

const Department = mongoose.models.department || mongoose.model('department', DepartmentSchema);
export default Department;