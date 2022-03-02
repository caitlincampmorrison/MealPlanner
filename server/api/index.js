const app = require("express").Router();

app.use("/recipes", require("./recipe"));
app.use("/calendars", require("./calendar"));
app.use("/grocerylists", require("./grocerylist"))

module.exports = app;
