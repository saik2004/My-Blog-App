// index.js
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

// ========================================
// Validate environment variables
// ========================================

const requiredEnvVariables = [
  "MONGODB_URI",
  "ADMIN_UID",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

const missingVariables = requiredEnvVariables.filter(
  (variable) => !process.env[variable],
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing environment variables: ${missingVariables.join(", ")}`,
  );
}

// ========================================
// Middleware
// ========================================

app.use(cors());
app.use(bodyParser.json());

// ========================================
// Initialize Firebase Admin
// ========================================

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// ========================================
// Authentication Middleware
// ========================================

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
  }

  const idToken = authHeader.slice("Bearer ".length);

  try {
    // Verify the token and obtain the authenticated user's UID.
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

// ========================================
// Admin Authorization Middleware
// ========================================

const requireAdmin = (req, res, next) => {
  if (req.user.uid !== process.env.ADMIN_UID) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges are required.",
    });
  }

  next();
};

// ========================================
// Blog Schema and Model
// ========================================

const blogSchema = new mongoose.Schema({
  newTitle: String,
  newContent: String,
  date: String,
  likes: Number,
});

// Explicitly use your existing collection named "Blog".
const Blog = mongoose.model("Blog", blogSchema, "Blog");

// ========================================
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
// ========================================

// Reuse the connection instead of opening a new one
// for every incoming request.

let mongoConnectionPromise = null;

const ensureMongoConnection = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      if (!mongoConnectionPromise) {
        mongoConnectionPromise = mongoose
          .connect(process.env.MONGODB_URI)
          .then(() => {
            console.log("MongoDB connected successfully");
            console.log("Database:", mongoose.connection.name);
            console.log("Blog collection:", Blog.collection.name);
          })
          .catch((error) => {
            mongoConnectionPromise = null;
            throw error;
          });
      }

      await mongoConnectionPromise;
    }

    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    return res.status(503).json({
      success: false,
      message: "Database temporarily unavailable.",
    });
  }
};

// All blog routes require database connectivity.
app.use(ensureMongoConnection);

// ========================================
// GET: Fetch All Blogs
// Public endpoint
// ========================================

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});

    res.send(blogs);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ========================================
// PATCH: Like a Blog
// Any authenticated Firebase user
// ========================================

app.patch("/api/blogs/like/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Preserve your existing likes logic.
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true },
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ========================================
// POST: Create a Blog
// Admin only
// ========================================

app.post("/api/blogs", verifyFirebaseToken, requireAdmin, async (req, res) => {
  const blog = new Blog({
    newTitle: req.body.newTitle,
    newContent: req.body.newContent,
    date: req.body.date,
    likes: req.body.likes,
  });

  try {
    const newBlog = await blog.save();

    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// ========================================
// DELETE: Delete a Blog
// Admin only
// ========================================

app.delete(
  "/api/blogs/:id",
  verifyFirebaseToken,
  requireAdmin,
  async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

      if (!deletedBlog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting blog",
      });
    }
  },
);

// ========================================
// Start Server Locally
// ========================================

// Vercel can import the Express app directly.
// Run `node index.js` to start the local server.

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
