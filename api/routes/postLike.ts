import { Request, Response, NextFunction } from "express";
const supabase = require("../../supabaseInstance");

// Add a like to a specific post
const addPostLike = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const commentId = request.params.id;

    const { data, error } = await supabase.post(
      `/comment?commentid=eq.${commentId}`
    );
    if (error) {
      console.log(error.message);
      response.status(500).json({ error });
    }
    response.json(data);
  } catch (error) {
    next(error);
  }
};

export { addPostLike };
