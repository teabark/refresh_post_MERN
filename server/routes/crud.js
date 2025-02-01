import { Router } from "express";
import Post from "../Models/post.model.js";

const router = Router();

router.post("/create-post", async (req, res) => {
  const { title, author, body } = req.body;

  try {
    const newPost = new Post({
      title: title,
      author: author,
      body: body,
    });
    const savedProduct = await newPost.save();
    console.log("Post created: ", savedProduct);
    res.status(200).send("Created Successfully!")
  } catch (error) {
    console.log(error);
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

router.get("/posts/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve the post" });
    }
})

router.delete("/posts/:id", async (req, res) => {
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if(!deletedPost){
            return res.status(404).json({message: "Post deleted successfully!", deletedPost})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to delete post"});
    }
})

router.put("/update-post/:id", async (req, res) => {
    try {
        const { title, body, author } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, body, author },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update post" });
    }
});


export default router;
