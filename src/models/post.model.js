const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
});

const model = mongoose.model("post", postSchema);

module.exports = model;
