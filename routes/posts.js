var express = require('express'),
postController = require('../controller/post/postController')
var router = express.Router();

/* GET users listing. */
router.get('/:id', postController.getPostDetail);

module.exports = router;