const jwt = require("jsonwebtoken")
const JWTCONFIG = require("../config/jwt")
async function mobileApiJwtMiddleware(req, res, next) {
    const headerAuth = req.headers.authorization;
    if (headerAuth) {
        try {
            const token = headerAuth.split(" ")[1]
            const decoded = await jwt.verify(token, JWTCONFIG.secretKey);
            req.customer_id = decoded.data
            next()
        }
        catch (m) {
            res.status(422).json({
                status: 422,
                message: m.message
            })
        }

    }
    else {
        res.status(422).json({
            status: 422,
            message: "Header authorization required"
        })
    }
}
module.exports = mobileApiJwtMiddleware;