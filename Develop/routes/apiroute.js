// USING SAME .ROUTER METHOD AS IN HTMLROUTES MODULE FOR MODULARIZATION
const router = require("express").Router();
//IMPORTING NOTEHANDLER MODULE
const noteHandler = require("../db/Notehandler");
// IMPORTING THE FS MODULE TO READ CONTENTS OF DB.JSON FILE
const fs = require("fs");

router.get("/api/notes", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ Error: "Failed reading notes" });
      return;
    }

    const notes = JSON.parse(data);
    res.JSON(notes);
  });
});

router.post("/api/notes", (req, res) => {
  noteHandler.removeNote(req.params.id);
  if (err) console.error(err);
  res.status(500).json({ Error: "Note Failed!" });
});

module.exports = router;
