const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const app = express();
require("dotenv").config();
console.log(process.env.MONGODB_URI)
const session = require("express-session");
//requiring pasport as we've configured it
const passport = require("./config/passport");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "secret stuff here", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());


// Serve up static assets (usually on heroku)


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use('/', routes);


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/transportappDB");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port http://localhost:${PORT}`);
});
