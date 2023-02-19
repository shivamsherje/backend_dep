const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  body: String,
  user: String,
});
const Notemodel = mongoose.model("note", noteSchema);

module.exports = {
  Notemodel,
};
