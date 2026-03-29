import express from 'express'
import cors from 'cors'
import UserModel from './models/user.model.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        
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
        
        const user = await UserModel.create(userData)
        res.status(201).json({ message: 'User saved successfully', user })
    } catch (error) {
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