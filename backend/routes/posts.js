const express = require("express");
const router = express.Router();
const auth = require('../middleware/authorize');
const postController = require('../controllers/posts');
const Post = require("../models/posts");
const multer = require('../middleware/multer-config');
const upload = require('../middleware/upload'); 

// Get all posts
router.get('/', auth, postController.getAllPosts);

// Get a single post
router.get('/:id', auth, postController.getOnePost);

// creste a new post
router.post('/', auth, multer, postController.createPost);

// Create post with/without media
router.post('/', upload.single('media'), async (req, res) => {
    const { title, content } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
    try {
      const post = await Post.create({ title, content, mediaUrl });
      res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create post' });
    }
  });

// Modify an existing post
// router.put('/:id', auth, multer, postController.modifyPost);

// Delete a post
router.delete('/:id', auth, postController.deletePost);

// Like or dislike a sauce
router.post('/:id/like', auth, postController.likePost);

// Route for adding a sauce with image upload
router.post('/', auth, multer, postController.createPost);

// Other routes (delete, get posts, etc.)
module.exports = router;

// Create Post
// router.post("/", auth, async (req, res) => {
//   const { content, mediaUrl } = req.body;
//   try {
//     const post = new post({ user: req.user.id, content, mediaUrl });
//     await post.save();
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(500).json({ error: "Error creating post" });
//   }
// });

// Fetch All Posts
// router.get("/", auth, async (req, res) => {
//   try {
//     const posts = await post.find().populate("user", "name");
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching posts" });
//   }
// });

// // Mark as Read
// router.patch("/:id/read", auth, async (req, res) => {
//   try {
//     const post = await postModels.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: "Error marking post as read" });
//   }
// });