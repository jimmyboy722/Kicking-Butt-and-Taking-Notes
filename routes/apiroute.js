// USING SAME .ROUTER METHOD AS IN HTMLROUTES MODULE FOR MODULARIZATION
const router = require("express").Router();
//IMPORTING NOTEHANDLER MODULE
const noteHandler = require("../db/Notehandler");
// IMPORTING THE FS MODULE TO READ CONTENTS OF DB.JSON FILE
const fs = require("fs");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ Error: "Failed reading notes" });
      return;
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  noteHandler.addNotes(req.body).then((note) => {
    res.json(note);
  });
});

module.exports = router;
