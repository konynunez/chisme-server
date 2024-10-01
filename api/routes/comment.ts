import { Request, Response, NextFunction } from "express";
const supabase = require("../../supabaseInstance");

// Get all comments for a specific post
const getCommentsById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const postId = request.params.id;
    const { data, error } = await supabase.get(`/comment?postid=eq.${postId}`);
    if (error) {
      response.status(500).json({ error });
    }
    response.json(data);
  } catch (error) {
    next(error);
  }
};

export { getCommentsById };
