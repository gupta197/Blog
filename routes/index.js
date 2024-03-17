var express = require('express'), 
authController = require('../controller/Auth/authController'),
router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let message = req.session.email ? "User register successfully. Please login!!" : "";
  if(message.length){
    return res.redirect('home');
  }else{
    return res.render('index', { title: 'Blogs', isUserLoggedIn: false });
  }
});
/* GET signup page. */
router.get('/register', authController.getRegisterPage);
/* POST signup API. */
router.post('/register', authController.postRegisterPage );
/* GET login page. */
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLoginPage);
router.get('/logout', authController.logout);

router.get('/home', function(req, res, next) {
  if(req.session.email){
    return res.render('userHome', { title:'profile', username: req.session.username, error:"", message:"" , isUserLoggedIn: true});
  }else{
    return res.redirect('/')
  }
});
module.exports = router;
