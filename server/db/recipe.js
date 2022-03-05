const db = require('./db')
const Sequelize = require("sequelize");
const { STRING, INTEGER, ARRAY, UUID, UUIDV4 } = Sequelize.DataTypes;

const Recipe = db.define('recipe', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    ingredients: {
        type: STRING(1234),
        allowNull: false
    },
    instructions: {
        type: STRING(1234),
        allowNull: false
    },
    time: {
        type: INTEGER
    },
    servings: {
        type: INTEGER
    },
    cuisine: {
        type: STRING
    },
    link: {
        type: STRING
    },
    picture: {
        type: STRING
    },
    rating: {
        type: INTEGER
    }
})

module.exports = Recipe