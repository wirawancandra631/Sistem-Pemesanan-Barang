
const jwt = require("jsonwebtoken");
const JWTCONFIG = require("../config/jwt");
async function jwtMiddleware(req, res, next) {
    const headerAuth = req.headers.authorization;
    if (headerAuth) {
        try {
            const token = headerAuth.split(" ")[1]
            const decoded = await jwt.verify(token, JWTCONFIG.secretKey);
            req.user_id = decoded.data
            next()
        }
        catch (m) {
            res.status(401).json({
                status: 401,
                message: m.message
            })
        }

    }
    else {
        res.status(401).json({
            status: 401,
            message: "Header authorization required"
        })
    }
}
module.exports = jwtMiddleware