var express = require('express'), 
authController = require('../controller/Auth/authController'),
router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let message = req.session.email ? "User register successfully. Please login!!" : "";
  if(message.length){
    return res.redirect('home');
  }else{
    return res.render('index', { title: 'Blogs' });
  }
});
/* GET signup page. */
router.get('/register', authController.getRegisterPage);
/* POST signup API. */
router.post('/register', authController.postRegisterPage );
/* GET login page. */
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLoginPage);

router.get('/home', function(req, res, next) {
  return res.render('userHome', { username: req.session.username, error:"", message:"" });
});
module.exports = router;
