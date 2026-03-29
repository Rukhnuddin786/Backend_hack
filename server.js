import app from './src/app.js'

// Vercel serverless function
export default async function handler(req, res) {
    try {
        console.log('Function invoked:', req.method, req.url)
        
        // Handle the request
        await app(req, res)
        
    } catch (error) {
        console.error('Serverless function error:', error)
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message,
            details: 'Serverless function crashed'
        })
    }
}