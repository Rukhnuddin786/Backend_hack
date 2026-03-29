import app from './src/app.js'
import connectDB from './src/db/db.js'

const port = process.env.PORT || 3000

connectDB()

// For Vercel deployment
if (process.env.NODE_ENV === 'production') {
    module.exports = async (req, res) => {
        await connectDB()
        return app(req, res)
    }
} else {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}