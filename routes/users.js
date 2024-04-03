var express = require('express'),
userController = require('../controller/user/usersController'),
postController = require('../controller/post/postController'),
{isUserLoggedIn} = require('../middleware/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', isUserLoggedIn , userController.getUserDetail);
router.post('/changePassword',isUserLoggedIn , userController.changePassword);
router.post('/updateUserName', isUserLoggedIn ,userController.updateUserName);
router.post('/deleteUser',isUserLoggedIn ,userController.deleteUser);
router.get('/dashboard',isUserLoggedIn , postController.getUserAllPost);
router.get('/post/delete/:id',isUserLoggedIn , postController.deletePost);
router.post('/post/:id', isUserLoggedIn , postController.updatePost);
router.post('/post', isUserLoggedIn , postController.createPost);
router.get('/post/getPostUpdateForm/:id', isUserLoggedIn , postController.getPostUpdateForm);
router.get('/post/getPostForm', isUserLoggedIn , postController.getPostForm);

router.post('/post/', postController.createPost);

module.exports = router;
