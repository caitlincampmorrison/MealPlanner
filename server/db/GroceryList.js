const db = require('./db')
const Sequelize = require("sequelize");
const { STRING, BOOLEAN,} = Sequelize.DataTypes;

const GroceryList = db.define('grocerylist', {
    item: {
        type: STRING,
        allowNull: false
    },
    complete: {
        type: BOOLEAN,
        defaultValue: true
    },
    dayId: {
        type: STRING,
    },
    recipeId: {
        type: STRING,
    }
})

module.exports = GroceryList