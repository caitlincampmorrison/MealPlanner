const db = require('./db')
const Sequelize = require("sequelize");
const { STRING, INTEGER, ARRAY, UUID, UUIDV4 } = Sequelize.DataTypes;

const Calendar = db.define('calendar', {
    recipeId: {
        type: UUID,
        allowNull: false
    },
    dayId: {
        type: STRING,
        allowNull: false
    },
    
})

module.exports = Calendar