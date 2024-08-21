app.get("/notes", (req, res) => {
  FileSystem.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data!");
      return;
    }

    const jsonData = JSON.parse(notes);
    res.JSON(jsonData);
  });
});
