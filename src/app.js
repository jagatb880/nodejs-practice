const express = require("express");
const cors = require("cors");
const model = require("./models/post.model");
const multer = require("multer");
const fileUpload = require("./services/storage.services");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Use authentication routes
app.use("/api/auth", authRoutes);

const upload = multer({ storage: multer.memoryStorage() }); // Store uploaded files in memory a middleware to handle file uploads

app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file.buffer.toString("base64");
    const response = await fileUpload(image);
    const post = await model.create({ image: response.url, caption });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/getPosts", async (req, res) => {
  try {
    const posts = await model.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
