const db = require("./db");
const Recipe = require("./recipe");
const Calendar = require("./Calendar")
const GroceryList = require("./GroceryList")

//Calendar.hasMany(Recipe)

module.exports = { db, Recipe, Calendar, GroceryList };