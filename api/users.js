import mongoose from 'mongoose'

// Ensure we reuse the same Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    password: { type: String, required: true }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

// Database connection
let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const connectDB = async () => {
    if (cached.conn) return cached.conn
    
    if (!cached.promise) {
        const uri = process.env.MONGODB_URI || 'mongodb+srv://backend:rukku786@backend.m42nscf.mongodb.net/insta-id-hack'
        cached.promise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        }).then(mongoose => {
            console.log('Connected to MongoDB')
            return mongoose
        }).catch(error => {
            console.error('MongoDB connection error:', error)
            cached.promise = null
            throw error
        })
    }
    
    cached.conn = await cached.promise
    return cached.conn
}

// Main handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*') // Allow Postman
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }
    
    try {
        await connectDB()
        
        // Find all users and return them (excluding the internal __v field)
        const users = await User.find({}).select('-__v')
        
        res.status(200).json({
            count: users.length,
            users: users
        })
        
    } catch (error) {
        console.error('Users API error:', error)
        res.status(500).json({ 
            error: 'Server error', 
            message: error.message 
        })
    }
}
