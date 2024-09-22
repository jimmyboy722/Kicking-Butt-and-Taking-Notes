// IMPORTING EXPRESS, FS MODULE, AND SETTING UP THE SERVER
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
//IMPORTING ROUTE MODULES
const apiRoutes = require("./routes/apiroute");
const htmlRoutes = require("./routes/htmlroutes");

// ADDING MIDDLEWARE TO THE APPLICATION
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);
//CONFIRMING CONNECTION
app.listen(PORT, () =>
  console.log(`Server is running @ http://localhost: ${PORT}!`)
);
