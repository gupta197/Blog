const md5 = require('md5');

module.exports = {
    getLoginPage: async (req, res, next) => { 
        let message = req.session.email ? "User register successfully. Please login!!" : "";
        if(message.length){
          return res.redirect('home');
        }else{
          return res.render('login', { title: 'Login', error:"", message: message});
        }
    },

    postLoginPage: async (req, res) => {
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
    },

    getRegisterPage: async (req, res) => {
        let message = req.session.email ? "User register successfully. Please login!!" : "";
        if(message.length){
          return res.redirect('home');
        }else{
            return res.render('register', { title: 'Register', error:"", message:"" });
        }
       
    },

    postRegisterPage: async (req, res) => {
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
                  return res.redirect('/');
                })
              })
            }else{
             return res.render('register', { title: 'Register', error: "All Fields are requied", message:"" });
            }
        }catch (error) {
            console.log("Error in register", error.message)
            return res.render('register', { title: 'Register', error: "Something went wrong!!" , message:""});
        }        
    },
    logout : async (req,res) =>{
        let sessionDestroyed = await req.session.destroy();
        console.log(sessionDestroyed);
        return res.redirect('/')
    }
}