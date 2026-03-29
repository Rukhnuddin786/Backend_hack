import mongoose from 'mongoose'

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://backend:rukku786@backend.m42nscf.mongodb.net/insta-id-hack')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

export default connectDB