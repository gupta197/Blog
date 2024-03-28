var express = require('express'),
userController = require('../controller/user/usersController'),
postController = require('../controller/post/postController');
var router = express.Router();

/* GET users listing. */
router.get('/', userController.getUserDetail);
router.post('/changePassword', userController.changePassword);
router.post('/updateUserName', userController.updateUserName);
router.post('/deleteUser', userController.deleteUser);
router.get('/dashboard', postController.getUserAllPost);
router.get('/post/delete/:id', postController.deletePost);
router.post('/post/:id', postController.updatePost);
router.post('/post', postController.createPost);
router.get('/post/getPostUpdateForm/:id', postController.getPostUpdateForm);
router.get('/post/getPostForm', postController.getPostForm);

router.post('/post/', postController.createPost);

module.exports = router;
