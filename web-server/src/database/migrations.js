const { sequelize } = require("./loader");
require("dotenv").config({
});
const runMigrate = async () => {
    try {
        const env = process.env.ENV;
        if (env == "PRODUCTION") {
            console.warn("Cannot migrate in development environment")
        }
        else {
            await sequelize.sync({ force: true })
        }

    } catch (m) {
        console.warn(m.message);
    }
};
runMigrate();
