var express = require('express'), 
authController = require('../controller/Auth/authController'),
router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let message = req.session.email ? "User register successfully. Please login!!" : "";
  if(message.length){
    return res.redirect('user');
  }else{
    return res.render('index', { title: 'Blogs', isUserLoggedIn: false, name:"" });
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
router.get('/about', async (req,res)=>{
  let isUserLoggedIn = req.session.email ? true: false;
  return res.render('aboutus', { title: 'Blogs', isUserLoggedIn: isUserLoggedIn , name: req.session.username || ""});
});

module.exports = router;
