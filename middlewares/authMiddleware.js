const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res, next) {
    const { authorization } = req.headers

    if (authorization) {
        const accessToken = authorization.split(' ')[1]

        jwt.verify(accessToken, process.env.APP_SECRET_KEY, (err, payload) => {
            if (err) {
                return res.sendStatus(403)
            }

            req.userId = payload.id
            next()
        })
    } else {
        res.sendStatus(401)
    }
}
