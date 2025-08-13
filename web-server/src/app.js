const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
const App = require("./config/app")
const WebRouter = require("./router/webApi.router")
const DatabaseMiddleware = require("./middleware/database.middleware")
const MobileRouter = require("./router/mobileApi.router")
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(DatabaseMiddleware)
app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "success"
    })
})
app.use("/dashboard-api/", WebRouter)
app.use("/mobile-api", MobileRouter)
app.listen(App.PORT, "0.0.0.0.", () => {
    console.log(`Server running in http://localhost:${App.PORT}`)
})
