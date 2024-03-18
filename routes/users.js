var express = require('express'),
userController = require('../controller/user/usersController')
var router = express.Router();

/* GET users listing. */
router.get('/', userController.getUserDetail);
router.post('/changePassword', userController.changePassword);
router.post('/updateUserName', userController.updateUserName);
router.post('/deleteUser', userController.deleteUser);

module.exports = router;
