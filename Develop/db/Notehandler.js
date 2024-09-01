/* THIS FILE IS USED FOR THE HANDLING OF READING, WRITING
ADDING AND REMOVING NOTES FROM THE DB.JSON FILE*/

//IMPORTS
//FILE SYSTEM IMPORT
const fs = require("fs");
//IMPORTED TO CREATE UNIQUE ID'S FOR THE NOTES
const uuid = require("uuid/v4");
// NODE UTILITY MODULE FOR USE IN PROMISE OBJECTS
const util = require("util");
const { error } = require("console");

// PROMISIFYING FILE SYSTEM METHODS TO CONVERT CALL-BACK FUNCTIONS TO PROMISES
//MAKES IT EASIER TO WORK WITH USING .then() METHOD OR await/async
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);

class Notehandler {
  // READNOTES METHOD - READS THE DB.JSONFILE AND RETURNS THE DATA AS A STRING (ASYNCHRONOUS)
  readNotes() {
    return readFilePromise("db/db.json", "utf-8");
  }
  // WRITENOTES METHOD - WRITES THE PROVIDED NOTE OBJECT TO THE DB.JSON FILE AFTER CONVERTING IT TO A JSON STRING
  writeNotes(note) {
    return writeFilePromise("db/db.json", JSON.stringify(note));
  }

  /*RETREIVENOTES METHOD - READS THE NOTES FROM THE FILE, USES A TRY/CATCH STATEMENT TO TRY TO PARSE THE STRING
  IF FAILS, RETURNS AN EMPTY ARRAY*/
  retrieveNotes() {
    return this.readNotes().then((notes) => {
      // ONLY DECLARING PARSED NOTES VARIABLE FOR USE
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  // ADDNOTES METHOD
  addNotes(note) {
    const { title, text } = note;
    // THROWS AN ERROR IF TEXT OR TITLE ARE MISSING FROM THE NOTE OBJECT (DESTRUCTURING)
    if (!text || !title) {
      throw new Error("Note Title and Text are required!");
    }
    // NEWNOTE - ADDS A UNIQUE ID TO NOTES USING NPM'S UUID PACKAGE PER CHALLENGE INSTRUCTIONS
    const newNote = { title, text, id: uuid() };

    // TO RETRIEVE EXISTING NOTES, ADD NEW NOTES, WRITE ALTERED NOTES BACK TO THE FILE, AND RETURN THE NEW NOTE
    return this.retrieveNotes()
      .then((notes) => [...notes, newNote])
      .then((alteredNotes) => this.writeNotes(alteredNotes))
      .then(() => newNote);
  }
}

module.exports = new Notehandler();
