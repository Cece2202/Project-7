const Post = require('../models/posts');
const fs = require('fs');

// Add a new sauce
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;

    console.log('Request body:', req.body);
    console.log('File info:', req.file);
    req.body.post = JSON.parse(req.body.post);

    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post created successfully!' }))
        .catch(error => res.status(400).json({ error, 'message': 'failed' }));
};

// Delete a sauce
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
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
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

// Get one sauce
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    let post;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.post = JSON.parse(req.body.post);
        post = new Post({
            _id: req.params.id,
            userId: req.body.post.userId,
            name: req.body.post.name,
            manufacturer: req.body.post.manufacturer,
            description: req.body.post.description,
            mainPepper: req.body.post.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: req.body.post.heat
        });

    } else {
        post = new Post({
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat
        });
    }

    Post.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: 'Post updated successfully!' }))
        .catch(error => res.status(400).json({ error }));
};

// Handle liking or disliking a sauce
exports.likePost = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like; // 1 for like, -1 for dislike, 0 for undo

    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (like === 1) {
                // User is liking the sauce
                if (!post.usersLiked.includes(userId)) {
                    post.usersLiked.push(userId);
                    post.likes += 1;
                }
            } else if (like === -1) {
                // User is disliking the sauce
                if (!post.usersDisliked.includes(userId)) {
                    post.usersDisliked.push(userId);
                    post.dislikes += 1;
                }
            } else if (like === 0) {
                // User is undoing a like or dislike
                if (post.usersLiked.includes(userId)) {
                    post.usersLiked = post.usersLiked.filter(user => user !== userId);
                    post.likes -= 1;
                } else if (sauce.usersDisliked.includes(userId)) {
                    post.usersDisliked = post.usersDisliked.filter(user => user !== userId);
                    post.dislikes -= 1;
                }
            }

            // Save the updated sauce
            post.save()
                .then(() => res.status(200).json({ message: 'Post updated successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};
