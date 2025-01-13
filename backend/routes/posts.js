const express = require("express");
const router = express.Router();
const auth = require('../middleware/authorize');
const postController = require('../controllers/posts');
const Post = require("../models/posts");
const multer = require('../middleware/multer-config');
// const upload = require('../middleware/upload');

// Get all posts
router.get('/', auth, postController.getAllPosts);

// Get a single post
router.get('/:id', auth, postController.getOnePost);

// creste a new post
router.post('/', auth, multer, postController.createPost);

// Mark as Read
router.post("/:id/read", auth, postController.markAsRead);


// Other routes (delete, get posts, etc.)
module.exports = router;


