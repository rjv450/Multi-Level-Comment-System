import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: { type: Number, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model('Comment', CommentSchema);
