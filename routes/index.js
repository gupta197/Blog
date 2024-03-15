var express = require('express'), 
md5 = require('md5');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blogs' });
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
        let pass = md5(password);
        query = `INSERT INTO users (username, email,password) VALUES ('${username}','${email}','${pass}');`;
        con.query(query, (error, rows, fields)=>{
          if(error){
            return res.render('register', { title: 'Register', error: "Something went wrong!!" , message:"" });
          }
          console.log("session",req.session)
          if(!req.session.email){
            req.session.email = email;
            req.session.save();
          }
          return res.redirect('login');
          // return res.render('register', { title: username , error: "" ,message: `User register successfully` });
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
/* GET login page. */
router.get('/login', function(req, res, next) {
  let message = req.session.email ? "User register successfully. Please login!!" : "";
  if(message.length){
    return res.redirect('home');
  }else{
    return res.render('login', { title: 'Login', error:"", message: message});
  }
});
router.post('/login', async function(req, res) {
  try {
    const {email, password} = req.body;
    if(email && email.trim().length && password && password.trim().length){
      let query = `SELECT user_id, username, Password FROM users WHERE email = '${email}'`;
      con.query(query,(error, rows, fields)=>{
        if(!error && rows.length >= 1){
          let pass = md5(password);
          if(rows[0].Password == pass){
            if(!req.session.username && !req.session.password){
              req.session.email = email;
              req.session.password = pass;
              req.session.username = rows[0].username;
              req.session.save();
            }
            return res.redirect('/home');
          }else{
            return res.render('login', { title: 'Login', error: "Invalid credations!!", message:`` });
          }
        
        }
        if(rows.length == 0){
          return res.render('login', { title: 'Login', error: "Invalid credations!!", message:`` });
        }
        if(error){
          console.log("error message in login", error);
          return res.render('login', { title: 'Login', error: "Something went wrong!!", message:"" });
        }
      })
    }else{
     return res.render('login', { title: 'Login', error: "All Fields are requied", message:"" });
    }
  } catch (error) {
    console.log("Error in register", error.message)
    return res.render('login', { title: 'Login', error: "Something went wrong!!" , message:""});
  }
});

router.get('/home', function(req, res, next) {
  return res.render('userHome', { username: req.session.username, error:"", message:"" });
});
module.exports = router;
