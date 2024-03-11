var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});
router.post('/register', function(req, res) {
  const {email, password, username} = req.body;
  if(email && email.length && password && password.length && username && username.length){
      
  }else{
    res.send("All fields are required !!!")
  }
  
});
module.exports = router;
