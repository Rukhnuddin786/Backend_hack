import app from './src/app.js'
import connectDB from './src/db/db.js'

const port = 3000

// Connect to database and start server
connectDB()
app.listen(port, () => {
    console.log(`🚀 Local server running on port ${port}`)
    console.log(`📱 Frontend should connect to: http://localhost:3000/login`)
})
