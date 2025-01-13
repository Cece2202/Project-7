const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/authorize');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:id', auth, userController.getUser);
router.delete('/:id', auth, userController.delete);


module.exports = router;
