import Comment from '../models/Comment.js';

// Create Comment
export const createComment = async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.user.id;

  try {
    const newComment = new Comment({ postId, text, userId });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reply to Comment
export const replyToComment = async (req, res) => {
  const { postId, commentId, text } = req.body;
  const userId = req.user.id;

  try {
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) return res.status(404).json({ error: 'Comment not found' });

    const reply = new Comment({ postId, text, parentCommentId: commentId, userId });
    await reply.save();

    parentComment.replies.push(reply._id);
    await parentComment.save();

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Comments for Post
export const getComments = async (req, res) => {
  const { postId } = req.params;
  const { sortBy = 'createdAt', sortOrder = 'asc' } = req.query;

  try {
    const comments = await Comment.find({ postId })
      .sort({ [sortBy]: sortOrder })
      .populate({
        path: 'replies',
        select: 'text createdAt',
        options: { limit: 2 },
      });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Expand Comments with Pagination
export const expandComments = async (req, res) => {
  const { postId, commentId } = req.params;
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const comments = await Comment.find({ postId, parentCommentId: commentId })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .populate({
        path: 'replies',
        select: 'text createdAt',
        options: { limit: 2 },
      });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
