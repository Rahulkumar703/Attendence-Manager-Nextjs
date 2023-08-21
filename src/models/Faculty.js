import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const FacultySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name."],
        trim: true,
        lowercase: true
    },
    userId: {
        type: Number,
        required: [true, "Please enter your userId."],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter your Email."],
        trim: true,
        unique: true,
        lowercase: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        required: [true, "Please enter your Department."],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        select: false
    },
    level: {
        type: Number,
        default: 2
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            trim: true,
        }
    ],
    forgotPasswordToken: String,
    verifyToken: String,
}, { timestamps: true })


FacultySchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

})


const Faculty = mongoose.models.faculty || mongoose.model('faculty', FacultySchema);

export default Faculty;