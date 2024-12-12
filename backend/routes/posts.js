const express = require("express");
const router = express.Router();
const postModels = require('../models/posts');
const auth = require('../middleware/authorize');
const postControllers = require('../controllers/posts');
const multer = require('../middleware/multer-config');



// Create Post
router.post("/", auth, async (req, res) => {
  const { content, mediaUrl } = req.body;
  try {
    const post = new post({ user: req.user.id, content, mediaUrl });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
});

// Fetch All Posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await posts.find().populate("user", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Mark as Read
router.patch("/:id/read", auth, async (req, res) => {
  try {
    const post = await postModels.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error marking post as read" });
  }
});

module.exports = router;



// const express = require('express');

// const router = express.Router();
// // const postsController = require('../controllers/sauce');
// // const auth = require('../middleware/authorize');
// const multer = require('../middleware/multer-config');

// // Get all sauces
// router.get('/', auth, postController.getAllPost);

// // Get a single sauce
// router.get('/:id', auth, postController.getOnePost);

// // Add a new sauce
// router.post('/', auth, multer, postController.createPost);

// // Modify an existing sauce
// router.put('/:id', auth, multer, postController.modifyPost);

// // Delete a sauce
// router.delete('/:id', auth, postController.deletePost);

// // Like or dislike a sauce
// router.post('/:id/like', auth, postController.likePost);

// // Route for adding a sauce with image upload
// router.post('/', auth, multer, postController.createPost);

// // Other routes (delete, get sauces, etc.)
// module.exports = router;