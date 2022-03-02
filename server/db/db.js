const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/mealplan",
  {
    logging: false,
  }
);

module.exports = db;
