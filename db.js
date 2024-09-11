const mongoose = require("mongoose");
require("dotenv").config();

//===> Mongoose connection url;
const mongoURL = process.env.DATABASE_URL_LOCAL;
// const mongoURL = process.env.DATABASE_URL;

mongoose.connect(
  mongoURL
  //     , {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
);

//===> maintaining the MongoDB connection bridge
const db = mongoose.connection;

//===> Adding Event listeners
db.on("connected", () => {
  console.log("Connected to the Mongo DB");
});
db.on("error", (error) => {
  console.log(`Something went wrong ${error}`);
});
db.on("disconnected", () => {
  console.log("Disconnected");
});

module.exports = db;
