var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET signup page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', error:"", message:"" });
});
/* POST signup API. */
router.post('/register', async function(req, res) {
  try {
    const {email, password, username} = req.body;
    if(email && email.trim().length && password && password.trim().length && username && username.trim().length){
      let query = `SELECT user_id, username FROM users WHERE email = '${email}'`;
      con.query(query,(error, rows, fields)=>{
        if(!error && rows.length >= 1){
          return res.render('register', { title: 'Register', error: "Email Already exists!!", message:"" });
        }
        if(error){
          return res.render('register', { title: 'Register', error: "Something went wrong!!", message:"" });
        }
        query = `INSERT INTO users (username, email,password) VALUES ('${username}','${email}','${password}');`;
        con.query(query, (error, rows, fields)=>{
          if(error){
            return res.render('register', { title: 'Register', error: "Something went wrong!!" , message:"" });
          }
          return res.render('register', { title: username , error: "" ,message: `User register successfully` });
        })

      })
        
    }else{
     return res.render('register', { title: 'Register', error: "All Fields are requied", message:"" });
    }
  } catch (error) {
    console.log("Error in register", error.message)
    return res.render('register', { title: 'Register', error: "Something went wrong!!" , message:""});
  }

  
});
module.exports = router;
