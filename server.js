import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

/* ------------------------------------------------------
   CLOUDINARY CONFIG
------------------------------------------------------ */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* ------------------------------------------------------
   MULTER → CLOUDINARY STORAGE
------------------------------------------------------ */
const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio_uploads/blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio_uploads/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadBlogImage = multer({ storage: blogStorage });
const uploadProjectImage = multer({ storage: projectStorage });

/* ------------------------------------------------------
   EXPRESS APP
------------------------------------------------------ */
const app = express();
app.use(cors());
app.use(express.json());

/* ------------------------------------------------------
   MONGODB CONNECTION (SAFE FOR SERVERLESS)
------------------------------------------------------ */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "DB Connection Failed", error: err.message });
  }
});

/* ------------------------------------------------------
   MODELS
------------------------------------------------------ */
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: String,
});
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  link: String,
});
const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

/* ------------------------------------------------------
   ROUTES
------------------------------------------------------ */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/api/portfolio", async (req, res) => {
  const blogs = await Blog.find().sort({ _id: -1 });
  const projects = await Project.find().sort({ _id: -1 });

  res.json({
    blogs,
    projects,
    totalBlogs: blogs.length,
    totalProjects: projects.length,
  });
});

/* BLOG ROUTES */
app.get("/api/blogs", async (req, res) => {
  res.json(await Blog.find().sort({ _id: -1 }));
});

app.post("/api/blogs", uploadBlogImage.single("image"), async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.create({
    title,
    content,
    image: req.file?.path || null,
    date: new Date().toDateString(),
  });

  res.status(201).json(blog);
});

app.put("/api/blogs/:id", uploadBlogImage.single("image"), async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.file?.path && { image: req.file.path }),
    },
    { new: true }
  );

  res.json(updated);
});

app.delete("/api/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

/* PROJECT ROUTES */
app.get("/api/projects", async (req, res) => {
  res.json(await Project.find().sort({ _id: -1 }));
});

app.post("/api/projects", uploadProjectImage.single("image"), async (req, res) => {
  const project = await Project.create({
    ...req.body,
    image: req.file?.path || null,
  });

  res.status(201).json(project);
});

app.put("/api/projects/:id", uploadProjectImage.single("image"), async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.file?.path && { image: req.file.path }),
    },
    { new: true }
  );

  res.json(updated);
});

app.delete("/api/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

/* ------------------------------------------------------
   EXPORT FOR VERCEL
------------------------------------------------------ */
export default app;
