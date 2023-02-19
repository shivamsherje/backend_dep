const express = require("express");
const { Notemodel } = require("../models/nots.model");
const notsRouter = express.Router();

//get all
notsRouter.get("/", async (req, res) => {
  try {
    const notes = await Notemodel.find();
    res.send(notes);
  } catch (err) {
    res.send({ error: "somthing went wrong", err });
  }
});

//post route
notsRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new Notemodel(payload);
    await note.save();
    res.send({ msg: "note created" });
  } catch (err) {
    res.send({ error: "somthing went wrong", err });
  }
});

//delete route
notsRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  try {
    await Notemodel.findByIdAndDelete({ _id: noteID });
    res.send({ msg: "note deleted" });
  } catch (err) {
    res.send(`The document with id:${noteID} has been deleted.`);
  }
});

//patch route
notsRouter.patch("/update/:id", async (req, res) => {
  const noteID = req.params.id;
  
  try {
    const data = req.body;
    await Notemodel.findByIdAndUpdate({ _id: noteID }, data);
    res.send(`The document with id:${noteID} has been updated.`);
  } catch (error) {
    console.log(error);
    res.send(`Error ${error}`);
  }
});

module.exports = {
  notsRouter,
};
