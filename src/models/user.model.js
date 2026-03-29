import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
