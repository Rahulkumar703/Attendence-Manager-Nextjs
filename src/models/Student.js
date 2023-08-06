import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name."],
        trim: true,
        lowercase: true
    },
    userId: {
        type: Number,
        required: [true, "Please enter your Roll Number."],
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
    password: {
        type: String,
        required: [true, "Password is required."],
        select: false
    },
    department: {
        type: mongoose.ObjectId,
        required: [true, "Please enter your Department."],
        trim: true,
    },
    level: {
        type: Number,
        default: 1
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    classes: {
        type: [
            {
                subject: {
                    type: String,
                    required: [true, "Please enter the Subject."],
                    trim: true,
                },
                semester: {
                    type: Number,
                    required: [true, "Please enter your Semester."],
                    trim: true,
                },
                faculty: mongoose.ObjectId,
                attendence: {
                    type: [
                        {
                            date: {
                                type: Date,
                                default: Date.now()
                            },
                            present: {
                                type: Boolean,
                                default: false
                            }
                        }
                    ]
                }
            }
        ]
    },
    forgotPasswordToken: String,
    verifyToken: String,

}, { timestamps: true });



StudentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

})


const Student = mongoose.models.student || mongoose.model('student', StudentSchema);
export default Student;