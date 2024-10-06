require("dotenv").config();

// Import Express and Middleware
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Import Supabase Instance
import supabase from "../supabaseInstance";

//import CORS
import cors from "cors";

//Import Axios
const axios = require("axios");

// Import Route Handlers
import { getAllPosts, addPost } from "./routes/post";
import { getCommentsById } from "./routes/comment";
import { addPostLike } from "./routes/postLike";

// Create an Express application
const app = express();

// Define the port from environment or default to 3000
const PORT = process.env.PORT;

//define our Middleware
// Define CORS Options
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

// Middleware to handle CORS and JSON parsing
app.use(cors(corsOptions));
app.use(express.json());

// Home Route
app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Welcome to our server" });
});

// get all posts
app.get("/posts", getAllPosts);

// Add a new post
app.post("/posts", addPost);

// Get all comments for a post id
app.get("/posts/:id/comments", getCommentsById);

//add likes for a comment
app.post("/posts/:id/likes", addPostLike);

// Fetch news articles based on a keyword
app.get(
  "/news/:keyword",
  async (req: Request, res: Response, next: NextFunction) => {
    const keyword = req.params.keyword;
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.NEWS_API_KEY}`
      );
      res.json(data.articles);
    } catch (error) {
      // Type guard for TypeScript
      if (error instanceof Error) {
        // If error is of type 'Error', safely access 'message'
        console.error("Error fetching news:", error.message);
        res
          .status(500)
          .json({ error: "Failed to fetch news", details: error.message });
      } else {
        // Handle cases where error is not an instance of Error
        console.error("Unexpected error fetching news:", error);
        res
          .status(500)
          .json({ error: "Failed to fetch news", details: "Unknown error" });
      }
    }
  }
);

// Error Handling Middleware
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response.status(500).json({
      error: "Something broke!",
      errorStack: error.stack,
      errorMessage: error.message,
    });
  }
);

// 404 Resource Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error:
      "Resource not found. Are you sure you're looking in the right place?",
  });
});

// Start the Server
const server = app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

// Export the app for testing
module.exports = app;
