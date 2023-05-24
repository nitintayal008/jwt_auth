const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDb = require("./config.js");
const Blog = require("./models/blogModel.js");
const checkAuthentication = require("./middleware/authMiddleware.js");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const DATABASE_URL = "mongodb://127.0.0.1:27017";
connectDb(DATABASE_URL);

app.get("/allblogs", async (req, res) => {
  const data = await Blog.find({});
  console.log(data);
  res.send(data);
});

//adding the blog
app.post("/addblog", checkAuthentication, (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content });
    newBlog.save();
    // const data = req.params.id;
    res.json({ title, content });
  } catch (error) {
    console.log(error);
  }
});

// Update an existing blog
app.put("/blogs/:id", checkAuthentication, (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  Blog.findByIdAndUpdate(
    id,
    { title, content },
    { new: true },
    (err, updatedBlog) => {
      if (err) {
        res.status(500).json({ error: "Failed to update blog" });
      } else {
        res.json(updatedBlog);
      }
    }
  );
});

//deleting the blog
//middleware added to check the user is authenticated before deleting the blog
app.delete("/blogs/:id", checkAuthentication, (req, res) => {
  // Delete a blog
  const { id } = req.params;

  Blog.findByIdAndDelete(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete blog" });
    } else {
      res.json({ message: "Blog deleted successfully" });
    }
  });
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
