require("dotenv").config();

// Import Express and Middleware
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// Import Supabase Instance
import supabase from "../supabaseInstance";

// Import Route Handlers
import { getAllPosts, addPost } from "./routes/post";
import { getPostComments, addComment } from "./routes/comment";
import { addPostLike, addCommentLike } from "./routes/postLike";

// Create an Express application
const app = express();

// Define the port from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Define CORS Options
const corsOptions = {
  origin: process.env.API_SERVER || "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  optionsSuccessStatus: 200,
};

// Middleware to handle CORS and JSON parsing
app.use(cors(corsOptions));
app.use(express.json());

// Home Route
app.get("/", (request: Request, response: Response) => {
  response.json({ message: "Welcome to the API" });
});

// Define Routes without asyncHandler
app.get("/posts", getAllPosts);
app.post("/posts", addPost);
app.get("/posts/:postId/comments", getPostComments);
app.post("/posts/:postId/comments", addComment);
app.post("/posts/:postId/likes", addPostLike);
app.post("/comments/:commentId/likes", addCommentLike);

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
export default app;
