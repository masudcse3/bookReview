/** @format */

require("dotenv").config();
const http = require("http");
const app = require("./app");
const { dbConnection } = require("./db");
const server = http.createServer(app);

const port = process.env.PORT || 4000;
const main = async () => {
  try {
    await dbConnection();
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Database connection failed");
    console.log("Error", error.message);
  }
};
main();
