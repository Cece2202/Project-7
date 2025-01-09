const {Post} = require('../models');
const fs = require('fs');

// Add a new sauce
exports.createPost = (req, res, next) => {
    //TODO add condition to check for present of file like in project 6 for modify sauce
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

// Delete a sauce
exports.deletePost = (req, res, next) => {
    Post.findOne({ id: req.params.id })
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    error: new Error('Objet non trouvé !')
                });
            }
            if (post.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Requête non autorisée !')
                });
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post deleted!' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Get all sauces
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

// Get one sauce
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
// router.patch("/:id/read", auth, async (req, res) => {
//     try {
//       const post = await postModels.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
//       res.json(post);
//     } catch (err) {
//       res.status(500).json({ error: "Error marking post as read" });
//     }
//   });

// Handle liking or disliking a sauce
// exports.likePost = (req, res, next) => {
//     const userId = req.body.userId;
//     const like = req.body.like; // 1 for like, -1 for dislike, 0 for undo

//     Post.findOne({ _id: req.params.id })
//         .then(post => {
//             if (like === 1) {
//                 // User is liking the sauce
//                 if (!post.usersLiked.includes(userId)) {
//                     post.usersLiked.push(userId);
//                     post.likes += 1;
//                 }
//             } else if (like === -1) {
//                 // User is disliking the sauce
//                 if (!post.usersDisliked.includes(userId)) {
//                     post.usersDisliked.push(userId);
//                     post.dislikes += 1;
//                 }
//             } else if (like === 0) {
//                 // User is undoing a like or dislike
//                 if (post.usersLiked.includes(userId)) {
//                     post.usersLiked = post.usersLiked.filter(user => user !== userId);
//                     post.likes -= 1;
//                 } else if (sauce.usersDisliked.includes(userId)) {
//                     post.usersDisliked = post.usersDisliked.filter(user => user !== userId);
//                     post.dislikes -= 1;
//                 }
//             }

//             // Save the updated sauce
//             post.save()
//                 .then(() => res.status(200).json({ message: 'Post updated successfully!' }))
//                 .catch(error => res.status(400).json({ error }));
//         })
//         .catch(error => res.status(404).json({ error }));
// };
