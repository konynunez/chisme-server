import { Request, Response, NextFunction } from "express";
const supabase = require("../../supabaseInstance");

// Get all comments for a specific post
const getPostComments = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { postId } = request.params;

  try {
    const { data } = await supabase.get(`/comment?post_id=eq.${postId}`);
    response.json(data);
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};

// Add a comment to a specific post
const addComment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { postId } = request.params;
  const { content } = request.body;

  try {
    const { data } = await supabase.post("/comment", {
      post_id: postId,
      content,
      timestamp: new Date().toISOString(),
    });
    response.status(201).json(data);
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};

export { getPostComments, addComment };
