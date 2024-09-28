import { Request, Response, NextFunction } from "express";
const supabase = require("../../supabaseInstance");

// Add a like to a specific post
const addPostLike = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { postId } = request.params;

  try {
    // Use Axios to send a POST request to add a like to a post
    const { data } = await supabase.post("/postLike", {
      post_id: postId,
      timestamp: new Date().toISOString(),
    });
    response.status(201).json(data);
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};

// Add a like to a specific comment
const addCommentLike = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { commentId } = request.params;

  try {
    // Use Axios to send a POST request to add a like to a comment
    const { data } = await supabase.post("/postLike", {
      comment_id: commentId,
      timestamp: new Date().toISOString(),
    });
    response.status(201).json(data);
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
};

export { addPostLike, addCommentLike };
