var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', error:"" });
});
router.post('/register', async function(req, res) {
  try {
    const {email, password, username} = req.body;
    if(email && email.trim().length && password && password.trim().length && username && username.trim().length){
      let query = `SELECT user_id, username FROM users WHERE email LIKE '${email}'`;
      con.query(query,(error, rows, fields)=>{
        console.log(error, rows, fields);
        if(!error && rows.length >= 1){
          return res.render('register', { title: 'Register', error: "Email Already exists!!" });
        }

      })
        
    }else{
     return res.render('register', { title: 'Register', error: "All Fields are requied" });
    }
  } catch (error) {
    console.log("Error in register", error.message)
    return res.render('register', { title: 'Register', error: "Something went wrong!!" });
  }

  
});
module.exports = router;
