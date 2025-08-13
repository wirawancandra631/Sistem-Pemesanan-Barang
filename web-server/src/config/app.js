const App = {
    PORT: process.env.PORT || 3000,
    MulterDestination: "/public/image",
    BaseUrl: process.env.BASEURL || `http:localhost`
}
module.exports = App;