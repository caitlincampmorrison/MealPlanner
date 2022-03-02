const server = require("./index");
const { db } = require("./db");

const init = async () => {
  try {
    await db.sync();
    const port = process.env.PORT || 8080;
    server.listen(port, ()=> console.log(`listening on port ${port}`));
  } catch (err) {
    console.log("There was an error during initialization!", err);
  }
};

init();
