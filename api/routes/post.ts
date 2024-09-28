import { Request, Response, NextFunction } from "express";
const supabase = require("../../supabaseInstance");

// Get all posts
const getAllPosts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { data } = await supabase.get("/post");
    response.json(data);
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};

// Add a new post
const addPost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { content } = request.body;

  try {
    const { data } = await supabase.post("/post", {
      content,
      timestamp: new Date().toISOString(),
    });
    response.status(201).json(data);
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};

export { getAllPosts, addPost };
