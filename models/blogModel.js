const mongoose = require("mongoose");
const blogScheam = mongoose.Schema({
  title: String,
  content: String,
});
const blog = mongoose.model("Blog", blogScheam);
module.exports = blog;
