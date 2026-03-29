import app from './src/app.js'
import connectDB from './src/db/db.js'

const port = process.env.PORT || 3000

// For Vercel deployment
export default async function handler(req, res) {
    await connectDB()
    return app(req, res)
}

// For local development
if (process.env.NODE_ENV !== 'production') {
    connectDB()
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}