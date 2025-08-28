const App = {
    PORT: process.env.PORT || 3000,
    MULTERDESTINATION: process.env.MULTERDISK || "public/image",
    BASEURL: process.env.BASEURL || `http:localhost:3000/image`
}
module.exports = App;