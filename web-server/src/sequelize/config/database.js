module.exports = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "root",
    "database": process.env.DB_DATABASE || "system_delivery_order",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql"
  },
  "test": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "root",
    "database": process.env.DB_DATABASE || "system_delivery_order",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql"
  },
  "production": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "root",
    "database": process.env.DB_DATABASE || "system_delivery_order",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql"
  }
}