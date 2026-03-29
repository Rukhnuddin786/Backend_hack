import express from 'express'
import cors from 'cors'
import UserModel from './models/user.model.js'
import connectDB from './db/db.js'

const app = express()

// Connect to database
connectDB()

// CORS configuration
app.use(cors({
  origin: ['https://frontendinstalogin.vercel.app', 'https://frontendinstalogin-p4vi2lyhg-pharmacy-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle preflight requests
app.options('*', cors())

app.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body)
        const { username, password } = req.body
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' })
        }
        
        // Detect if input is email, mobile number, or username
        let userData = { password }
        
        if (username.includes('@')) {
            // Email format
            userData.email = username
        } else if (/^\d+$/.test(username) && username.length >= 10) {
            // Mobile number (all digits and at least 10 digits)
            userData.mobileNumber = username
        } else {
            // Username
            userData.username = username
        }
        
        console.log('Creating user with data:', userData)
        const user = await UserModel.create(userData)
        console.log('User created successfully:', user)
        
        res.status(201).json({ message: 'User saved successfully', user })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: 'Failed to save user', details: error.message })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message })
    }
})



export default app