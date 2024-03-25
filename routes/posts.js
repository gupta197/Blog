var express = require('express'),
postController = require('../controller/post/postController')
var router = express.Router();

/* GET users listing. */
router.get('/:id', postController.getPostDetail);
router.get('/delete/:id', postController.deletePost);
router.post('/:id', postController.updatePost);
router.get('/getPostUpdateForm/:id', postController.getPostUpdateForm);
router.get('/getPostForm', postController.getPostForm);
router.post('/', postController.createPost);

module.exports = router;