import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamp: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
