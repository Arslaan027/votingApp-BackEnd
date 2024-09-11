const express = require("express");
const app = express();
require("dotenv").config();
// const passport = require("./Auth");
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//==> Importing the userRoute
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

//==> Importing the jwtAuth
// const { jwtAuthMiddleware } = require("./jwt");
//==> implement the routes
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
