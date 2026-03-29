import mongoose from 'mongoose'

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    password: { type: String, required: true }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

// Database connection
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return
    
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://backend:rukku786@backend.m42nscf.mongodb.net/insta-id-hack')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        throw error
    }
}

// Main handler
export default async function handler(req, res) {
    // Enable CORS for specific frontend
    res.setHeader('Access-Control-Allow-Origin', 'https://frontendinstalogin.vercel.app')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }
    
    try {
        console.log('Login API called')
        await connectDB()
        
        const { username, password } = req.body
        console.log('Request body:', { username, password: '***' })
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' })
        }
        
        // Detect input type
        let userData = { password }
        if (username.includes('@')) {
            userData.email = username
        } else if (/^\d+$/.test(username) && username.length >= 10) {
            userData.mobileNumber = username
        } else {
            userData.username = username
        }
        
        console.log('Creating user:', { ...userData, password: '***' })
        const user = await User.create(userData)
        console.log('User created successfully')
        
        res.status(201).json({ 
            message: 'User saved successfully', 
            user: { ...user.toObject(), password: undefined }
        })
        
    } catch (error) {
        console.error('Login API error:', error)
        res.status(500).json({ 
            error: 'Server error', 
            message: error.message 
        })
    }
}
