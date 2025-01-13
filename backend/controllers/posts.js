const {Post} = require('../models');
const fs = require('fs');

// Add a new post
exports.createPost = (req, res, next) => {
    const postObject = req.file ? JSON.parse(req.body.post) : req.body;

    // Create a new Post object
    const post = new Post({
      ...postObject,
      mediaUrl: req.file
        ? `${req.protocol}://${req.get('host')}/media/${req.file.filename}` // Set mediaUrl if a file exists
        : null, // No file, set mediaUrl to null
    });
  
    console.log("Post object being saved:", post);
  
    // Save the post to the database
    post
      .save()
      .then(() =>
        res.status(201).json({ message: "Post created successfully!" })
      )
      .catch((error) =>
        res.status(400).json({ error, message: "Failed to create post" })
      );
  };

// Get all posts
exports.getAllPosts = async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        order: [["createdAt", "DESC"]], // Sort by creation date (newest first)
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  };

// Get one post
exports.getOnePost = async (req, res, next) => {
    try {
      const post = await Post.findOne({ where: { id: req.params.id } });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  };

// Mark as Read
exports.markAsRead = async (req, res) => {
  // const userId = req.body.userId; // Extract user ID from the request body
  const postId = req.params.id;   // Extract post ID from the request params

  try {
    // Find the post by ID
    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    let reads = Array.isArray(post.reads) ? post.reads : [];
    const userId = Number(req.auth.userId);

    if (!reads.includes(userId)) {
      reads.push(userId);
      await Post.update(
        { reads: reads },
        { 
          where: { id: req.params.id },
          returning: true
        }
      );
    }

    res.status(200).json({ message: 'Post marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
