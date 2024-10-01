import { Request, Response, NextFunction } from "express";
const supabase = require("../../supabaseInstance");

// Get all posts
const getAllPosts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase.get("/post");
    if (error) {
      response.status(500).json({ error });
    }
    response.json(data);
  } catch (error) {
    next(error);
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
    const { data, error } = supabase.post("post", {
      content,
      timestamp: new Date().toISOString(),
    });

    if (error) {
      response.status(500).json({ error });
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export { getAllPosts, addPost };
