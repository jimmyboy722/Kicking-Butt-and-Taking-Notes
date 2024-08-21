// IMPORTING CORE NODE.JS MODULE PATH TO WORK WITH FILE AND DIR PATHS
const path = require("path");
//CREATING A ROUTER OBJECT USING EXPRESS TO DEFINE THE ROUTES
const router = require("express").Router();

// USING "GET/NOTES" TO RETURN THE NOTES.HTML FILE PER GETTING STARTED INSTRUCTIONS
router.get("/notes", (req, res) => {
  // using sendFile method to send the noted.html file as a response
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// USING "GET *"  TO RETURN THE INDEX.HTML FILE PER GETTING STARTED INSTRUCTIONS
router.get("*", (req, res) => {
  // AGAIN USING SENDFILE METHOD. SENDS THE INDEX.HTML FILE AS A RESPONSE TO ANY UNMATCHED ROUTES
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
