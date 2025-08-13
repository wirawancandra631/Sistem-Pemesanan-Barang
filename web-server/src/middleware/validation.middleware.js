const { validationResult } = require("express-validator");

async function validationMiddleware(req, res, next) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const validationMessage = result.array().map(r => ({ message: r.msg, field: r.path }))
        res.status(422).json({
            status: 422,
            message: validationMessage
        })
    }
    else {
        next()
    }
}
module.exports = validationMiddleware