import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
 
    // examine if there is a token
    try {

        const token = req.cookies.cookiename
        console.log('AUTH: token is', token)

        if (!token) return res.status(400).send({success: false})

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log('decodedTOken is', decodedToken)

        console.log('expiration date is', new Date(decodedToken.exp * 1000) )

        if (!decodedToken) return res.status(400).send({success: false})

        // check if token has expired
        // not useful since we are in try catch block and verify method will catch the case
        if (Date.now() > decodedToken.exp * 1000) return res.status(403).send({success: false})

        next()
        
    } catch (error) {
        
        console.log('AUTH error:', error.message)
        res.status(400).send(error.message)
    }
}