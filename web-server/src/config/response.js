class Response {
    static index(req, res) {
        res.status(200).json({
            status: 200,
            message: "Welcome to server api "
        })
    }
    static notFound(req, res) {
        res.status(404).json({
            status: 404,
            message: "Opps url api tidak ditemukan"
        })
    }
}
module.exports = Response;