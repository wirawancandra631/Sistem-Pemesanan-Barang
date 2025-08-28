const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const DatabaseMiddleware = require("../middleware/database.middleware")
const baseMiddleware = express.Router();

baseMiddleware.use(cors());
baseMiddleware.use(bodyParser.json());
baseMiddleware.use(bodyParser.urlencoded({ extended: false }));
baseMiddleware.use(express.static("public"))
baseMiddleware.use(DatabaseMiddleware);
module.exports = baseMiddleware;

