var express = require('express'),
userController = require('../controller/user/usersController')
var router = express.Router();

/* GET users listing. */
router.get('/', userController.getUserDetail);

module.exports = router;
