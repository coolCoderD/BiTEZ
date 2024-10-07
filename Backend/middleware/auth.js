import jwt from 'jsonwebtoken'


export const authMiddleware = async (req, res, next) => {
    const token = req.headers.token||req.headers.authorization;
    if (!token) {
        res.json({ success: false, message: 'Unauthorized' })
    } else {

       try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id
        next()
       } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
       }
    }
}